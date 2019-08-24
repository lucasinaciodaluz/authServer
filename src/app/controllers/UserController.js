const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class UserController {
  async list(req, res) {
    const response = await User.findAll();
    res.json(response);
  }

  async create(req, res) {
    const { email } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'User already exists' });
    }

    try {
      const user = await User.create(req.body);

      if (!user) return res.status(400).json(`User '${email}' does not exists`);

      const token = jwt.sign({ id: user.id, telephone: user.telephone }, process.env.SECRET, {
        expiresIn: 100000,
      });

      return res.status(201).json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: `Failed to create user: ${error}` });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await User.findByPk(id);

    res.json(response);
  }

  async update(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) return res.status(400).json({ error: 'User not found' });

    await user.update(req.body);

    return res.json(user.get());
  }

  async destroy(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) return res.status(400).json({ error: 'User not found' });

    await user.destroy();

    return res.sendStatus(200);
  }
}

module.exports = new UserController();
