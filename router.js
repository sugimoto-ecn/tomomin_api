const express = require('express')
const router = express.Router()

const {
    registerUser,
    getOneUser
} = require('./controllers/UserController')

router.route("/users/register").post(registerUser)
router.route("/users/:userId/get").get(getOneUser)

module.exports = router;