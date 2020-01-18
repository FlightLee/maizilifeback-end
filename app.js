const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const config = require('./config');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const https = require('https');
const fs = require('fs');
const app = express();
require('./data model');


// 静态文件目录
let staticDir = path.join(__dirname, 'public');

// eslint-disable-next-line no-unused-vars
const httpsOption = {
    key: fs.readFileSync('ssl/www.darling2020.com.key'),
    cert: fs.readFileSync('ssl/www.darling2020.com.pem')
};

app.use('/public', express.static(staticDir));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(router);

// https.createServer(httpsOption, app).listen(config.port, () => {
//     console.log(`port ${config.port} is running`);
// });
app.listen(config.port, () => { console.log(`port ${config.port} is running`) });
module.exports = app;