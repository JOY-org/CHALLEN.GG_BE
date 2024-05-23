const express = require('express');
const { createToken, googleLogin, kakaoLogin,join, refreshToken } = require('../controllers/auth');
const router = express.Router();
const passport = require('passport')




// POST /v1/auth/join  회원가입하는 부분
router.post('/join', join);

// // POST /v1/auth/login
router.post('/login', createToken);
router.post('/refresh', refreshToken);

// /v1/auth/google
router.get('/google',passport.authenticate('google'))
router.get('/google/callback', googleLogin);

// /v1/auth/kakao
router.get('/kakao',passport.authenticate('kakao'))
router.get('/kakao/callback', kakaoLogin);


module.exports=router;