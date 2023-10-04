const jwt = require("jsonwebtoken");

class checkAuth {
  async check(req, res, next) {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.userId = decoded.id;
        next();
      } catch (error) {
        return res.status(403).json({
          message: "Нет доступа",
        });
      }
    }
    else { 
      return res.status(403).json({
        message: "Токен не найден",
      });
    }
  }
}

module.exports = new checkAuth();
