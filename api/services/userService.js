const pool = require('../config/database');


module.exports = {
    create: (data, callback) => {
        pool.query(`insert into users(name,email,username,password) values(?,?,?,?)`,
            [data.name, data.email, data.username, data.password],
            (error, res, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, res);
            }
        )
    },
    getUsers: callback => {
        pool.query(`select id,name,email,username from users`,
            [],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res);
            }
        )
    },
    getUserById: (id, callback) => {
        pool.query(`select id,name,email,username from users where id = ?`,
            [id],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res[0]);
            }
        )
    },
    updateUser: (data, callback) => {
        console.log("MHSLOG : data ->>  ", data);
        pool.query(`update users set name=?,email=?,password=? where id = ?`,
            [data.name, data.email, data.password, data.id],

            (error, res, fields) => {
                console.log("MHSLOG : userupdate res ->>  ", res);
                if (error) {
                    return callback(error);
                }
                return callback(null, res[0]);
            }
        )
    },
    deleteUser: (data, callback) => {
        pool.query(`delete from users where id = ?`,
            [data.id],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res[0]);
            }
        )
    },
    getUserByUserEmail: (email, callback) => {
        pool.query(`select * from users where email = ?`,
            [email],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res[0]);
            }
        )
    }
}