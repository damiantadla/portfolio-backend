const express = require("express");
const router = express.Router();
const PortfolioController = require("../controllers/PortfolioController");
const AuthMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/portfolio/");
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const ext = extArray[extArray.length - 1];
    cb(null, Date.now().toString() + "." + ext);
  },
});

const fileFilter = function (req, file, cb) {
  // Accepted file extensions
  const allowedExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".webm",
    ".svg",
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter });

//Create new portfolio (access admin)
router.post(
  "/new",
  AuthMiddleware.adminAuth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  PortfolioController.newProject,
);

//Delete item portfolio (access admin)
router.delete(
  "/delete/:id",
  AuthMiddleware.adminAuth,
  PortfolioController.deleteProject,
);

//Edit item portfolio (access admin)
router.put(
  "/edit/:id",
  AuthMiddleware.adminAuth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  PortfolioController.updateProject,
);

//Get all articles portfolio (access open)
router.get("/get", PortfolioController.getProjects);

//Get item portfolio (access open)
router.get("/get/:id", PortfolioController.getProjectID);

module.exports = router;
