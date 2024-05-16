const express = require('express');
const { googleLogin, kakaoLogin,join } = require('../controllers/auth');
const router = express.Router();
const passport = require('passport')
// router.get('/auth/kakao', passport.authenticate('kakao'));
// router.get('/auth/kakao/callback', kakaoLogin);
// router.post('/auth/refresh', refreshToken);


// POST /v1/auth/join  회원가입하는 부분
router.post('/join', join);

// // POST /v1/auth/login
// router.post('/auth/login', createToken);

// /v1/auth/google
router.get('/google',passport.authenticate('google'))
router.get('/google/callback', googleLogin);

// /v1/auth/kakao
router.get('/kakao',passport.authenticate('kakao'))
router.get('/kakao/callback', kakaoLogin);

module.exports=router;