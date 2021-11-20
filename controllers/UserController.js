const connection = require("../models/db-connection");
const {
    toHash,
    createProductId
} = require("../util/user");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");


//ユーザ登録
const registerUser = (req, res) => {
  const body = req.body
  if(!body?.email || !body?.password) {
      res.json({

          message:"正しく入力してください"
      })
  }
  const {email , password} = body
  const hash = toHash(password)
  const product = createProductId()

  connection.query(
    "INSERT INTO users (email, password, product) VALUES(?, ?, ?)",
    [email, hash, product],
    (error, results) => {
      res.json({
        email: email,
        product: product,
      });
    }
  );
};

//ユーザ情報取得
const getOneUser = (req, res) => {
  const id = req.params.userId;
  console.log(id);
  connection.query(
    "SELECT id, name, email, product from users WHERE id=?",
    [id],
    (error, results) => {
      console.log(results);
      res.json({
        results,
      });
    }
  );
};

//ユーザ情報更新
const updateUser = (req, res) => {
  console.log(req.body.name);
  console.log(req.body.message);
  console.log(req.params);

  connection.query(
    "UPDATE users SET name = ?, message = ?",
    [req.body.name, req.body.message, r, id],
    (error, results) => {
      connection.query(
        "SELECT id, name, message, email, FROM users ORDER BY date"
      );
    }
  );

  res.json({
    name: req.body.name,
    message: req.body.message,
  });
};

const getUpdateUser = (req, res) => {
  console.log(req.params);
  res.json({
    message: "ユーザー更新API",
  });
};

const getUser = (req, res) => {
  console.log(req.params);
  res.json({
    name: string,
    email: string,
    message: string,
    product: string,
  });
};

//ログイン
const loginUser = async (req, res) => {
  const test = await connection.query(
    "SELECT * FROM users  WHERE email = ? AND password = ? ORDER BY ASC",
    [req.body.email, hash]
  );
    res.json(test)
//   res.json({
//     email: req.body.email,
//     password: req.body.password,
//   });
};

const getLoginUser = (req, res) => {
  console.log(req.params);
  res.json({
    message: "ユーザーログインAPI",
  });
};

//プロダクト登録
const productUser = (req, res) => {
  console.log(req.body.value);

  connection.query("SELECT value FROM users ORDER BY ASC", [r]);

  res.json({
    value: req.body.value,
  });
};

const getProductUser = (req, res) => {
  console.log(req.params);
  res.json({
    message: "success",
  });
};

//sleepsのget　睡眠情報取得
const getSleepData = (req, res) => {
  const userId = req.params.userId;
  const start = req.query.start;
  const end = req.query.end;
  console.log(userId);
  console.log(start);
  console.log(end);
  connection.query(
    /* "SELECT id, name, email, product from sleeps WHERE userId=?",
        [userId],*/
    "SELECT sleeped_at, wakeuped_at, sleep_time from sleeps WHERE userId=? AND datetime　BETWEEN ?　AND ?",
    [userId, start, end],
    (error, results) => {
      console.log(results);
      res.json({
        results,
      });
    }
  );
};

module.exports = {
  registerUser,
  getOneUser,
  updateUser,
  getUpdateUser,
  getUser,
  loginUser,
  getLoginUser,
  productUser,
  getProductUser,
  getSleepData, //sleepsのget
};
