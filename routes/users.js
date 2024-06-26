const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path')
// require('../controllers/user') 에서 필요한 거 가져와서 넣기
const {getLoginedUser, getAllUsers, getUser, deleteUser,modifyUser, getPoint, modifyPoint, follow, unfollow, getFollowers, getFollowings }=require('../controllers/user');
const { verifyToken } = require("../middlewares");
const { verify } = require('crypto');
const { getNotification, modifyNotification, deleteNotification, uploadNotification } = require('../controllers/notification');
const { getCalorie, uploadCalorie, deleteCalorie } = require('../controllers/calorie');

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'public/uploads/user')
    },
    filename(req,file, cb){
        const ext = path.extname(file.originalname)
        cb(null, path.basename("profileImg_"+req.user.id ,ext) + ext)
    }
})

const limits={fileSize: 10 *1024*1024}
const imgupload=multer({
    storage,
    limits
}) // 프로필 사진 변경 할때 필요

//여기에 포인트, 개인정보 수정, 알림, 팔로잉,팔로우 필요
// /users 아래로 들어오면 여기로 통한다

// User을 조회하고 수정하고 삭제 하는 부분 -> 미들웨어를 이용하여 변경해야 하는 부분이 있다.
router.get('/', getAllUsers);
router.get('/myinfo', verifyToken, getLoginedUser);
router.patch('/', verifyToken, imgupload.single('img'), modifyUser)
router.delete('/', verifyToken, deleteUser)

//알림
router.get('/notification',verifyToken, getNotification)
router.post('/notification',verifyToken,uploadNotification)
router.patch('/notification',verifyToken, modifyNotification)
router.delete('/notification/',verifyToken, deleteNotification)


//팔로우
router.post('/follow', verifyToken, follow);
router.delete('/follow', verifyToken, unfollow);
// /v1/users/followers/:id [GET - 특정 회원을 팔로우하는 사람들 조회] 로그인 X
router.get('/followers/:id', verifyToken, getFollowers);
// /v1/users/followings/:id [GET - 특정 회원이 팔로우하는 사람들 조회] 로그인 X
router.get('/followings/:id', verifyToken, getFollowings);

//포인트
router.get('/point',verifyToken,getPoint);
router.patch('/point',verifyToken,modifyPoint);

// 칼로리
router.get('/calorie',verifyToken, getCalorie);
router.post('/calorie',verifyToken, uploadCalorie); //생성과 업데이트 둘다 가능
router.delete('/calorie',verifyToken, deleteCalorie);

module.exports = router;