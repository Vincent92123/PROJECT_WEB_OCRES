const mongoose = require('mongoose');

const anecdoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    description: {
        type: String,
        required: true
    }
});

anecdoteSchema.index({ "$**": 'text' });

module.exports = mongoose.model('Anecdote', anecdoteSchema);