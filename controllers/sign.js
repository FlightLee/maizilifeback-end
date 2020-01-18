
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
    let js_code = validator.trim(req.query.js_code);
    let userInfo = JSON.parse(req.query.userInfo);
    let ep = eventproxy();
    ep.fail(next);
    let queryString = `appid=${config.appid}&secret=${config.secret}&js_code=${js_code}&grant_type=${config.grant_type}`;
    request.get(config.wxloginUrl + queryString, ep.done((response, body) => {
        let resData = JSON.parse(body);
        if (resData.errcode === 0) {
            models.User.findOne({ openid: resData.openid }, ep.done((userData) => {
                if (!userData) {
                    // 用户注册一下
                    const User = new models.User({ nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl, gender: userInfo.gender, language: userInfo.language, country: userInfo.country, province: userInfo.province, city: userInfo.city, openid: resData.openid, unionid: resData.unionid });
                    User.save((err) => { if (!err) console.log('success'); });

                }
                // 变成登录状态
                return;
            }));
        } else {
            // 登录失败请稍后再试
        }
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