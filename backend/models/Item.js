const db = require('../config/db');

const Item = {
    create: (item, callback) => {
        const sql = 'INSERT INTO items (title, description, image_url, user_id) VALUES (?, ?, ?, ?)';
        db.query(sql, [item.title, item.description, item.image_url, item.user_id], callback);
    },
    findAll: (callback) => {
        const sql = 'SELECT * FROM items';
        db.query(sql, callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM items WHERE id = ?';
        db.query(sql, [id], callback);
    },
    update: (id, item, callback) => {
        const sql = 'UPDATE items SET title = ?, description = ?, image_url = ? WHERE id = ?';
        db.query(sql, [item.title, item.description, item.image_url, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM items WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Item;
