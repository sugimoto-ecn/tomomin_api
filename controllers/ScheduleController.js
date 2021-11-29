const connection = require("../models/db-connection");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");
const ScheduleModel = require('../models/schedule')


//ユーザ登録
const createSchedule = async (req, res) => {
  const body = req.body
  const userId = req.params.userId;
  if(!body?.wakeup || !body?.sleep) {
      res.json({
          message:"正しく入力してください"
      })
  }
  const {wakeup , sleep} = body

  const user = await ScheduleModel.create(userId, wakeup, sleep)

  res.json(user)
};


const getOneSchedule = async (req, res) => {
    const userId = req.params.userId;
    const user = await ScheduleModel.getOne(userId)
  
    res.json(user)
  };

// const updateSchedule = async(req, res) => {
//     const userId = req.params.userId;
//     const user = await ScheduleModel.getOne(userId)

//     res.json(user)
// }


module.exports = {
    createSchedule,
    getOneSchedule
};
