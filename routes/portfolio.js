const express = require("express");
const router = express.Router();
const PortfolioController = require("../controllers/ProjectController");
const AuthMiddleware = require("../middleware/authMiddleware");

//Create new portfolio (access admin)
router.post("/new", AuthMiddleware.adminAuth, PortfolioController.newProject);

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
  PortfolioController.updateProject,
);

//Get all articles portfolio (access open)
router.get("/get", PortfolioController.getProjects);

//Get item portfolio (access open)
router.get("/get/:id", PortfolioController.getProjectID);

module.exports = router;
