const db = require("../app/db.js");
const Article = db.article;
const asyncMiddleware = require("express-async-handler");

//Insert Article
exports.AddArticle = asyncMiddleware(async (req, res) => {
  await Article.create(
    {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
      
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Article successfully added!"
  });
});

//Update Article
exports.UpdateArticle = asyncMiddleware(async (req, res) => {
  await Article.update(
    {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status      
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Article successfully updated!"
  });
});

//show article by id
exports.GetArticleId = asyncMiddleware(async (req, res) => {
  const article = await Article.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "title",
      "content",
      "status"      
    ]
  });

  res.status(201).json({
    description: "Show article selected",
    article: article
  });
});

//show all article
exports.GetArticle = asyncMiddleware(async (req, res) => {
  const article = await Article.findAll({
    attributes: [
      "id",
      "title",
      "content",
      "status"      
    ]
  });
  res.status(201).json({
    description: "Show all article",
    article: article
  });
});

//delete book
exports.DeleteArticle = asyncMiddleware(async (req, res) => {
  await Article.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "Article successfully deleted"
  });
});
