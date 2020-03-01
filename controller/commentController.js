const db = require("../app/db.js");
const Comment = db.comment;
const asyncMiddleware = require("express-async-handler");

//Insert Comment
exports.AddComment = asyncMiddleware(async (req, res) => {
  await Comment.create(
    {
      id: req.body.id,      
      content: req.body.content,
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Comment successfully added!"
  });
});

//Update Comment
exports.UpdateComment = asyncMiddleware(async (req, res) => {
  await Comment.update(
    {
      id: req.body.id,      
      content: req.body.content,
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Comment successfully updated!"
  });
});

//show comment by id
exports.GetCommentId = asyncMiddleware(async (req, res) => {
  const comment = await Comment.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "content",
      "status"
    ]
  });

  res.status(201).json({
    description: "Show comment selected",
    comment: comment
  });
});

//show all comment
exports.GetComment = asyncMiddleware(async (req, res) => {
  const comment = await Comment.findAll({
    attributes: [
      "id",     
      "content",
      "status"
    ]
  });
  res.status(201).json({
    description: "Show all comment",
    comment: comment
  });
});

//delete comment
exports.DeleteComment = asyncMiddleware(async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "Comment successfully deleted"
  });
});
