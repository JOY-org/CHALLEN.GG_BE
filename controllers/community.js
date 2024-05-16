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

exports.uploadCommunity = async(req,res,next)=>{
    try{
        const review = await Community.create(req.body)
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.modifyCommunity = async (req, res, next) => {
    try {
        await Community.update(req.body,{where: { id : req.community.id }})
        res.json({
            code: 200,
            message: '커뮤니티 수정 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.deleteCommunity = async(req,res,next)=>{
    try{
        await Community.destroy({
            where:{id: req.params.communityid}
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