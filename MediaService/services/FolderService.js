const fs = require("fs");
const path = require("path");
const config = require("../appConfig");

const validItemExtensions = ["glb"];
const itemsPerPage = 10;
let baseDirectory = config.StartingFolderPath;

class FolderService {
  static setCurrentDirectory(subDirectoryList) {
    return path.join(baseDirectory, ...subDirectoryList);
  }

  /**
   * Retrieves paginated list of valid items.
   */
  static getItemsForPage(pageNumber, subDirectoryList) {
    const currentDirectory = this.setCurrentDirectory(subDirectoryList);

    const directoryList = fs.readdirSync(currentDirectory);

    const filteredList = directoryList.filter((item) =>
      FolderService.getIsValidItem(item, currentDirectory)
    );

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedItems = filteredList.slice(startIndex, endIndex);

    return FolderService.prepareItemInformation(
      paginatedItems,
      currentDirectory
    );
  }

  static getPageCount(subDirectoryList = []) {
    try {
      const currentDirectory = this.setCurrentDirectory(subDirectoryList);
      const directoryList = fs.readdirSync(currentDirectory);

      // Filter valid items
      const filteredList = directoryList.filter((item) =>
        FolderService.getIsValidItem(item, currentDirectory)
      );

      // Calculate total number of pages
      const totalItems = filteredList.length;
      const pageCount = Math.ceil(totalItems / itemsPerPage);

      // Return JSON response with pageCount
      return { pageCount: pageCount, error: null };
    } catch (error) {
      // Return JSON response with error message if something goes wrong
      return { pageCount: 0, error: error.message };
    }
  }

  /**
   * Checks if an item is a valid folder or a file with a valid extension.
   */
  static getIsValidItem(item, currentDirectory) {
    const itemPath = path.join(currentDirectory, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      return true;
    } else if (stats.isFile()) {
      const fileExtension = path.extname(item).toLowerCase().slice(1);
      return validItemExtensions.includes(fileExtension);
    }

    return false;
  }

  /**
   * Prepares information about each item (isFolder, name, created date).
   */
  static prepareItemInformation(filteredList, currentDirectory) {
    return filteredList.map((item) => {
      const itemPath = path.join(currentDirectory, item);
      const stats = fs.statSync(itemPath);
      const isFolder = stats.isDirectory();
      const createdDate = new Date(stats.birthtime).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      );

      return {
        isFolder: isFolder,
        name: item,
        createdDate: createdDate,
      };
    });
  }
}

module.exports = FolderService;
