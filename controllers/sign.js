
const request = require('request');

const validator = require('validator');

const config = require('../config');

const models = require('../data model');

const eventproxy = require('eventproxy');

const WXBizDataCrypt = require('../common/WXBizDataCrypt');

/* !
 *  登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.login = (req, res, next) => {
    let js_code = req.query.js_code;
    let userInfo = JSON.parse(req.query.userInfo);
    let ep = eventproxy();
    ep.fail(next);
    if (js_code) {
        // 第一次登录
        let queryString = `appid=${config.appid}&secret=${config.secret}&js_code=${js_code}&grant_type=${config.grant_type}`;
        request.get(config.wxloginUrl + queryString, ep.done((response, body) => {
            let resData = JSON.parse(body);
            if (resData.errcode === 0) {
                models.User.findOne({ openid: resData.openid }, ep.done((userData) => {
                    if (!userData) { // 是否注册过
                        // 用户注册一下
                        const User = new models.User({ nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl, gender: userInfo.gender, language: userInfo.language, country: userInfo.country, province: userInfo.province, city: userInfo.city, openid: resData.openid, unionid: resData.unionid, session_key: resData.session_key });
                        User.save((err) => { if (err) next(err); });
                        res.end({ errcode: 0, message: '注册登录成功', data: null });
                    } else {
                        res.end({ errcode: 0, message: '注册登录成功', data: null });
                    }
                }));
            } else {
                res.end({ errcode: -1, message: '微信服务器异常，请稍后再试', data: null });
            }
        }));
    } else {
        let iv = req.query.iv;
        let encryptedData = req.query.encryptedData;
        let signature = req.query.signature;
        let pc = new WXBizDataCrypt(config.appid, 'HyVFkGl5F5OQWJZZaNzBBg==');
        let data = pc.decryptData(encryptedData, iv);
    }
};
/**
     * 注册
     */
exports.signup = (req, res, next) => {
    console.log(1);
    next();
};