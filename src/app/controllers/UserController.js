const jwt = require('jsonwebtoken');
const { User, App, AppUser } = require('../models');
require('dotenv').config();

class UserController {
  async list(req, res) {
    const response = await User.findAll();
    res.json(response);
  }

  async create(req, res) {
    const { email, appId } = req.body;
    const app = await App.findByPk(appId);
    if (await User.findOne({ where: { email } })) return res.status(400).json({ error: 'User already exists' });

    if (!app) return res.status(400).json(`App '${appId}' does not exists`);

    /**
     * TODO: Implementar controle de transação
     */
    try {
      const userCreated = await User.create(req.body, { raw: true });
      if (app || app.length > 0) {
        await userCreated.setApps(app);
      }

      const token = jwt.sign(
        { id: userCreated.id, telephone: userCreated.telephone, appId },
        process.env.SECRET,
        {
          expiresIn: 100000,
        },
      );
      const { id } = userCreated;

      const user = await User.findByPk(id, {
        include: [
          {
            model: App,
            as: 'apps',
            through: { attributes: [] },
          },
        ],
      });

      return res.status(201).json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: `Failed to create user: ${error}` });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await User.findByPk(id, {
      include: [
        {
          model: App,
          as: 'apps',
          through: { attributes: [] },
        },
      ],
    });

    res.json(response);
  }

  async update(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) return res.status(400).json({ error: 'User not found' });

    await User.update(req.body, { where: { id } });

    return res.json(await User.findByPk(id));
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
