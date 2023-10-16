const jwt = require("jsonwebtoken");
const google = require('googleapis').google;

class checkAuth {
  async check(req, res, next) {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    
    // const OAuth2 = google.auth.OAuth2;
    // const oauth2Client = new OAuth2();
    // oauth2Client.setCredentials({ access_token: token });
    // const oauth2 = google.oauth2({
    //   auth: oauth2Client,
    //   version: 'v2'
    // });
    // oauth2.userinfo.get(
    //   function(err, res) {
    //     if (err) {
    //        console.log(err);
    //     } else {
    //        console.log({...res.data});
    //        req.userId = {...res.data};
    //        next();
    //     }
    // });

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
