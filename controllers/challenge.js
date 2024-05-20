const {Challenge} = require('../models');
const op = require('sequelize').Op;
// 컨트롤러 js

exports.getChallenge = async(req,res,next)=>{
    try {
        const challenge = await Challenge.findAll({
            order:[['createdAt','DESC']]
        })
        res.json({
            code:200,
            payload: challenge
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.uploadChallenge = async(req,res,next)=>{
    try{
        const review = await Challenge.create(req.body)
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.modifyChallenge = async (req, res, next) => {
    try {
        await Challenge.update(req.body,{where: { id : req.params.challengeid }})
        res.json({
            code: 200,
            message: '챌린지 수정 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.deleteChallenge = async(req,res,next)=>{
    try{
        await Challenge.destroy({
            where:{id: req.params.challengeid}
        })
        res.json({
            code:200,
            message:"챌린지 삭제 완료"
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}