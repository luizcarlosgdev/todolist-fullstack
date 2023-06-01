const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-task");

//buscando tasks
const fetchTasks = async () => {
  const response = await fetch("http://localhost:3333/tasks");
  const tasks = await response.json();
  return tasks;
};

//adicionando tarefas
const addTask = async (e) => {
  e.preventDefault();

  const task = { title: inputTask.value };

  await fetch("http://localhost:3333/tasks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value = "";
};

//const delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "delete",
  });

  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: "short", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);
  return date;
};

//criando elementos
const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

//criando select
const createSelect = (value) => {
  const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluida">concluida</option>
  `;

  const select = createElement("select", "", options);
  select.value = value;
  return select;
};

//responsável por criar uma linha
const createRow = (task) => {
  const { id, title, status, created_at } = task;

  const tr = createElement("tr");
  const tdTitle = createElement("td", title);
  const createdAt = createElement("td", formatDate(created_at));
  const select = createSelect(status);

  select.addEventListener("change", ({ target }) =>
    updateTask({ ...task, status: target.value })
  );

  const tdStatus = createElement("td");
  const tdActions = createElement("td");

  const editButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'>edit</span>"
  );

  const deleteButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'>delete</span>"
  );

  //adicionando style
  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  //evento delete button
  deleteButton.addEventListener("click", () => {
    deleteTask(id);
  });

  //criando formulario para editTask
  const editForm = createElement("form");
  const editInput = createElement("input");

  editForm.appendChild(editInput);
  editInput.value = title;

  //evento editTask
  editButton.addEventListener("click", () => {
    tdTitle.innerText = "";
    tdTitle.appendChild(editForm);
  });

  //capturando evento formulario
  editForm.addEventListener("submit", () => {
    updateTask({ id, title: editInput.value, status });
  });

  tdStatus.appendChild(select);
  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(createdAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener("submit", addTask);

loadTasks();
