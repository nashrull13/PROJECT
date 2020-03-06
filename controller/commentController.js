const db = require("../app/db.js");
const Comment = db.comment;
const Article = db.article;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

//Insert Comment
exports.AddComment = asyncMiddleware(async (req, res) => {
  await Comment.create({
    id_article: req.params.id_article,
    id_user: req.params.id_user,
    content: req.body.content,
    status: true
  });
  res.status(201).send({
    status:
      "Comment successfully added!" +
      req.params.id_article +
      " Has been create!"
  });
});

//Update Comment
exports.UpdateCommentTrue = asyncMiddleware(async (req, res) => {
  await Comment.update(
    {
      status: true
    },
    { where: { id_comment: req.params.id } }
  );
  res.status(201).send({
    status: "Comment successfully updated!"
  });
});

exports.UpdateCommentFalse = asyncMiddleware(async (req, res) => {
  await Comment.update(
    {
      status: false
    },
    { where: { id_comment: req.params.id } }
  );
  res.status(201).send({
    status: "Comment successfully updated!"
  });
});

//show comment by article
exports.GetCommentbyArticle = asyncMiddleware(async (req, res) => {
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
      },
      {
        model: Comment,
        where: { status: true },
        required: false,
        require: false,
        attributes: ["id_user", "id_comment", "content", "status", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["id_user", "name"]
          }
        ]
      }
    ]
  });

  res.status(201).json({
    description: "Show comment selected",
    data: article
  });
});

exports.GetComment = asyncMiddleware(async (req, res) => {
  const comment = await Comment.findAll({
    attributes: ["id_comment", "id_article", "id_user", "content", "status"],
    include: [
      {
        model: User,
        attributes: ["id_user", "name"]
      }
    ]
  });
  res.status(200).json({
    description: "Show All Comment",
    data: comment
  });
});

// //show all comment
// exports.GetComment = asyncMiddleware(async (req, res) => {
//   const comment = await Comment.findAll({
//     attributes: [
//       "title",
//       "content"
//     ]
//   });
//   res.status(201).json({
//     description: "Show all comment",
//     comment: comment
//   });
// });

//delete comment
exports.DeleteComment = asyncMiddleware(async (req, res) => {
  await Comment.destroy({ where: { id_comment: req.params.id } });
  res.status(201).send({
    status: "Comment successfully deleted"
  });
});
