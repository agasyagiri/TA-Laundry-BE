const jwt = require("jsonwebtoken");

const auth =
  (...akses) =>
  (req, res, next) => {
    try {
      const token =
        res?.cookies?.token || req.headers?.authorization?.split("Bearer ")[1];
      if (!token)
        return res.status(401).json({ status: 401, message: "Unauthorized" });
      const JWT_SECRET = process.env.JWT_SECRET;
      const decode = jwt.verify(token, JWT_SECRET);
      if (!akses.includes(decode.role))
        return res.status(401).json({ status: 401, message: "Unauthorized" });

      res.token = decode;
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
  };

module.exports = { auth };
