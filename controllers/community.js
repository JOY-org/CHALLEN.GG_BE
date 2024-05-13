const {Community} = require('../models');
const op = require('sequelize').Op;
// 컨트롤러 js

exports.getCommunity = async(req,res,next)=>{
    try {
        const community = await Community.findAll({
            order:[['createdAt','DESC']]
        })
        res.json({
            code:200,
            payload: community
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.modifyCommunity = async (req, res, next) => {
    try {
        await Community.update({
            name: req.body.name,
            img: req.body.img
        },{
            where: { id : req.community.id }
        });

        res.json({
            code: 200,
            message: '사용자 정보 수정 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.deleteCommunity = async(req,res,next)=>{
    try{
        await Community.destroy({
            where:{id: req.params.id}
        })
        res.json({
            code:200,
            message:"커뮤니티가 완전! 사라졌어요!"
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}