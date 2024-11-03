// services/myService.js
const path = require("path");
const fs = require("fs");
const config = require("../appConfig");

let baseDirectory = config.StartingFolderPath;

class ModelService {
  static getGLBFilePath(subDirectoryList, fileName) {
    const directoryPath = path.join(baseDirectory, ...subDirectoryList);
    return path.join(directoryPath, fileName);
  }

  static checkFileExists(filePath) {
    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          reject(new Error("File not found"));
        } else {
          resolve(filePath);
        }
      });
    });
  }

  static streamFile(filePath, res) {
    // Set headers for file download
    res.set({
      "Content-Type": "model/gltf-binary",
      "Content-Disposition": "attachment;",
    });

    // Stream the file
    fs.createReadStream(filePath).pipe(res);
  }
}

module.exports = ModelService;
