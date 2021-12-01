const connection = require("./db-connection");

const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config')


const SleepModel = {
    
    sleep(user_id,sleep){
        return new Promise(function(resolve, reject){
            let result;
            // let sql = "SELECT * FROM sleeps "
            //         + "WHERE created >= (NOW() - INTERVAL 1 DAY) "
            //         + "AND user_id = ?"
            //         // + "where created BETWEEN "
            //         // + "TIMESTAMP(DATE(CONVERT_TZ(NOW(), 'UTC', 'Asia/Tokyo'))) AND "
            //         // // + "TIMESTAMP(DATE_ADD(CONVERT_TZ(CURRENT_DATE, INTERVAL 1 DAY));"
            //         // + "TIMESTAMP(DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY))"
            // connection.query(sql,[user_id], function(err, rows, fields){
            //     if (err) return reject(err);
            //     let result = rows.length > 0 ? rows[0] : {};
            //     return resolve(result);
            // })
            // if (!result) {
            sql = "INSERT INTO sleeps (sleeped_at, user_id) VALUES(?, ?)"
            // }else{
            //     sql = "UPDATE sleeps SET wakeup_at = ?, sleeped_at = ? WHERE user_id = ?"
            // }
            connection.query(sql, [sleep, user_id], function(err, rows, fields){
                console.log(err)
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
        })
    },
    wakeup(user_id,wakeup){
        return new Promise(function(resolve, reject){
            let result;

            let sql = "INSERT INTO wakeups (wakeup_at, user_id) VALUES(?, ?)"
       
            connection.query(sql, [wakeup, user_id], function(err, rows, fields){
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
            WHERE created >= (NOW() - INTERVAL 1 HOUR) and NOT (user_id = ?)`
            connection.query(sql, [user_id], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows : {};
                return resolve(result);
            })
            
        })
    },

}

module.exports = SleepModel