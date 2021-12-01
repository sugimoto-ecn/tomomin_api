const e = require('express')
const connection = require('../models/db-connection')
const SleepModel = require('../models/sleep')

const update = async (req, res) => {
	try{
		const {
			type,
			value,
			user_id
		} = req.body
		let wakeup,sleep
		if(type == "wakeup"){
			wakeup = value;
			sleep = null
		}else{
			sleep = value;
			wakeup = null
		}
		const result = await SleepModel.create(user_id, wakeup, sleep)

		
		res.json({
			message:"success"
		})
	}catch(err){
		console.log(err)
		res.status(500).json({message:"err"})
	}
}

const get = async (req,res) => {
	try{
	
		const result = await SleepModel.getOne(req.params.userId)

		
		res.json(result)
	}catch(err){
		console.log(err)
		res.status(500).json({message:"err"})
	}
}

module.exports = {
	update,
	get,
}