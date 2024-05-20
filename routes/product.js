const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
const { verifyToken } = require("../middlewares");
const {getReview, modifyReview, deleteReview,uploadReview} =require('../controllers/review');
const {getCart, modifyCart, deleteCart}=require('../controllers/cart')
const { getEnquiry, uploadEnquiry, modifyEnquiry, deleteEnquiry } =require('../controllers/enquiry');
const { getProduct,deleteProduct, modifyProduct, uploadProduct } = require('../controllers/product');
const { getPurchased, deletePurchased,createPurchased } = require('../controllers/purchased');
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
//put과 post에 차이가 있나?

//상품을 조회하고, 수정하고, 삭제하는 기능 -> 이것도 미들웨어를 사용하여 변경해야한다.
router.get('/',getProduct);
router.post('/',uploadProduct) //여기에는 물품을 올리는 사람의 아이디가 필요없을것 같다.
router.patch('/', verifyToken, modifyProduct);
router.delete('/:productid',verifyToken, deleteProduct);
// router.post('/',uploadImg) // 미완성 -> 커뮤니티는 이미지 업로드가 필요하다

// /products/cart/:id -> cart에서 다시 뿌려줄때 id가??? 
router.get('/cart', verifyToken, getCart)
router.patch('/cart/:productid', verifyToken, modifyCart)
router.delete('/cart/:productid',verifyToken, deleteCart)

// /products/purchased/:userid -> userid 부분 다 미들웨어로 교체해야한다.
router.get('/purchased/:userid', verifyToken, getPurchased)
router.post('/purchased/:userid/:productid', verifyToken, createPurchased)
router.delete('/purchased/:userid/:productid', verifyToken, deletePurchased)

// /products/review/ -> 아이디 필요 x 물건에 대한 리뷰만 가져오면 된다.
router.get('/review', getReview); 
router.post('/review', uploadReview);
router.put('/review/:id',modifyReview);
router.delete('/review/:id',deleteReview);

// /products/enquiry/ -> 아이디 필요 x 물건에 대한 리뷰만 가져오면 된다.
router.get('/enquiry', getEnquiry); 
router.post('/enquiry',uploadEnquiry);
router.put('/enquiry/:id',modifyEnquiry);
router.delete('/enquiry/:id',deleteEnquiry);

module.exports = router;