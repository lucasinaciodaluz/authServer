const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class AuthController {
  async auth(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!user) return res.status(400).json(`User '${email}' does not exists`);

    if (!(await bcrypt.compare(password, user.password))) return res.status(400).json('Invalid authentication');

    const token = jwt.sign({ id: user.id, telephone: user.telephone }, process.env.SECRET, {
      expiresIn: 100000,
    });

    return res.send({ user, token });
  }
}

module.exports = new AuthController();
