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
    message:"this is tomomin api app ；；pp"
  })
})
app.use('/v1/', router)

app.listen(3000, () => {
    console.log('start')
    console.log(process.env.DB_HOSTNAME)
    console.log({
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      database: process.env.DB_DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      // timezone: 'jst',
  })
});

