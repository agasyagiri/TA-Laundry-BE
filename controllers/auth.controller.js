const express = require(`express`);
const md5 = require(`md5`);
const jwt = require(`jsonwebtoken`);
const userModel = require(`../models/index`).user;

exports.login = async (req, res) => {
  const { username, password } = req.body;

  let user = await userModel.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials." });
  }

  if (md5(password) !== user.password) {
    return res.status(400).json({ msg: "Invalid credentials." });
  }

  const token = jwt.sign(
    JSON.parse(JSON.stringify(user)),
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    },
  });
};
