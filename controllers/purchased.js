const {User, Product, Purchased} = require('../models');
const op = require('sequelize').Op;

exports.getPurchased = async(req,res,next)=>{
    try {
        const purchased = await Purchased.findAll({
            where:{id:req.body.userid}
        });
        res.json(purchased)
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.createPurchased = async(req,res,next) =>{
    try {
        "미완성"
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.deletePurchased = async(req,res,next) =>{
    try{
        await Purchased.destroy({
            where:{id:req.params.productid}
        })
        res.json({
            code:200,
            message:"삭제가 완료되었습니다."
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}