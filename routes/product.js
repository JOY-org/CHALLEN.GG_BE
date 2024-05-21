const express = require('express');
const router = express.Router();
const multer= require('multer');
const path=require('path');
const { verifyToken } = require("../middlewares");
const {getReview, modifyReview, deleteReview,uploadReview} =require('../controllers/review');
const {getCart, modifyCart, deleteCart, uploadCart}=require('../controllers/cart')
const { getEnquiry, uploadEnquiry, modifyEnquiry, deleteEnquiry } =require('../controllers/enquiry');
const { getProduct,deleteProduct, modifyProduct, uploadProduct } = require('../controllers/product');
const { getPurchased, deletePurchased,createPurchased } = require('../controllers/purchased');
// require('../controllers/~~') 에서 필요한 거 가져와서 넣기
//put과 post에 차이가 있나?

//상품을 조회하고, 수정하고, 삭제하는 기능 -> 이것도 미들웨어를 사용하여 변경해야한다.
router.get('/',getProduct);
router.post('/',uploadProduct) //여기에는 물품을 올리는 사람의 아이디가 필요없을것 같다.
router.patch('/:productId', verifyToken, modifyProduct);
router.delete('/:productId',verifyToken, deleteProduct);
// router.post('/',uploadImg) // 미완성 -> 커뮤니티는 이미지 업로드가 필요하다

// /products/cart/:id -> cart에서 다시 뿌려줄때 id가??? 
router.get('/cart', verifyToken, getCart)
router.get('/cart',verifyToken,uploadCart)
router.patch('/cart/:productId', verifyToken, modifyCart)
router.delete('/cart/:productId',verifyToken, deleteCart)

// /products/purchased/:userid -> userid 부분 다 미들웨어로 교체해야한다.
router.get('/purchased/', verifyToken, getPurchased)
router.post('/purchased/:productId', verifyToken, createPurchased)
router.delete('/purchased/:productId', verifyToken, deletePurchased)
// 구매목록은 수정은 없다 -> 삭제와 등록만 있다

// /products/review/ -> 아이디 필요 x 물건에 대한 리뷰만 가져오면 된다.
router.get('/review', getReview); 
router.post('/review', uploadReview);
router.put('/review/:reviewId',modifyReview);
router.delete('/review/:reviewId',deleteReview);

// /products/enquiry/ -> 아이디 필요 x 물건에 대한 리뷰만 가져오면 된다.
router.get('/enquiry', getEnquiry); 
router.post('/enquiry',uploadEnquiry);
router.put('/enquiry/:enquiryId',modifyEnquiry);
router.delete('/enquiry/:enquiryId',deleteEnquiry);

module.exports = router;