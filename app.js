const express = require('express')
const cors = require('cors')
const connection = require('./models/db-connection')

const router = require('./router')
const app = express()


app.use(cors())

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
  });

app.use('/v1/', router)

app.listen(3030, () => {
    console.log('start')
});