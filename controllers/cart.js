const {User, Product, Cart} = require('../models');
const op = require('sequelize').Op;


exports.getCart = async(req,res,next)=>{
    try{
        const cart= await Cart.findAll({
            where:{id:req.params.userid}
        });
        res.json(cart)
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.modifyCart = async(req,res,next)=>{ // 변경될만한 거는 삭제를 제외한다면 상품 개수 뿐이다.
    try{
        await Cart.update({
            count:req.body.count //프론트에서 상품 개수가 더하고나 빼지면 요청을 보내고 바뀌어야 한다.
        },{
            where:{id:req.params.productid}//상품 아이디가 맞는것만 바뀌어야 한다.
        })//여기 사이에 id값이 달라져야 한다. => 구분되는 아이디
        const cart= await Cart.findAll({
            where:{id:req.params.userid} // 근데 여기서 다시 보여주는 부분에서 똑같은 아이디를 가지고 보여준다?
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
        res.jsont({
            code:200,
            message:"상품이 삭제 되었습니다."
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}