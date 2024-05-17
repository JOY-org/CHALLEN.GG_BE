const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
const { verifyToken } = require("../middlewares");
const {getReview, modifyReview, deleteReview,uploadReview} =require('../controllers/review');
const {getCart, modifyCart, deleteCart}=require('../controllers/cart')
const { getEnquiry, uploadEnquiry, modifyEnquiry, deleteEnquiry } =require('../controllers/enquiry');
const { getProducts,deleteProduct, modifyProduct } = require('../controllers/product');
const { getPurchased, deletePurchased,createPurchased } = require('../controllers/purchased');
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
//put과 post에 차이가 있나?

//상품을 조회하고, 수정하고, 삭제하는 기능 -> 이것도 미들웨어를 사용하여 변경해야한다.
router.get('/',getProducts);
router.patch("/", verifyToken, modifyProduct);
router.delete('/:productid',verifyToken, deleteProduct);

// /products/cart/:id -> 여기는 유저 id -> useid 부분은 이제 다 미들웨어로 대체해야 한다.
router.get('/cart/:userid', verifyToken, getCart)
router.patch('/cart/:userid/:productid', verifyToken, modifyCart)
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