const connection = require('../models/db-connection')


const sleepProduct = (req, res) => {
	console.log(req.body.datetime)
	connection.query(
	'SELECT product FROM users'
	)
	res.json({
			datetime:req.body.datetime,
	})
}

const getSleepProduct = (req,res) => {
	console.log(req.params)
	res.json({
			message:"OK"
	})
}

const wakeUp = (req, res) => {
	console.log(req.body.datetime)
	res.json({
		datetime:req.body.datetime
	})
}

const getWakeUp = (req,res) => {
	console.log(req.params)
	res.json({
		message:"OK"
	})
}

module.exports = {
	sleepProduct,
	getSleepProduct,
	wakeUp,
	getWakeUp,
}