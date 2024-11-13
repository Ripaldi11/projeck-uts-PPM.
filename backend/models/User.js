// backend/models/User.js
const db = require('../config/db');

const User = {
    create: (user, callback) => {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [user.username, user.email, user.password], callback);
    },
    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    },
    findAll: (callback) => {
        const sql = 'SELECT * FROM users';
        db.query(sql, callback);
    }
};

module.exports = User;
