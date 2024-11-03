// controllers/myController.js
const ModelService = require("../services/ModelService");
const express = require("express");
const path = require("path");
const fs = require("fs");

class ModelController {
  static getData(req, res) {
    const data = ModelService.getData();
    res.json(data);
  }

  static async getGLB(req, res) {
    try {
      const subDirectoryList = req.query.subDirectoryList
        ? req.query.subDirectoryList.split(",")
        : [];
      const fileName = req.query.fileName || "";

      const filePath = ModelService.getGLBFilePath(subDirectoryList, fileName);
      await ModelService.checkFileExists(filePath);
      ModelService.streamFile(filePath, res);
    } catch (error) {
      // If an error occurs (file not found or other), return a 404
      return res.status(404).json({ message: error.message });
    }
  }

  static getRoutes() {
    const router = express.Router();

    // Define routes
    router.get("/data", this.getData);
    router.get("/glb", this.getGLB);

    return router;
  }
}

module.exports = ModelController;
