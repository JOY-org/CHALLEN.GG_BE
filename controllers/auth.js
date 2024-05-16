const bcrypt = require('bcrypt');
const {User}= require ('../models;')
const passport = require('passport');
// const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('authenticate 완료', err, user, info);
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            throw new Error(info.message);
        }
        return req.login(user, (err) => {
            console.log('login 실행', err);
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/');
        })
    })(req, res, next);
}