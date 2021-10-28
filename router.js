const express = require('express')
const router = express.Router()

const {
    registerUser,
    getOneUser,
    updateUser,
    getUpdateUser,
    getUser,
    loginUser,
    getLoginUser,
    productUser,
    getProductUser,
} = require('./controllers/UserController')

const {
    sleepProduct,
    getSleepProduct,
    wakeUp,
    getWakeUp,
}= require('./controllers/SleepsController')

router.route("/users/register").post(registerUser)
router.route("/users/:userId/get").get(getOneUser)
router.route("/users/:userId/update").put(updateUser)
router.route("/users/:userId/get").get(getUpdateUser)
router.route("/users/:userId/get").get(getUser)
router.route("/users/login").post(loginUser)
router.route("/users/login/get").get(getLoginUser)
router.route("/users/product").post(productUser)
router.route("/user/product/get").get(getProductUser)

router.route("/sleeps/:productId/sleep").post(sleepProduct)
router.route("/sleeps/:productId/sleep/get").get(getSleepProduct)
router.route("/sleeps/:productId/wakeup").post(wakeUp)
router.route("/sleeps/productId/wakeup/get").get(getWakeUp)

module.exports = router;