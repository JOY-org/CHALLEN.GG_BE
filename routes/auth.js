const express = require('express');
const { googleLogin, kakaoLogin } = require('../controllers/auth');
const router = express.Router();
const passport = require('passport')
// router.get('/auth/kakao', passport.authenticate('kakao'));
// router.get('/auth/kakao/callback', kakaoLogin);
// router.post('/auth/refresh', refreshToken);


// // POST /v1/auth/join
// router.post('/auth/join', join);
// -> 여기 이부분은 회원가입 부분이다.
// // POST /v1/auth/login
// router.post('/auth/login', createToken);

// /v1/auth/google
router.get('/google',passport.authenticate('google'))
router.get('/google/callback', googleLogin);

// /v1/auth/kakao
router.get('/kakao',passport.authenticate('kakao'))
router.get('/kakao/callback', kakaoLogin);

module.exports=router;