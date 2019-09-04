const { App } = require('../models');
require('dotenv').config();

class AppController {
  async list(req, res) {
    const response = await App.findAll();
    res.json(response);
  }

  async create(req, res) {
    const { name } = req.body;

    if (await App.findOne({ where: { name } })) {
      return res.status(400).json({ error: 'App already exists' });
    }
    try {
      const app = await App.create(req.body);
      return res.status(201).json(app);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await App.findByPk(id);

    res.json(response);
  }

  async update(req, res) {
    const { id } = req.params;

    const app = await App.findByPk(id);

    if (!app) return res.status(400).json({ error: 'App not found' });

    await App.update(req.body, { where: { id } });
    return res.json(await App.findByPk(id));
  }

  async destroy(req, res) {
    const { id } = req.params;

    const app = await App.findByPk(id);

    if (!app) return res.status(400).json({ error: 'App not found' });
    try {
      await App.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
    }

    return res.sendStatus(204);
  }
}

module.exports = new AppController();
