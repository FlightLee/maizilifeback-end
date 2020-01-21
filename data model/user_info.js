const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_infoSchema = new Schema({
    nickName: {
        type: String,
        required: true
    },
    vxcode: {
        type: String
    },
    avatarUrl: {
        type: String,
        default: '/a.jpg'
    },
    gender: {
        type: Number,
        default: 0,
        match: '^[0-2]*$'
    },
    country: {
        type: String
    },
    province: {
        type: String
    },
    city: {
        type: String
    },
    language: {
        type: String
    },
    openid: {
        type: String,
        required: true
    },
    unionid: {
        type: String,
        required: true
    },
    session_key: {
        type: String,
        required: true
    }
});

mongoose.model('user_info', user_infoSchema);

console.log('user_info is loaded');