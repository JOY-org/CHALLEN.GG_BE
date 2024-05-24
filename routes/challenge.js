const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path')
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
const {getChallenge, uploadChallenge, modifyChallenge, deleteChallenge, interestChallenge, uninterestChallenge}=require('../controllers/challenge');
const { verifyToken } = require("../middlewares");

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'public/uploads/challenge')
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
}) // 챌린지 대표사진

router.get('/', getChallenge);
router.post('/', verifyToken, imgupload.single('img'), uploadChallenge); 
router.patch('/:challengeId',modifyChallenge);
router.delete('/:challengeId', deleteChallenge);

router.post('/interestchallenge',verifyToken, interestChallenge);
router.delete('/interestchallenge', verifyToken, uninterestChallenge);

module.exports = router;