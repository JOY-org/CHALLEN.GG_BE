const {Products} = require('../models');
const op = require('sequelize').Op;

exports.getProducts=async(req,res,next)=>{
    try {
        const product = await Products.findAll({})
        res.json({
            code:200,
            payload: product
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.modifyProduct = async(req,res,next)=>{
    try {
        await Products.update(req.body, {where: {id: req.body.id}})
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
        await Products.destroy({
            where:{id:req.params.productid}
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