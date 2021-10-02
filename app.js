const express = require('express')
const cors = require('cors')

const router = require('./router')
const app = express()


app.use(cors())
app.use('/v1/', router)

app.listen(3030, () => {
    console.log('start')
});