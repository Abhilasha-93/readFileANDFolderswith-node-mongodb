const fs = require("fs");
const path = require("path");
const connect = require("./db/connection");
const Meta = require("./model/metaModel");

const foldersList = [];

function outputAllFolders(folderPaths) {
  folderPaths.forEach((folderPath) => {
    const results = fs.readdirSync(folderPath);
    const folders = results.filter((res) =>
      fs.lstatSync(path.resolve(folderPath, res)).isDirectory()
    );
    const file = results.filter((res) =>
      fs.lstatSync(path.resolve(folderPath, res)).isFile()
    );
    const fileData = fs.statSync(folderPath);
    
    if (file.length !== 0) {
      
      file.forEach((ex) => {
        let ext = ex.split(".").pop();
       
        const item = { name: ex, type: "file", extention: ext };
        foldersList.push(item);
      });
    } else {
      folders.forEach((e) => {
        const item = { name: e, type: "folder", extention: null };
        foldersList.push(item);
      });
    }
   

    const innerFolderPaths = folders.map((folder) =>
      path.resolve(folderPath, folder)
    );

    if (innerFolderPaths.length === 0) {
      return;
    }
   

    outputAllFolders(innerFolderPaths);
   
  });
  return foldersList;
}

outputAllFolders([path.resolve(__dirname, "test")]);

async function storeInDB(req) {
  console.log("req", req);
  await connect();
  try {
    for (const items of req) {
      const { name, type, extention } = items;

      await Meta.updateOne(
        { name },
        { $set: { type, extention } },
        { upsert: true }
      );
    }
  } catch (err) {
    console.log(err);
  }
}

setInterval(() => {
  const data = outputAllFolders([path.resolve(__dirname, "test")]);
  storeInDB(data);
}, 5000);

console.log(foldersList);
