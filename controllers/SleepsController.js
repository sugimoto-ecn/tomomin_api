const connection = require('../models/db-connection')

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
	wakeUp,
	getWakeUp,
}