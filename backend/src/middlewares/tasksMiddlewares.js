const validateFieldTitle = (request, response, next) => {
  const { body } = request;

  if (body.title === undefined) {
    return response
      .status(400)
      .json({ message: 'O campo "title" é obrigatorio' });
  }

  if (body.title === "") {
    return response
      .status(400)
      .json({ message: 'O campo "title" não pode ser vazio' });
  }

  next();
};

const validateFieldStatus = (request, response, next) => {
  const { body } = request;

  if (body.status === undefined) {
    return response
      .status(400)
      .json({ message: 'O campo "status" é obrigatorio' });
  }

  if (body.status === "") {
    return response
      .status(400)
      .json({ message: 'O campo "status" não pode ser vazio' });
  }

  next();
};

module.exports = {
  validateFieldTitle,
  validateFieldStatus,
};
