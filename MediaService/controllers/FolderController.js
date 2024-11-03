// controllers/myController.js
const FolderService = require("../services/FolderService");
const express = require("express");

class FolderController {
  static getData(req, res) {
    const data = ModelService.getData();
    res.json(data);
  }

  static getFolderContents(req, res) {
    const pageNumber = req.query.pageNumber || 1;

    // Optionally accept subDirectoryList, defaulting to an empty array if not provided
    const subDirectoryList = req.query.subDirectoryList
      ? req.query.subDirectoryList.split(",")
      : [];

    // Fetch folder contents based on the page number and the subDirectoryList
    const folderContents = FolderService.getItemsForPage(
      pageNumber,
      subDirectoryList
    );

    res.json(folderContents);
  }

  static getPageCount(req, res) {
    const subDirectoryList = req.query.subDirectoryList
      ? req.query.subDirectoryList.split(",")
      : [];
    const pageCount = FolderService.getPageCount(subDirectoryList);

    res.json(pageCount);
  }

  static getRoutes() {
    const router = express.Router();

    // Define routes
    router.get("/folderContents", this.getFolderContents);
    router.get("/pageCount", this.getPageCount);

    return router;
  }
}

module.exports = FolderController;
