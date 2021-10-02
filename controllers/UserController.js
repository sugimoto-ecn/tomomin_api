const registerUser = (req, res) => {
    console.log(req.body)
    res.json({
        message:"ユーザー登録API"
    })
}

const getOneUser = (req, res) => {
    console.log(req.params)
    res.json({
        message:"ユーザー取得API"
    })
}


module.exports = {
    registerUser,
    getOneUser
}