const { Cart, Success, Product } = require('../models');
const op = require('sequelize').Op;


exports.getCart = async(req,res,next)=>{
    try{
        const cart= await Cart.findAll({
            where:{UserId:req.user.id},
            include: {
                model: Product
            }
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

exports.uploadCart= async(req,res,next)=>{
    try {
        const { count }= req.body;
        const excart = await Cart.findOne({
            where :{
                ProductId:req.body.productId,
                UserId: req.user.id
            }
        })
        if(excart){
            excart.count = excart.count+ count ;
            await excart.save();
            res.json({
                code:200,
                message:"장바구니에 상품이 존재하여 갯수를 추가하였습니다.",
                payload:excart
            })
        }else{
            const newcart = await Cart.create({
                count,
                ProductId:req.body.productId,
                UserId: req.user.id
            });
            res.json({
                code:200,
                message:"장바구니에 새로운 상품을 추가하였습니다.",
                payload: newcart
            })
        }
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.modifyCart = async(req,res,next)=>{ // 변경될만한 거는 삭제를 제외한다면 상품 개수 뿐이다.
    try{
        const cart = await Cart.update({
            count:req.body.count,
        },{
            where:{id:req.params.productId}
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
            where:{id: req.params.productId}
        })
        res.json({
            code:200,
            message:"상품이 삭제 되었습니다."
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}