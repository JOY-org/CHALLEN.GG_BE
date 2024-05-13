const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path')
// require('../controllers/user') 에서 필요한 거 가져와서 넣기
const {getUser, deleteUser,modifyUser }=require('../controllers/user')

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

router.get('/', getUser)
router.post('/:userid',modifyUser)
router.delete('/:userid',deleteUser)

module.exports = router;