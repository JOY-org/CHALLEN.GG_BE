const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
const { verifyToken } = require("../middlewares");
const {getCommunity, uploadCommunity, deleteCommunity, modifyCommunity }=require('../controllers/community');
const {getPost, uploadPost, deletePost, modifyPost }=require('../controllers/post');

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

//verify를 넣어서 수정과 삭제가 가능하게 해야하나? -> 프론트에서 가능한 것인가?
//커뮤니티 관련
router.get('/', getCommunity);
router.post('/', verifyToken, uploadCommunity); //미완성
router.patch('/:communityid', modifyCommunity);
router.delete('/:communityid',deleteCommunity);
// router.post('/',uploadImg) // 미완성 -> 커뮤니티는 이미지 업로드가 필요하다

// 게시물 관련
router.get('/post', getPost);
router.post('/post', verifyToken, uploadPost); // 업로드 하는것은 만든 사용자가 필요하기 때문에 verify를 넣어준것이다.
router.patch('/post/:postid', modifyPost); 
router.delete('/post/:postid', deletePost);
// router.post('/',uploadImg) // 미완성 -> 커뮤니티는 이미지 업로드가 필요하다

module.exports = router;