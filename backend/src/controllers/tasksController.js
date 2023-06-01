const taskModels = require("../models/taskModels");

const getAll = async (request, response) => {
  const tasks = await taskModels.getAll();
  return response.status(200).json(tasks);
};

const addTask = async (request, response) => {
  const addTask = await taskModels.addTask(request.body);
  return response.status(201).json(addTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;
  await taskModels.deleteTask(id);
  return response.status(204).json();
};

const updateTask = async (request, response) => {
  const { id } = request.params;
  await taskModels.updateTask(id, request.body);
  return response.status(204).json();
};

module.exports = {
  getAll,
  addTask,
  deleteTask,
  updateTask,
};
