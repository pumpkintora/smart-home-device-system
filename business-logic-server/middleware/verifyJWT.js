const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send({ authenticated: false });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ authenticated: false });
      } else {
        req.userId = decoded.user_id;
        next();
      }
    });
  }
};

module.exports = { verifyJWT }