const connection = require("./db-connection");

const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config')


const SleepModel = {
    
    create(user_id, wakeup, sleep){
        return new Promise(function(resolve, reject){
            let result;
            let sql = "SELECT * FROM sleeps "
                    + "WHERE created >= (NOW() - INTERVAL 1 DAY)"
                    // + "where created BETWEEN "
                    // + "TIMESTAMP(DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Tokyo'))) AND "
                    // // + "TIMESTAMP(DATE_ADD(CONVERT_TZ(CURRENT_DATE, INTERVAL 1 DAY));"
                    // + "TIMESTAMP(DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY))"
            connection.query(sql, function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
            if (!result) {
                sql = "INSERT INTO sleeps (wakeup_at, sleeped_at, user_id) VALUES(?, ?, ?)"
            }else{
                sql = "UPDATE sleeps SET wakeup_at = ?, sleeped_at = ? WHERE user_id = ?"
            }
            console.log(result)
            console.log(sql)
            console.log(wakeup, sleep, user_id)
            connection.query(sql, [wakeup, sleep, user_id], function(err, rows, fields){
                console.log(err)
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
        })
    },
    getOne(user_id){
        return new Promise(function(resolve, reject){
            let sql = 
            `SELECT * FROM sleeps
            WHERE created >= (NOW() - INTERVAL 2 HOUR) and NOT ( user_id = ?)`
            connection.query(sql, [user_id], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows : {};
                return resolve(result);
            })
            
        })
    },

}

module.exports = SleepModel