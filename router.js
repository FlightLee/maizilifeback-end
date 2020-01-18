const express = require('express');

const router = express.Router();

const controllers = require('./controllers');



router.get(['/', 'index'], (req, res) => {

    res.end('success');
})
    .get('/login', controllers.sign.login);

module.exports = router;