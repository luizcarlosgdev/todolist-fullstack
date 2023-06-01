const express = require("express");

const router = express.Router();

const taskController = require("./controllers/tasksController");
const taskMiddleware = require("./middlewares/tasksMiddlewares");

router.get("/tasks", taskController.getAll);

router.post(
  "/tasks",
  taskMiddleware.validateFieldTitle,
  taskController.addTask
);

router.delete("/tasks/:id", taskController.deleteTask);

router.put(
  "/tasks/:id",
  taskMiddleware.validateFieldStatus,
  taskMiddleware.validateFieldTitle,
  taskController.updateTask
);

module.exports = router;
