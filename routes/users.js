const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path')
// require('../controllers/user') 에서 필요한 거 가져와서 넣기
const {getUser, deleteUser,modifyUser }=require('../controllers/user');
const { verifyToken } = require("../middlewares");
const { verify } = require('crypto');

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
}) // 프로필 사진 변경 할때 필요


// User을 조회하고 수정하고 삭제 하는 부분 -> 미들웨어를 이용하여 변경해야 하는 부분이 있다.
router.get('/', getUser)
router.patch('/', verifyToken, modifyUser)
router.delete('/:userid', verifyToken, deleteUser)

module.exports = router;