module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {

    content: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return Comment;
};
