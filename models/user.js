const connection = require("./db-connection");
const {
    toHash,
    createProductId
} = require("../util/user");
const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config')


const UserModel = {
    login(email, password){
        return new Promise(function(resolve, reject){
            let sql = `SELECT * FROM users  WHERE email = ? AND password = ?`
            connection.query(sql, [email, password], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                const payload = {
                    email
                  };
                const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
                result.accessToken = token
                return resolve(result);
            })
            
        })
    },
    create(email, password, product){
        return new Promise(function(resolve, reject){
            let sql = "INSERT INTO users (email, password, product) VALUES(?, ?, ?)"
            connection.query(sql, [email, password, product], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
        })
    },
    update(name, message){
        return new Promise(function(resolve, reject){
            let sql = "UPDATE users SET name = ?, message = ?"
            
            connection.query(sql, [name, message], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
        })
    },
    getOneUser(id){
        return new Promise(function(resolve, reject){
            let sql = `SELECT id, name, email, message FROM users  WHERE id = ?`
            connection.query(sql, [id], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
            
        })
    },
    getLoginUser(email){
        return new Promise(function(resolve, reject){
            let sql = `SELECT id, name, email, message FROM users  WHERE email = ?`
            connection.query(sql, [email], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                return resolve(result);
            })
            
        })
    }
}

module.exports = UserModel