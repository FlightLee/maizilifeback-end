/**
 * config
 */
const path = require('path');

const config = {
    appid: 'wx961c99dfab2a85db', // miniprogram appid,

    secret: '923db4b3a22347a5c913cec49c35484c', // miniprogram secret

    grant_type: 'authorization_code', // 授权类型

    db: 'mongodb://localhost/maizidb', // 数据库地址

    port: 6657,

    wxloginUrl: 'https://api.weixin.qq.com/sns/jscode2session?' // 微信登录openid获取地址
};

module.exports = config;