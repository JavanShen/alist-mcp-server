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
      const reqOptionTypeText = `export type ${reqOptionTypeName} = z.infer<typeof ${reqTypeName}>;`;
      const requestFunText = `export const ${lowerFirst(name)} = async (opt: ${reqOptionTypeName}) => {
        const res = await request({
          url: "${path}",
          method: "${method.toUpperCase()}",
          data: opt,
        });
        return ${resTypeName}.parse(res);
      };`;

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
          [tag]: [],
        };
      });
    });
  });

  Object.keys(output).forEach(async (tag) => {
    const typeFile = path.join(__dirname, `../src/types/${tag}.ts`);
    const requestFile = path.join(__dirname, `../src/requests/${tag}.ts`);

    const typeImports = `import { z } from 'zod';`;
    const requestImports = `import { ${output[tag].imports.join(", ")} } from '../types/${tag}.js';
      import { request } from '../utils/request.js';
      import { z } from 'zod';`;

    fs.writeFileSync(
      typeFile,
      await prettier.format(
        typeImports + os.EOL + output[tag].types.join(os.EOL + os.EOL),
        {
          parser: "typescript",
        },
      ),
    );
    fs.writeFileSync(
      requestFile,
      await prettier.format(
        requestImports + os.EOL + output[tag].requests.join(os.EOL + os.EOL),
        {
          parser: "typescript",
        },
      ),
    );
  });
}

generate();
