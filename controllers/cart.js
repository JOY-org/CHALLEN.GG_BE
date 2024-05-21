const { Cart} = require('../models');
const op = require('sequelize').Op;


exports.getCart = async(req,res,next)=>{
    try{
        const cart= await Cart.findAll({
            where:{id:req.user.id}
        });
        res.json({
            code:200,
            payload:cart
        })
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.modifyCart = async(req,res,next)=>{ // 변경될만한 거는 삭제를 제외한다면 상품 개수 뿐이다.
    try{
        await Cart.update({
            count:req.body.count 
        },{
            where:{id:req.params.productid}
        })
        const cart= await Cart.findAll({
            where:{id:req.user.id} 
        })
        res.json({
            code:200,
            payload:cart,
            message:"수정이 완료되었습니다."
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.deleteCart = async(req,res,next)=>{
    try{
        await Cart.destroy({
            where:{id: req.params.productid}
        })
        const cart = await Cart.findAll({
            where:{id:req.user.id}
        })
        res.jsont({
            code:200,
            message:"상품이 삭제 되었습니다."
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}