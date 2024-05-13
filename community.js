const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path')
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기


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
}) // 개시글 만들 때 필요하다.



module.exports = router;