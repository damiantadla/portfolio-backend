const Project = require("../models/Project");
const fs = require("fs").promises;

const newProject = async (req, res) => {
  if (!req.files || !req.files.image || req.files.image.length === 0) {
    return res.status(400).json({ message: "Please upload an image" });
  }

  const url = req.files.image[0].destination + req.files.image[0].filename;
  const { title, description, demo } = req.body;
  if (title && description && demo) {
    try {
      const project = await Project.create({
        title,
        description,
        demo,
        urlImg: url,
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "Please fill in all fields" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, demo } = req.body;
  if (!req.files || !req.files.image || req.files.image.length === 0) {
    return res.status(400).json({ message: "Please upload an image" });
  }

  const url = req.files.image[0].destination + req.files.image[0].filename;

  if (!id) {
    res.status(400).json({ message: "Please fill in id field" });
  }
  try {
    const checkProject = await Project.findById(id);

    if (!checkProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    const oldImgUrl = await Project.findById(id, "urlImg");

    if (oldImgUrl.urlImg) {
      await fs.unlink(oldImgUrl.urlImg);
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        demo,
        urlImg: url,
      },
      {
        new: true,
      },
    );

    return res.status(200).json(project);
  } catch (err) {
    return res.status(400).json({
      message: "Error updating project",
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const checkProject = await Project.findById(id);
      if (!checkProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      const project = await Project.findByIdAndDelete(id);
      if (project) {
        await fs.unlink(checkProject.urlImg);
        return res.status(200).json({ message: "Project deleted" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectID = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "You must provide a project ID" });
  }
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  newProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectID,
};
