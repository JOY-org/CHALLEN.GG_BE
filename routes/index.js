// 그냥 스켈레톤 배껴온 파일
const express = require('express');
const router = express.Router();
const userRouter = require('./users');
// const postRouter = require('./post');
// const communityRouter = require('./community')
const productRouter= require('./product')
const { dummyInput } = require('../controllers/dummy');
// const { createToken, join, refreshToken, kakaoLogin } = require('../controllers/auth');
// const { verifyToken } = require("../middlewares");
// const passport = require('passport');

// // POST /v1/auth/join
// router.post('/auth/join', join);

// // POST /v1/auth/login
// router.post('/auth/login', createToken);

// router.get('/auth/kakao', passport.authenticate('kakao'));
// router.get('/auth/kakao/callback', kakaoLogin);
// router.post('/auth/refresh', refreshToken);

// /v1/users
router.use('/users', userRouter);

// // /v1/posts
// router.use('/posts', postRouter);

// /v1/product
router.use('/product',productRouter);

router.get('/dummy', dummyInput)
// 모두 같은 db를 쓰고 싶어서 -> dummy에 컨트롤러 dummy.js를 이용해서 모두가 /dummy 페이지들어가면 같은데이터를 갖고 시작할수 있다.



module.exports = router;