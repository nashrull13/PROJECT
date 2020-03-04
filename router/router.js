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
    [ verifySignUp.checkDuplicateUserNameOrEmail ],
    authController.register
  );

  //Login
  app.post("/login", //[authJwt.verifyToken], 
  authController.login);

  // Show all user
  app.get("/user", 
  //[authJwt.verifyToken], 
  userController.GetUser);

  // Show user by id
  app.get("/user/:id", 
  //[authJwt.verifyToken], 
  userController.GetUserId);

  // Update user
  app.put("/user/:id", 
  //[authJwt.verifyToken], 
  userController.UpdateUser);

  // Delete user
  app.delete("/user/:id", 
  //[authJwt.verifyToken], 
  userController.DeleteUser);


  //------------------------------------------------Article-----------------------------------------//

  // Insert Article
  app.post(
    "/article",
    //[authJwt.verifyToken],
    articleController.AddArticle
  );

  //Update article
  app.put("/article/:id", //[authJwt.verifyToken], 
  articleController.UpdateArticleStatus);
    
  //Delete article
  app.delete("/article/:id", [authJwt.verifyToken], articleController.DeleteArticle);

  app.get(
    "/articlefalse",
    // , [authJwt.verifyToken]
    articleController.GetArticleFalse
  );
  app.get(
    "/articlecomment/:id",
    // [authJwt.verifyToken],
    commentController.GetCommentbyArticle
  );
  app.get(
    "/article",
    // , [authJwt.verifyToken]
    articleController.GetArticle
  );
  app.get(
    "/articleadmin",
    // , [authJwt.verifyToken]
    articleController.GetArticleAdmin
  );
  app.get(
    "/articleguess",
    // , [authJwt.verifyToken]
    articleController.GetArticleGuess
  );
  app.get(
    "/articletrue",
    // , [authJwt.verifyToken]
    articleController.GetArticleTrue
  );

  /* Tampil book by ID. */
  app.get(
    "/article/:id",
    // [authJwt.verifyToken],
    articleController.GetArticleId
  );
  app.get(
    "/articleuser/:id",
    // [authJwt.verifyToken],
    articleController.GetArticleIdUser
  );

  //------------------------------------------------COMMENT-----------------------------------------//

  // Insert Comment
  app.post(
    "/comment/:id_article/:id_user",
    //[authJwt.verifyToken], 
    commentController.AddComment);

  //Update comment
  app.put("/commenttrue/:id", //[authJwt.verifyToken], 
  commentController.UpdateCommentTrue);

  app.put("/commentfalse/:id", //[authJwt.verifyToken], 
  commentController.UpdateCommentFalse);

  //Show comment by article
  app.get("/comment", //[authJwt.verifyToken], 
  commentController.GetComment);

  // //Show comment by id
  // app.get("/comment/:id", [authJwt.verifyToken], commentController.GetCommentId);

  //Delete comment
  app.delete("/comment/:id", 
  // [authJwt.verifyToken], 
  commentController.DeleteComment);

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
