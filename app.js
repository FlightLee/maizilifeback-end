const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const config = require('./config');

const path = require('path');

const app = express();



// 静态文件目录
let staticDir = path.join(__dirname, 'public');

app.use('/public', express.static(staticDir));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(router);

app.listen(config.port, () => {
    console.log(`port ${config.port} is running`);
});
module.exports = app;