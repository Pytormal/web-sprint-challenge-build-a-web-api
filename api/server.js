const express = require("express");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use((err, req, res, next) => {
  server.get("/", (req, res) => {
    res.json({ api: "up" });
  });
});

module.exports = server;
