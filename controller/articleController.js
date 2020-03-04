const db = require("../app/db.js");
const Article = db.article;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.AddArticle = asyncMiddleware(async (req, res) => {
  // Add book to Database
  await Article.create({
    title: req.body.title,
    content: req.body.content,
    id_user: req.body.id_user,
    status: false
  });
  res.status(201).send({
    status: "Article Successfully added!"
  });
});
exports.UpdateArticleStatus = asyncMiddleware(async (req, res) => {
  await Article.update(
    {
      status: req.body.status
    },
    { where: { id_article: req.params.id } }
  );
  res.status(201).send({
    status: "Article status has been change!"
  });
});

exports.GetArticleFalse = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { status: false },
    attributes: [
      "id_article",
      "title",
      "content",
      "id_user",
      "status",
      "createdAt"
    ],
    include: [
      {
        model: User,
        attributes: ["id_user", "name"]
      }
    ]
  });
  res.status(200).json({
    description: "Show all articles",
    data: article
  });
});
exports.GetArticleTrue = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { status: true },
    attributes: [
      "id_article",
      "title",
      "content",
      "id_user",
      "status",
      "createdAt"
    ],
    include: [
      {
        model: User,
        attributes: ["id_user", "name"]
      }
    ]
  });
  res.status(200).json({
    description: "show all articles",
    data: article
  });
});

exports.GetArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({    
    where: {status: true},
    attributes: [
      "id_article",
      "title",
      "content",
      "status",
      "id_user",
      "createdAt"
    ],
    include: 
      {
        model: User,
        attributes: ["name","id_user"]
      }
    
  });
  res.status(200).json({
    description: "Show article by id " + req.params.id,
    data: article
  });
});

exports.GetArticleAdmin = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({        
    attributes: [
      "id_article",
      "title",
      "content",
      "status",
      "id_user",
      "createdAt"
    ],
    include: 
      {
        model: User,
        attributes: ["name","id_user"]
      }
    
  });
  res.status(200).json({
    description: "Show article by id " + req.params.id,
    data: article
  });
});


exports.GetArticleGuess = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({    
    where: {status: true},
    attributes: [
      "id_article",
      "title",
      "content",
      "status",
      "id_user",
      "createdAt"
    ],
    include: 
      {
        model: User,
        attributes: ["name","id_user"]
      }
    
  });
  res.status(200).json({
    description: "Show article by id " + req.params.id,
    data: article
  });
});


exports.GetArticleId = asyncMiddleware(async (req, res) => {
  const article = await Article.findOne({
    where: { id_article: req.params.id },
    attributes: [
      "id_article",
      "title",
      "content",
      "status",
      "id_user",
      "createdAt"
    ],
    include: [
      {
        model: User,
        attributes: ["id_user", "name"]
      }
    ]
  });
  res.status(200).json({
    description: "Show Article id " + req.params.id,
    data: article
  });
});

exports.GetArticleIdUser = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    where: { id_user: req.params.id },
    
    attributes: ["id_article", "title", "content", "status"],
    include: [
      {
        model: User,
        attributes: ["id_user", "name"]
      }
    ]
  });
  res.status(200).json({
    description: "Show article by id user",
    data: article
  });
});

//show artikel
exports.GetAllArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    attributes: ["id_article", "title", "content", "id_user", "status"]
  });
  res.status(200).json({
    description: "Tampil Semua Artikel",
    data: article
  });
});

//delete book by id
exports.DeleteArticle = asyncMiddleware(async (req, res) => {
  await Article.destroy({ where: { id_article: req.params.id } });
  res.status(201).send({
    status: "Delete article successfully!"
  });
});
