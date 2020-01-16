
const request = require('request');

const validator = require('validator');

const config = require('../config');

const models = require('../data model');

const eventproxy = require('eventproxy');

/* !
 *  登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.login = (req, res, next) => {
    let js_code = validator.trim(req.body.js_code).toLowerCase();
    let ep = eventproxy();
    ep.fail(next);
    let queryString = `appid=${config.appid}&secret=${config.secret}&js_code=${js_code}&grant_type=${config.grant_type}`;
    request.get(config.wxloginUrl + queryString, ep.done((response, body) => {
        let resData = JSON.parse(body);
        models.User.findOne({ openid: resData.openid }, ep.done((userData) => {
            if (!userData) {
                //用户注册一下
            }
            //变成登录状态
            return
        }),
    }));


    console.log(1);
    next();
};

/**
 * 注册
 */
exports.signup = (req, res, next) => {
    console.log(1);
    next();
};