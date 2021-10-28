const express = require('express')
const cors = require('cors')
const connection = require('./models/db-connection')

console.log("############")
console.log(process.env.DB_HOSTNAME)
console.log('############')
console.log(process.env)
require('dotenv').config();
// const bodyParser = require('body-parser')


const router = require('./router')
const app = express()
app.use(express.json())

app.use(cors())

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
  });

app.get('/' , (req , res) => {
  res.render({
    message:"this is tomomin api app"
  })
})
app.use('/v1/', router)

app.listen(3000, () => {
    console.log('start')
    console.log(process.env.DB_HOSTNAME)
});

