const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const secretWord = "importantsecret";
    const headerToken = req.headers.authorization.split(' ')[1];
    const useToken = headerToken ? verify(headerToken, secretWord) : verify(accessToken, secretWord);

    if (!useToken) return res.json({ error: "User not logged in!" });

    try {
        req.user = useToken;
        if (useToken) {
            return next();
        }
    } catch (err) {
        return res.status(401).json({ error: err });
    }

};

const verifyTokenAndAuth = (req, res, next) => {
    const secretWord = "importantsecret";
    const headerToken = req.headers.authorization.split(' ')[1];
    const userToken = headerToken ? verify(headerToken, secretWord) : verify(accessToken, secretWord);

    if (!userToken && !userToken.isAdmin) {
        return res.json({ error: "User not logged in or not admin!" })
    }

    try {
        req.user = userToken;
        if (userToken) {
            return next();
        }
    } catch (err) {
        return res.status(401).json({ error: err });
    }
}

module.exports = { validateToken, verifyTokenAndAuth };
