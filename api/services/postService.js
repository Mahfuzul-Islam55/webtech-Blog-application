const pool = require('../config/database');
const {getUserData} = require('../middlewares/validateToken');

module.exports = {
    createPost: (data, callback) => {
        pool.query(`INSERT INTO posts(title,body,user_id) VALUES (?,?,?)`,
            [data.title, data.body, data.user_id],
            (error, res, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, res);
            }
        )
    },
    getPostById: (id, callback) => {
        pool.query(`SELECT posts.*,users.username AS user_name,users.email AS user_email FROM posts INNER JOIN users ON posts.user_id=users.id Where posts.user_id=?`,
            [id],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res);
            }
        )
    },
    getPostByUsername: (username, callback) => {
        pool.query(`SELECT posts.*,users.username AS user_name,users.email AS user_email FROM posts INNER JOIN users ON posts.user_id=users.id Where posts.user_id=?`,
            [username],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res);
            }
        )
    },
    getAllPostBlog: callback => {
        pool.query(`SELECT posts.*,users.username AS user_name,users.email AS user_email FROM posts INNER JOIN users ON posts.user_id=users.id`,
            [],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res);
            }
        )
    },
    updatePost: (data, callback) => {

        pool.query(`update posts set title=?,body=? where (id = ? AND user_id=?)`,
            [data.title, data.body, data.id, data.user_id],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res[0]);
            }
        )
    },
    deleteBlog: (data, callback) => {
        pool.query(`delete from posts where (id = ? AND user_id=?)`,
            [data.id, data.user_id],
            (error, res, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, res[0]);
            }
        )
    },
}