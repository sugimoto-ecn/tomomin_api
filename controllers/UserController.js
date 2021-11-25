const connection = require("../models/db-connection");
const {
    toHash,
    createProductId,
    jwtDecode
} = require("../util/user");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");
const UserModel = require('../models/user')
const ScheduleModel = require('../models/schedule')


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
const productUser = async (req, res) => {
  console.log(req.body.id);
  const user = await UserModel.productVerify(req.body.id)

  const schedule = await ScheduleModel.getOne(user.id)

  res.json({
    user,
    schedule
  });
};

module.exports = {
  registerUser,
  updateUser,
  getUser,
  loginUser,
  getLoginUser,
  productUser,
};
