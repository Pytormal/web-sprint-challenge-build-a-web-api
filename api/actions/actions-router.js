// Write your "actions" router here!
const router = require("express").Router();
const Action = require("./actions-model.js");
const ExpressError = require("../expressError");

//  //  // Get all actions
router.get("/", async (req, res, next) => {
  try {
    res.json(await Action.get());
  } catch (err) {
    next(new ExpressError(err, 500));
  }
});

//  //  // Get by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Action.get(id);
     if (action) {
       res.json(action);
     } else {
       res.status(404).json({
         message: "specified id does not exist or is found",
       });
     }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
});

//  //  // Insert new Action
router.post("/", async (req, res, next) => {
  try {
    const action = await Action.insert(req.body);
    res.status(201).json(action);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
});

//  //  // Update by id
router.put("/:id", async (req, res, next) => {
  const changes = req.body;
  const { id } = req.params;

  if (!changes.description || !changes.notes || changes.completed) {
    res
      .status(400)
      .json({ message: "Please provide a description and extra notes, or whether the action is completed" });
  } else {
    await Action.update(id, changes).then((updatedAction) => {
      if (updatedAction) {
        res.status(200).json(updatedAction);
      } else {
        next(new ExpressError(err, 500));
      }
    });
    next(new ExpressError(err, 500));
  }
});

//  //  // delete by id
router.delete("/:id", async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.status(204).send("");
  } catch (err) {
    next(new ExpressError(err, 500));
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something went wrong inside the action router",
    errMessage: err.message,
  });
});

module.exports = router;
