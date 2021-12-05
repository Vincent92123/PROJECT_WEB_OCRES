var express = require("express");
var router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/api/anecdotes/', apiController.listAnecdotes);
router.post('/api/anecdotes/', apiController.insertAnecdotes);
router.patch('/api/anecdotes/:id', apiController.updateAnecdotes);
router.delete('/api/anecdotes/:id', apiController.deleteAnecdotes);

module.exports = router;