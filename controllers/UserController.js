const connection = require('../models/db-connection')
const crypto = require('crypto')
// 生成する文字列の長さ
var l = 8;

// 生成する文字列に含める文字セット
var c = "0123456789";

var cl = c.length;
var r = "";
for(var i=0; i<l; i++){
  r += c[Math.floor(Math.random()*cl)];
}


//ユーザ登録
const registerUser = (req, res) => {
    // console.lozg(req)
    // console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.password)

    const sha512 = crypto.createHash('sha512')
var pass = req.body.password
// console.log(pass)
// console.log(sha512)
  sha512.update(pass)
  console.log(sha512)
  var hash = sha512.digest('hex')
  console.log(hash)

connection.query(
    'INSERT INTO users (email, password, product) VALUES(?, ?, ?)',
    [req.body.email, hash, r],
    (error, results) => {
        console.log('=========')
        console.log(error)
        console.log(results)
        console.log('=========')
        res.json({
            email:req.body.email,
            password:req.body.password,
            id:1,
            product:r
        })
        // console.log(r)
    }
);
}


//ユーザ情報取得
const getOneUser = (req, res) => {
    const id = req.params.userId
    console.log(id)
    connection.query(
        "SELECT id, name, email, product from users WHERE id=?",
        [id],   
        (error, results) => {
            console.log(results)
            res.json({
                results
            })
        }
    );
}


//ユーザ情報更新
const updateUser = (req, res) => {
    console.log(req.body.name)
    console.log(req.body.message)
    console.log(req.params)

    connection.query(
        'UPDATE users SET name = ?, message = ?',
        [req.body.name, req.body.message, r, id],
        (error,results)=>{
          connection.query(
            'SELECT id, name, message, email, FROM users ORDER BY date',
          );
        }
      )

    res.json({
        name:req.body.name,
        message:req.body.message,
    })
}

const getUpdateUser = (req, res) => {
    console.log(req.params)
    res.json({
        message:"ユーザー更新API"
    })
}



const getUser =(req, res) =>{
    console.log(req.params)
    res.json({
        name:string,
        email:string,
        message:string,
        product:string,
    })
}


//ログイン
const loginUser = (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)

    connection.query(
        'SELECT email, password, FROM users  WHERE email = ? AND password = ? ORDER BY ASC',
        [req.body.email, hash],
    )

    res.json({
        email:req.body.email,
        password:req.body.password,
    })
}

const getLoginUser = (req, res) =>{
    console.log(req.params)
    res.json({
        message:"ユーザーログインAPI"
    })
}


//プロダクト登録
const productUser = (req, res) =>{
    console.log(req.body.value)

    connection.query(
        'SELECT value FROM users ORDER BY ASC',
        [r],
    )

    res.json({
        value:req.body.value,
    })
}

const getProductUser =(req, res) =>{
    console.log(req.params)
    res.json({
        message:"success"
    })
}


//sleepsのget　睡眠情報取得
const getSleepData = (req, res) => {
    const userId = req.params.userId
    const start = req.query.start
    const end = req.query.end
    console.log(userId)
    console.log(start)
    console.log(end)
    connection.query(
       /* "SELECT id, name, email, product from sleeps WHERE userId=?",
        [userId],*/
        "SELECT sleeped_at, wakeuped_at, sleep_time from sleeps WHERE userId=? AND datetime　BETWEEN ?　AND ?",
        [userId, start, end],   
        (error, results) => {
            console.log(results)
            res.json({
                results
            })
        }
    );
}

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
    getSleepData,//sleepsのget
}