const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {
    create: (req, res) => {
        const { username, email, password } = req.body;

        // Hash password sebelum menyimpan ke database
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: err.message });

            const newUser = { username, email, password: hash };
            User.create(newUser, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: result.insertId, ...newUser });
            });
        });
    },
    findAll: (req, res) => {
        User.findAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },
    findById: (req, res) => {
        const id = req.params.id;
        User.findById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(result[0]);
        });
    },
    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid username' });
            }

            const user = results[0];

            // Verifikasi password yang di-hash
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return res.status(500).json({ error: err.message });

                if (isMatch) {
                    res.status(200).json({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    });
                } else {
                    res.status(401).json({ message: 'Invalid password' });
                }
            });
        });
    }
};

module.exports = userController;
