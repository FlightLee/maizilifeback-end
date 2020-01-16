const mongoose = require('mongoose');

const config = require('../config');

mongoose.connect(config.db, null, function (err) {
    if (err) {
        // logger.error('connect to %s error: ', config.db, err.message);
        console.log('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});


require('./user_info');

exports.User = mongoose.model('user_info');