const connection = require("./db-connection");
const {
    toHash,
    createProductId
} = require("../util/user");
const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config')


const UserModel = {
    getOneUser(id){
        return new Promise(function(resolve, reject){
            let sql = `SELECT id, name, product, product_verified, message, email FROM users  WHERE id = ?`
            connection.query(sql, [id], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                const payload = {
                    id: result.id,
                    name: result.name,
                    product: result.product,
                    verify: result.product_verified,
                    message: result.massage,
                    email:result.email
                  };
                  console.log('??????payload?????')
                  console.log(payload)
                  console.log("???????????")
                const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
                result.accessToken = token
                console.log(token)
                return resolve(result);
            })
            
        })
    },
    login(email, password){
        return new Promise(function(resolve, reject){
            let sql = `SELECT id, name, product, product_verified, message, email FROM users  WHERE email = ? AND password = ?`
            connection.query(sql, [email, password], function(err, rows, fields){
                if (err) return reject(err);
                let result = rows.length > 0 ? rows[0] : {};
                if(!rows.length) return resolve({})
                const payload = {
                    id: result.id,
                    name: result.name,
                    product: result.product,
                    verify: result.product_verified,
                    message: result.massage,
                    email
                  };
                  console.log(':::::::::')
                  console.log(payload)
                  console.log(":::::::")
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
    update(name, message, id){
        return new Promise(function(resolve, reject){
            let sql = "UPDATE users SET name = ?, message = ? WHERE id = ?"
            
            connection.query(sql, [name, message, id], function(err, rows, fields){
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
    },
    productVerify(id){
        return new Promise(function(resolve, reject){
            let sql = `SELECT id, name, email, message FROM users WHERE product = ?`
            let result;
            connection.query(sql, [id], function(err, rows, fields){
                if (err) return reject(err);
                result = rows.length > 0 ? rows[0] : {};
                console.log(result)
            })
            if (result == {}) return reject("no");
            sql =  "UPDATE users SET product_verified = 1 WHERE product = ?"
            connection.query(sql,[id] ,function(err, rows, fields){
                if (err) return reject(err);
               
                return resolve(result);
            })
        })
    }
}

module.exports = UserModel