//todos arquivos que lidam com o banco de dados vão ficar dentro de models
const connection = require("./connection");

const getAll = async () => {
  const tasks = await connection.execute("SELECT * FROM tasks");
  return tasks[0];
};

const addTask = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();
  const query = "INSERT INTO tasks(title, status, created_at) VALUES(?, ?, ?)";

  const addTask = await connection.execute(query, [title, "pendente", dateUTC]);
  return { insertId: addTask[0].insertId };
};

const deleteTask = async (id) => {
  const removeTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
  return removeTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;

  const query = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";

  const updateTask = connection.execute(query, [title, status, id]);
  return updateTask;
};

module.exports = {
  getAll,
  addTask,
  deleteTask,
  updateTask,
};
