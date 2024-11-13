const Item = require('../models/Item');

const itemController = {
    create: (req, res) => {
        const newItem = req.body;
        Item.create(newItem, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: result.insertId, ...newItem });
        });
    },
    findAll: (req, res) => {
        Item.findAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },
    findById: (req, res) => {
        const id = req.params.id;
        Item.findById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(result[0]);
        });
    },
    update: (req, res) => {
        const id = req.params.id;
        const updatedItem = req.body;
        Item.update(id, updatedItem, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Item updated successfully' });
        });
    },
    delete: (req, res) => {
        const id = req.params.id;
        Item.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Item deleted successfully' });
        });
    }
};

module.exports = itemController;
