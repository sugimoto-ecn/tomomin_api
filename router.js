const express = require('express')
const router = express.Router()

const {
    registerUser,
    updateUser,
    getUser,
    loginUser,
    getLoginUser,
    productUser,
    refreshUser
} = require('./controllers/UserController')

const {
    verifyToken
} = require('./middleware/auth')

const {
    sleepProduct,
    getSleepProduct,
    wakeUp,
    getWakeUp,
    getSleepData
} = require('./controllers/UserController')

const {
    createSchedule,
    getOneSchedule,
} = require('./controllers/ScheduleController')


const {
    update,
    get,
} = require('./controllers/SleepsController')


router.route("/users/register").post(registerUser)
router.route("/users/login/get").get(verifyToken, getLoginUser)
router.route("/users/login").post(loginUser)
router.route("/users/:userId/update").put(verifyToken, updateUser)
router.route("/users/:userId/get").get(verifyToken, getUser)

router.route("/users/product").post(productUser)

router.route("/schedule/:userId/create").post(verifyToken, createSchedule)
router.route("/schedule/:userId/getone").get(verifyToken, getOneSchedule)

router.route("/sleep/create").post(update)
router.route("/sleep/:userId/get").get(get)

module.exports = router;