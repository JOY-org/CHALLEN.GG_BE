// 그냥 스켈레톤 배껴온 파일
const express = require('express');
const router = express.Router();
const userRouter = require('./users');
// const postRouter = require('./post');
const challengeRouter = require('./challenge')
const postRouter = require('./post')
const productRouter= require('./product')
const authRouter = require('./auth')
const { dummyInput } = require('../controllers/dummy');
// const { createToken, join, refreshToken, kakaoLogin } = require('../controllers/auth');
// const { verifyToken } = require("../middlewares");
// const passport = require('passport');

router.use('/auth', authRouter)//로그인 

// /v1/users
router.use('/users', userRouter);

// /v1/challenge
router.use('/challenge', challengeRouter);

// /v1/community
router.use('/post', postRouter);

// /v1/product 
router.use('/product',productRouter);






module.exports = router;