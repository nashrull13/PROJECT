const env = require("./env.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../model/user.js")(sequelize, Sequelize);
db.article = require("../model/article.js")(sequelize, Sequelize);
db.comment = require("../model/comment.js")(sequelize, Sequelize);

db.user.hasMany(db.article, {  
  foreignKey: "id_user"  
});
db.user.hasMany(db.comment, {
  foreignKey: "id_user" 
});
db.article.hasMany(db.comment, {  
  foreignKey: "id_article"
});

db.article.belongsTo(db.user, {  
  foreignKey: "id_user"  
});
db.comment.belongsTo(db.user, {
  foreignKey: "id_user" 
});
db.comment.belongsTo(db.article, {  
  foreignKey: "id_article"
});


module.exports = db;
