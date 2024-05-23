const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
const { verifyToken } = require("../middlewares");
const {getPost, uploadPost, deletePost, modifyPost, uploadImg, uploadPostAndImg }=require('../controllers/post');

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'public/uploads')
    },
    filename(req,file, cb){
        const ext = path.extname(file.originalname)
        cb(null, path.basename(file.originalname,ext)+Date.now()+ext)
    }
})

const limits={fileSize: 10 *1024*1024}
const imgupload=multer({
    storage,
    limits
}) // 커뮤니티 대표사진

// 게시물 관련
router.get('/', getPost);
router.post('/', verifyToken, imgupload.single('img'), uploadPostAndImg);
// router.post('/', verifyToken, uploadPost); // post, 업로드 하는것은 만든 사용자가 필요하기 때문에 verify를 넣어준것이다.
//post /v1/post/image -- 게시물이미지 업로드
// router.post('/image', verifyToken, imgupload.single('img'), uploadImg); // 이미지 save저장과 이미지 url res에 담아 보내기
router.patch('/:postId', modifyPost); 
router.delete('/:postId', deletePost);


module.exports = router;