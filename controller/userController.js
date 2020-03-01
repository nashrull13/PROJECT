const db = require("../app/db.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");
const express = require("express");

var app = express();
app.use(express.json());

//show all user 
exports.GetUser = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: [
      "id",
      "name",
      "username",
      "email",
      "password",
      "admin",
      "status"
    ],
    
  });
  res.status(200).json({
    description: "Show All User",
    user: user
  });
});

//show user by id
exports.GetUserId = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "name",
      "username",
      "email",
      "password",
      "admin",
      "status"
    ]
  });

  res.status(201).json({
    description: "Show user selected",
    user: user
  });
});

//Update User
exports.UpdateUser = asyncMiddleware(async (req, res) => {
  await User.update(
    {
      id: req.body.id,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "User successfully updated!"
  });
});


//Delete User
exports.DeleteUser = asyncMiddleware(async (req, res) => {
  await User.destroy({ where: { id: req.params.id }})
  res.status(200).send({
    status: "User Deleted Successfully!"
  });
});