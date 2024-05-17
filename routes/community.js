const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
const { verifyToken } = require("../middlewares");
const {getCommunity, uploadCommunity, deleteCommunity, modifyCommunity }=require('../controllers/community');
const {getPosts, uploadPosts, deletePosts, modifyPosts }=require('../controllers/posts');

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

router.get('/', getCommunity);
router.post('/', verifyToken, uploadCommunity);
router.patch('/', verifyToken, modifyCommunity);
router.delete('/:id', verifyToken, deleteCommunity);

// community/posts/ -> 
router.get('/post', getPosts);
router.post('/post', verifyToken, uploadPosts);
router.put('/post', verifyToken, getPosts); // put/patch 뭘 사용하는 게 좋을까요
router.delete('/post/:id', verifyToken, getPosts);


module.exports = router;