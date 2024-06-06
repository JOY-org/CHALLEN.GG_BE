const {Product,ProductImg} = require('../models');
const op = require('sequelize').Op;

exports.getProduct=async(req,res,next)=>{
    try {
        const product = await Product.findAll()
        const productimg = await ProductImg.findAll()
        res.json({
            code:200,
            payload: {product,productimg}
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.uploadProduct=async(req,res,next)=>{
    try {
        const product= await Product.create({
            ...req.body
        })
        if (!req.body.name || (req.body.name && req.body.name.trim() === '')) {
            return res.status(400).json({ code: 400, message: "Product name is required." });
        }
        res.json({
            code:200,
            payload:product,
            message:"등록이 완료되었습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.modifyProduct = async(req,res,next)=>{
    try {
        await Product.update(req.body, {where: {id: req.params.productId}})
        res.json({
            code:200,
            message:'수정이 완료되었습니다'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.deleteProduct = async(req,res,next)=>{
    try {
        await Product.destroy({
            where:{id:req.params.productId}
        })
        res.json({
            code:200,
            message:'삭제가 완료되었습니다'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}