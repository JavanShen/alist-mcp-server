import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const myHeaders = new Headers();
myHeaders.append("X-Apifox-Api-Version", "2024-03-28");
myHeaders.append("Authorization", `Bearer ${process.env.APIFOX_TOKEN}`);
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  scope: {
    type: "SELECTED_FOLDERS",
    selectedFolderIds: ["55548242"],
    excludedByTags: ["pet"],
  },
  options: {
    includeApifoxExtensionProperties: false,
    addFoldersToTags: false,
  },
  oasVersion: "3.1",
  exportFormat: "JSON",
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

export const getOpenAPI = async () => {
  const res = await fetch(
    `https://api.apifox.com/v1/projects/${process.env.APIFOX_PROJECT}/export-openapi?locale=zh-CN`,
    requestOptions,
  );
  return res.json();
};
