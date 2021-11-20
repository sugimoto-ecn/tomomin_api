require('dotenv').config();
const crypto = require("crypto");
const salt = process.env.PASSWORD_SALT

const toHash = (value) => {
    const sha512 = crypto.createHash("sha512");
    sha512.update(value+salt);
    const hash = sha512.digest("hex");

    return hash
}

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

    return r
}


module.exports = {
    toHash,
    createProductId
}