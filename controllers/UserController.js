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
  try{
    const body = req.body
    if(!body?.email || !body?.password) {
        res.json({
            message:"正しく入力してください"
        })
    }
    const {email , password} = body
    const hash = toHash(password)
    const product = createProductId()

    const result = await UserModel.create(email, hash, product)
    const user = await UserModel.login(email, hash)
  
    res.json({
      user
    })
  }catch(error){
    console.log(error)
    error?.sql && delete error.sql
    res.status(400).json(error)
  }
};

//ユーザ情報更新
const updateUser = async (req, res) => {
  try{
    const body = req.body
    if(!body?.name || !body.message){
      res.json({
        message: "正しく入力してください"
      })
    }
    const {name, message} = body
    await UserModel.update(name, message, req.params.userId)

    res.json({
      name: req.body.name,
      message: req.body.message,
    });
  }catch(error){
    console.log(error)
    error?.sql && delete error.sql
    res.status(400).json(error)
  }
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
  
  const user = await UserModel.login(email, hash)
  console.log("##############")
  console.log(user)
  if(!user?.accessToken){
    console.log('none')
    res.status(404).json({"message":"メールアドレス・パスワードのいずれかが間違っています。"})
  }

  res.json({
    user
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
