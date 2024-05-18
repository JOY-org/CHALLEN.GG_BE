// 그냥 스켈레톤 배껴온 파일
const express = require('express');
const router = express.Router();
const userRouter = require('./users');
// const postRouter = require('./post');
const challengeRouter = require('./challenge')
const communityRouter = require('./community')
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
router.use('/community', communityRouter);

// /v1/product
router.use('/product',productRouter);

router.get('/dummy', dummyInput)
// 모두 같은 db를 쓰고 싶어서 -> dummy에 컨트롤러 dummy.js를 이용해서 모두가 /dummy 페이지들어가면 같은데이터를 갖고 시작할수 있다.




module.exports = router;