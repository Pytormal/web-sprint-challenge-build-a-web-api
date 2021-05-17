// Write your "projects" router here!
const router = require("express").Router();
const Project = require("./projects-model.js");
const Action = require("../actions/actions-model");
const ExpressError = require("../expressError");

//  //  // Get all Projects
router.get("/", async (req, res, next) => {
  try {
    res.json(await Project.get());
  } catch (err) {
    res.status(404);
    next(new ExpressError(err, 500));
  }
});

//  //  // Get by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.get(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({
        message: "specified id does not exist or is found",
      });
    }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
});

//  //  // Attempted
router.get("/:id/actions", async (req, res, next) => {
  const { actions } = req.params;
  try {
    const action = await Project.get(actions);
    if (action) {
      res.json(action);
    } else {
      res.status(404).json({
        message: "specified id does not exist or is found",
      });
    }
    res.json(action);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
});


//  //  // Insert new project
router.post("/", async (req, res, next) => {
  try {
    const project = await Project.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(new ExpressError(err, 400));
  }
});

//  //  // Update by id
router.put("/:id", async (req, res, next) => {
  const changes = req.body;
  const { id } = req.params;

  if (!changes.name || !changes.description || changes.completed) {
    res.status(400).json({
      message:
        "Please provide a description and description, or whether the action is completed",
    });
  } else {
    await Project.update(id, changes).then((updatedProject) => {
      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        next(new ExpressError(err, 500));
      }
    });
    next(new ExpressError(err, 400));
  }
});

//  //  // Delete by id
router.delete("/:id", async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    res.status(204).send("");
  } catch (err) {
    next(new ExpressError(err, 500));
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something went wrong inside the project router",
    errMessage: err.message,
  });
});

module.exports = router;
