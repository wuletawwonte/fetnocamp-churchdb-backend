const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
    });
  }
}

module.exports = authenticate;
