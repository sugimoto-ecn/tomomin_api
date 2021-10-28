const express = require('express')
const cors = require('cors')
const connection = require('./models/db-connection')

require('dotenv').config();

const router = require('./router')
const app = express()
app.use(express.json())

app.use(cors())

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
  });

app.get('/' , (req , res) => {
  res.json({
    message:"this is tomomin api app 2"
  })
})
app.use('/v1/', router)

app.listen(3000, () => {
    console.log('start')
    console.log(process.env.DB_HOSTNAME)
});

