const db = require("../app/db.js");
const config = require("../app/config.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    admin: req.body.admin,
    status: req.body.status
  });
  res.status(201).send({
    status: "User registered successfully!"
  });
});

exports.login = asyncMiddleware(async (req, res) => {
  console.log("Sign-In");
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (!user) {
    return res.status(404).send({
      auth: false,
      accessToken: null,
      reason: "User Not Found!"
    });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Invalid Password!"
    });
  } else if (user.status === false) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Account suspended!"
    });
  }
  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    type: "Bearer",
    accessToken: token,
    admin: user.admin,
    status: user.status,
    id_user: user.id_user,
    name: user.name
  });
});
