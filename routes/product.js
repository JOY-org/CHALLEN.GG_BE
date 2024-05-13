const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
const {getReview, modifyReview, deleteReview,uploadReview} =require('../controllers/review');
const {getCart, modifyCart, deleteCart}=require('../controllers/cart')
const { getEnquiry, uploadEnquiry, modifyEnquiry, deleteEnquiry } =require('../controllers/enquiry');
const { getProducts } = require('../controllers/product');
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
//put과 post에 차이가 있나?

//
router.get('/',getProducts);


// /products/review/ -> 아이디 필요 x 물건에 대한 리뷰만 가져오면 된다.
router.get('/review', getReview); 
router.post('/review',uploadReview);
router.put('/review/:id',modifyReview);
router.delete('/review/:id',deleteReview);

// /products/cart/:id -> 여기는 유저 id
router.get('/cart/:id',getCart)
router.put('/cart/:userid/:productid', modifyCart)
router.delete('/cart/:userid',deleteCart)

// /products/enquiry/ -> 아이디 필요 x 물건에 대한 리뷰만 가져오면 된다.
router.get('/enquiry', getEnquiry); 
router.post('/enquiry',uploadEnquiry);
router.put('/enquiry/:id',modifyEnquiry);
router.delete('/enquiry/:id',deleteEnquiry);

module.exports = router;