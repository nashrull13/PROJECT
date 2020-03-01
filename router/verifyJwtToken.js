const jwt = require("jsonwebtoken");
const config = require("../app/config.js");
const db = require("../app/db.js");
const Role = db.role;
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided."
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Fail to Authentication. Error -> " + err
      });
    }
    req.user_id = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.user_id).then(user => {
    
      
        if (user.admin = true) {
          next();
          return;
        }
      
      res.status(403).send("Require Admin!");
      return;
    
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;

module.exports = authJwt;
