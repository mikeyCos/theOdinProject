const path = require("path");

const rootPath = path.join(__dirname, "..");

const publicPath = path.join(rootPath, "public");
const utilsPath = path.join(rootPath, "utils");

const viewsPages = path.join(rootPath, "views/pages");
const viewsPartials = path.join(rootPath, "views/partials");

const staticPaths = [publicPath, utilsPath];
const viewsPaths = [viewsPages, viewsPartials];

module.exports = {
  staticPaths,
  viewsPaths,
};
