const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return s.status(401).json({
      message: "Auth failed",
    });
  }
}

module.exports = authenticate;
