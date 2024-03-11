const express = require("express");
const router = express.Router();
const ProjectsController = require("../controllers/projectController");
const AuthMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/projects/");
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

//Get projects(access admin)
router.post(
  "/new",
  AuthMiddleware.adminAuth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  ProjectsController.newProject,
);

//Update projects(access admin)
router.put(
  "/edit/:id",
  AuthMiddleware.adminAuth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  ProjectsController.updateProject,
);

//Delete projects(access admin)
router.delete(
  "/delete/:id",
  AuthMiddleware.adminAuth,
  ProjectsController.deleteProject,
);

//Get projects(access open)
router.get("/get", ProjectsController.getProjects);

//Get project(access open)
router.get("/get/:id", ProjectsController.getProjectID);

module.exports = router;
