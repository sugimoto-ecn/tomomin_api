require("dotenv").config();

const crypto = require("crypto");
const salt = process.env.PASSWORD_SALT;

const toHash = (value) => {
  const sha512 = crypto.createHash("sha512");
  sha512.update(value + salt);
  const hash = sha512.digest("hex");

  return hash;
};

const createProductId = () => {
  // 生成する文字列の長さ
  const l = 8;
  // 生成する文字列に含める文字セット
  const c = "0123456789";
  const cl = c.length;
  let r = "";
  for (let i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }

  return r;
};

const jwtDecode = (token) => {
  const atob = (base64) => {
    var buffer = Buffer.from(base64, "base64");
    var utf8 = buffer.toString("utf8"); // Not "ascii"
    return utf8;
  };
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  var encodeURI = encodeURIComponent(atob(base64));
  var decodeString = decodeURIComponent(encodeURI);
  return JSON.parse(decodeString);
};

module.exports = {
  toHash,
  createProductId,
  jwtDecode
};
