const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.payload.roles)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRoles };
