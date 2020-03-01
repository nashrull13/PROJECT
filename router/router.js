module.exports = function(app) {
  const verifySignUp = require("./verifySignUp");
  const authJwt = require("./verifyJwtToken");
  const authController = require("../controller/authController.js");
  const userController = require("../controller/userController.js");
  const articleController = require("../controller/articleController.js");
  const commentController = require("../controller/commentController.js");
  const db = require("../app/db.js");
  const Article = db.article;
  const express = require("express");
  const {
    articleValidationRules,
    userValidationRules,
    validate
  } = require("../controller/validator.js");

  app.use(express.json());

  //------------------------------------------------USERS-----------------------------------------//

  //Register
  app.post(
    "/register",
    [ verifySignUp.checkDuplicateUserNameOrEmail, userValidationRules(), validate ],
    authController.register
  );

  //Login
  app.post("/login", authController.login);

  // Show all user
  app.get("/user", [authJwt.verifyToken, authJwt.isAdmin], userController.GetUser);

  // Show user by id
  app.get("/user/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.GetUserId);

  // Update user
  app.put("/user/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.UpdateUser);

  // Delete user
  app.delete("/user/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.DeleteUser);


  //------------------------------------------------Article-----------------------------------------//

  // Insert Article
  app.post(
    "/article",
    [authJwt.verifyToken, articleValidationRules(), validate],
    articleController.AddArticle
  );

  //Update article
  app.put("/article/:id", [authJwt.verifyToken], articleController.UpdateArticle);
  
  //Show all article
  app.get("/article", articleController.GetArticle);

  //Show article by id
  app.get("/article/:id", articleController.GetArticleId);

  //Delete article
  app.delete("/article/:id", [authJwt.verifyToken], articleController.DeleteArticle);

  //------------------------------------------------COMMENT-----------------------------------------//

  // Insert Comment
  app.post(
    "/comment",
    [authJwt.verifyToken], commentController.AddComment);

  //Update comment
  app.put("/comment/:id", [authJwt.verifyToken], commentController.UpdateComment);

  //Show all comment
  app.get("/comment", [authJwt.verifyToken], commentController.GetComment);

  //Show comment by id
  app.get("/comment/:id", [authJwt.verifyToken], commentController.GetCommentId);

  //Delete comment
  app.delete("/comment/:id", [authJwt.verifyToken], commentController.DeleteComment);

  //------------------------------------------------ ERRORS-----------------------------------------//
  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
