const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");
const jwtDecode = require("jwt-decode");

const verifyToken = (req, res, next) => {
  // splitで半角スペースで分割して後ろ側がTokenになる
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if(req?.params?.userId){
    const decodedToken = jwtDecode(token);
    if(decodedToken.id != req.params.userId){
      res.status(403).send({
        isSuccess: false,
        message: "ユーザー認証に失敗しました",
      });
    }
  
  }

  if (token) {
    jwt.verify(token, config.jwt.secret, function (error, decoded) {
      if (error) {
        return res.status(403).send({
          isSuccess: false,
          message: "トークンの認証に失敗しました。",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      isSuccess: false,
      message: "トークンがありません。",
    });
  }
}
module.exports = {
    verifyToken
};
