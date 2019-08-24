const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token não encontrado',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: 'Token inválido',
    });
  }
};
