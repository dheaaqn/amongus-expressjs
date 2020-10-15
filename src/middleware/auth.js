const jwt = require("jsonwebtoken");
const helper = require("../helper/helper.js");

module.exports = {
  authUser: (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "Secret", (error, result) => {
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(res, 403, error.message);
        } else {
          req.token = result;
          next();
        }
      });
    } else {
      return helper.response(res, 400, "Login First!");
    }
  }
};
