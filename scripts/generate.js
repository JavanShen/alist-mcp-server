import { getOpenAPI } from "./apifox.js";
import { upperFirst, lowerFirst } from "lodash-es";
import { jsonSchemaToZod } from "json-schema-to-zod";
import os from "os";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import * as prettier from "prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excludeApi = ["/api/fs/put"];

const findNestedValue = (obj, targetKey) => {
  if (typeof obj !== "object" || obj === null) return undefined;

  // 如果当前层直接包含目标键，直接返回值
  if (Object.prototype.hasOwnProperty.call(obj, targetKey)) {
    return obj[targetKey];
  }

  // 深度优先遍历所有属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const result = findNestedValue(obj[key], targetKey);
      if (result !== undefined) return result;
    }
  }

  return undefined;
};

async function generate() {
  const output = {};
  const tools = {};
  const openApi = await getOpenAPI();

  const paths = openApi?.paths || [];

  Object.keys(paths).forEach((path) => {
    if (excludeApi.includes(path)) return;
    Object.keys(paths[path] || []).forEach((method) => {
      const info = paths[path]?.[method] || {};

      const tags = info.tags?.map((tag) => tag.split("/")?.[1]);

      const req = findNestedValue(info.requestBody, "schema");
      const res = findNestedValue(info.responses, "schema");

      const name = path.split("/").map(upperFirst).join("");
      const reqTypeName = `Req${name}Schema`;
      const resTypeName = `Res${name}Schema`;
      const zodRequestSchemaText = `export const ${reqTypeName} = ${jsonSchemaToZod(req)};`;
      const zodResponseSchemaText = `export const ${resTypeName} = ${jsonSchemaToZod(res)};`;

      const reqOptionTypeName = `${reqTypeName}Option`;
      const reqFnName = lowerFirst(name);
      const reqOptionTypeText = `export type ${reqOptionTypeName} = z.infer<typeof ${reqTypeName}>;`;
      const requestFunText = `export const ${reqFnName} = async (opt: ${reqOptionTypeName}) => {
        const res = await request({
          url: "${path}",
          method: "${method.toUpperCase()}",
          data: opt,
        });
        return ${resTypeName}.parse(res);
      };`;

      const toolText = `server.tool(
        "${lowerFirst(name.replace(/^api/i, ""))}",
        "${[info.summary, info.description].filter(Boolean).join("-")}",
        ${reqTypeName}.shape,
        async (opt) => {
          const info = await ${reqFnName}(opt);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(info?.data || info, null, 2),
              },
            ],
          };
        },
      );`;

      tools.content = [...(tools.content || []), toolText];

      tags.forEach((tag) => {
        output[tag] = {
          types: [
            ...(output[tag]?.types || []),
            zodRequestSchemaText + os.EOL + zodResponseSchemaText,
          ],
          requests: [
            ...(output[tag]?.requests || []),
            reqOptionTypeText + os.EOL + requestFunText,
          ],
          imports: [...(output[tag]?.imports || []), reqTypeName, resTypeName],
        };
        tools.imports = {
          ...tools.imports,
          [tag]: {
            requests: [...(tools.imports?.[tag]?.requests || []), reqFnName],
            types: [...(tools.imports?.[tag]?.types || []), reqTypeName],
          },
        };
      });
    });
  });

  Object.keys(output).forEach(async (tag) => {
    const typeFilePath = path.join(__dirname, `../src/types/${tag}.ts`);
    const requestFilePath = path.join(__dirname, `../src/requests/${tag}.ts`);

    const typeImports = `import { z } from 'zod';`;
    const requestImports = `import { ${output[tag].imports.join(", ")} } from '../types/${tag}.js';
      import { request } from '../utils/request.js';
      import { z } from 'zod';`;

    fs.writeFileSync(
      typeFilePath,
      await prettier.format(
        typeImports + os.EOL + output[tag].types.join(os.EOL + os.EOL),
        {
          parser: "typescript",
        },
      ),
    );
    fs.writeFileSync(
      requestFilePath,
      await prettier.format(
        requestImports + os.EOL + output[tag].requests.join(os.EOL + os.EOL),
        {
          parser: "typescript",
        },
      ),
    );
  });

  const indexFilePath = path.join(__dirname, "../src/index.ts");
  const indexTemplate = fs.readFileSync(indexFilePath, "utf8");

  const indexImports = Object.keys(tools.imports).map((item) => {
    const reqImports = `import { ${tools.imports[item].requests.join(", ")} } from './requests/${item}.js';`;
    const typeImports = `import { ${tools.imports[item].types.join(", ")} } from './types/${item}.js';`;
    return `${typeImports}\n${reqImports}`;
  });
  const finalCode = indexTemplate
    .replace(
      /(\/\/mcp_tools_start\n)(.*)(\/\/mcp_tools_end)/s,
      `$1${tools.content.join(os.EOL + os.EOL)}$3`,
    )
    .replace(
      /(\/\/imports_start\n)(.*)(\/\/imports_end)/s,
      `$1${indexImports.join(os.EOL + os.EOL)}$3`,
    );
  fs.writeFileSync(
    indexFilePath,
    await prettier.format(finalCode, { parser: "typescript" }),
  );
}

generate();
