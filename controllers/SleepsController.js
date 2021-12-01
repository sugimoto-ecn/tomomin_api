const e = require('express')
const connection = require('../models/db-connection')
const SleepModel = require('../models/sleep')
const moment = require('moment')

const create = async (req, res) => {
	try{
		const {
			type,
			user_id
		} = req.body
		const value = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		let wakeup,sleep
		let result;
		if(type == "wakeup"){
			
			result = await SleepModel.sleep(user_id, value)
		}else{
		
			result = await SleepModel.wakeup(user_id, value)
		}

		
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
	create,
	get,
}