module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    id_article: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },  
    id_user: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return Article;
};
