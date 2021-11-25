const connection = require("./db-connection");

const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config')


const ScheduleModel = {
    create(user_id, wakeup, sleep){
        return new Promise(function(resolve, reject){
            let sql = "INSERT INTO schedules (user_id, wakeup, sleep) VALUES(?, ?, ?)"
            connection.query(sql, [user_id, wakeup, sleep], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
            
        })
    },
    getOne(user_id){
        return new Promise(function(resolve, reject){
            let sql = `SELECT * FROM schedules WHERE user_id = ? ORDER BY id DESC LIMIT 1`
            connection.query(sql, [user_id], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows : {};
                return resolve(result);
            })
            
        })
    },

}

module.exports = ScheduleModel