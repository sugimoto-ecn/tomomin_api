const connection = require("../models/db-connection");
const {
    toHash,
    createProductId,
    jwtDecode
} = require("../util/user");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");
const UserModel = require('../models/user')


//ユーザ登録
const registerUser = async (req, res) => {
  const body = req.body
  if(!body?.email || !body?.password) {
      res.json({
          message:"正しく入力してください"
      })
  }
  const {email , password} = body
  const hash = toHash(password)
  const product = createProductId()

  const user = await UserModel.create(email, hash, product)

  res.json(user)
};

//ユーザ情報取得
const getOneUser = (req, res) => {
  const id = req.params.userId;
  console.log(id);
  connection.query(
    "SELECT id, name, email, product from users WHERE id=?",
    [id],
    (error, results) => {
      res.json({
        results,
      });
    }
  );
};

//ユーザ情報更新
const updateUser = async (req, res) => {
  const body = req.body
  if(!body?.name || !body.message){
    res.json({
      message: "正しく入力してください"
    })
  }
  const {name, message} = body
  await UserModel.update(name, message)

  

  res.json({
    name: req.body.name,
    message: req.body.message,
  });
};


const getUser = async (req, res) => {
  console.log(req.params);
  const user = await UserModel.getOneUser(req.params.userId)
  if(!user?.id){
    res.json({
      message:"not found"
    })
  }
  res.json({
    user
  });
};

//ログイン
const loginUser = async (req, res) => {
  const body = req.body
  if(!body?.email || !body?.password) {
      res.json({
          message:"正しく入力してください"
      })
  }
  const {email , password} = body
  const hash = toHash(password)
  
  const result = await UserModel.login(email, hash)
  console.log(result)

  res.json({
    result
  });
};

const getLoginUser = async (req, res) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  const {email} = jwtDecode(token)

  const user = await UserModel.getLoginUser(email)

  res.json({
    user,
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
  connection.query(
    "SELECT sleeped_at, wakeuped_at, sleep_time from sleeps WHERE userId=? AND datetime　BETWEEN ?　AND ?",
    [userId, start, end],
    (error, results) => {
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

  getUser,
  loginUser,
  getLoginUser,
  productUser,
  getProductUser,
  getSleepData, //sleepsのget
};
