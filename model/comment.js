module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id_comment: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_article: {
      type: Sequelize.INTEGER
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return Comment;
};
