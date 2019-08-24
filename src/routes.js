const express = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');
const cors = require('cors');
const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('./app/controllers/AuthController');

const UserController = require('./app/controllers/UserController');

const UserValidator = require('./app/validators/User');

const routes = express.Router();

routes.post('/authenticate', handle(AuthController.auth));
routes.post('/users', validate(UserValidator), handle(UserController.create));

routes.use(cors());
routes.use(authMiddleware);

routes.get('/users', handle(UserController.list));
routes.get('/users/:id', handle(UserController.get));
routes.put('/users/:id', handle(UserController.update));

routes.delete('/users/:id', handle(UserController.destroy));

module.exports = routes;
