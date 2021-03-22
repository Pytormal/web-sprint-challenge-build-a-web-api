// Write your "actions" router here!
const express = require("express");

const aRouter = express.Router();
const Actions = require("./actions-model");

// [GET] /api/actions
aRouter.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "could not retrieve posts" });
  }
});

// [GET] /api/actions/:id
aRouter.get("/:id", async (req, res) => {
  try {
    const actions = await Actions.get(id);
    if (actions) {
      res.json(actions);
    } else {
      res.status(404).json({
        message: "specified id does not exist or is found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "could not retrieve posts" });
  }
});

// [POST] /api/actions
aRouter.post("/", async (req, res) => {
  const action = req.body;
  if (!action.description || !action.notes) {
    res.status(400).json({ message: "provide a descriptor and notes" });
  } else {
    try {
      const newActions = await Actions.insert(action);
      res.status(201).json(newActions);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error saving to database" });
    }
  }
});

// [PUT] /api/actions/:id
aRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const actions = req.body;
  try {
    const updateAction = await Actions.update(id, changes);
    res.status(200).json(actions);
    if (updateAction) {
      res.status(404).json({
        message: "specified id does not exist or is found",
      });
    } else {
      res.status(400).json({ message: "provide a descriptor and notes" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error saving to database" });
  }
});

// [DELETE] /api/actions/:id
aRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await Actions.remove(id);
    if (action) {
      res.json(action);
    } else {
      res
        .status(404)
        .json({ message: "specified id does not exist or is found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "The action could not be removed" });
  }
});

module.exports = aRouter;
