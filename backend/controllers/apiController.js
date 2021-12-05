require('../models/db');
const Api = require('../models/api');

exports.listAnecdotes = async (req, res) => {
    let { name, q } = req.query;

    let query = {};
    if (name) query.name = name;
    if (q) {
        query = { $text: { $search: q } };
    }

    try {
        const anecdotes = await Api.find(query);
        res.json(anecdotes);
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

exports.insertAnecdotes = async (req, res) => {
    const newAnecdote = new Api({
        name: req.body.name,
        description: req.body.description
    });

    try {
        await newAnecdote.save();
        res.json(newAnecdote);
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

exports.updateAnecdotes = async (req, res) => {
    let paramID = req.params.id;
    let description = req.body.description;

    try {
        const updateAnecdote = await Api.updateOne({ _id: paramID }, { description: description });
        res.json(updateAnecdote);
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

exports.deleteAnecdotes = async (req, res) => {
    let paramID = req.params.id;

    try {
        const data = await Api.deleteOne({ _id: paramID });
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err })
    }
}