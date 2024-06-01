const {Challenge, User, ChallengeInterest} = require('../models');
const op = require('sequelize').Op;
// 컨트롤러 js

exports.getChallenge = async(req,res,next)=>{
    try {
        const challenge = await Challenge.findAll({
            order:[['createdAt','DESC']],
            include: {
                model: User,
                as: 'Interester'
            }
        })
        res.json({
            code:200,
            payload: challenge,
            message:"챌린지 열람이 완료되었습니다"
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.uploadChallenge = async(req,res,next)=>{
    try{
        const start = new Date(req.body.startDay);
        const end = new Date(req.body.endDay);
        const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        const challenge = await Challenge.create({
            ...req.body,
            UserId:req.user.id,
            img: req.file ? `/uploads/challenge/${req.file.filename}` : `/uploads/challenge/default.png`,
            duration : duration
        })
        res.json({
            code:200,
            message:"챌린지 등록이 완료되었습니다.",
            payload:challenge
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.modifyChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.update(req.body,{where: { id : req.params.challengeId }})
        res.json({
            code: 200,
            payload:challenge,
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
            where:{id: req.params.challengeId}
        });
        res.json({
            code:200,
            message:"챌린지 삭제 완료"
        });
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.interestChallenge = async(req, res, next)=>{
    try {
        const challenge = await Challenge.findOne({
            where: {id:req.body.id}
        });
        if(challenge){
            await challenge.addInterester(req.user.id);
            res.json({
                code:200,
                payload: challenge,
                message:"흥미있는 챌린지를 추가하셨습니다."
            })
        } else{
            res.json({
                code : 404,
                message:"해당 챌린지를 찾을 수 없습니다."
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.uninterestChallenge = async(req, res, next)=>{
    try {
        const user = await User.findOne({
            where: {id:req.user.id}
        });
        if(user){
            await user.removeInterestedChallenge(req.body.id); //챌린지 아이디를 지운다.
            res.json({
                code:200,
                message:"흥미있는 챌린지에서 삭제하였습니다."
            })
        } else{
            res.json({
                code : 404,
                message:"사용자를 찾을 수 없습니다."
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getInteresterByChallengeId=async(req,res,next)=>{
    try {
        const challenge = await Challenge.findOne({
            where: { id: req.params.challengeId },
            include: [{
                model: User,
                as: 'Interester'
            }]
        })
        if (challenge) {
            res.json({
                code: 200,
                payload: challenge.Interester,
                message: "해당 챌린지를 흥미있어한 사용자 목록입니다."
            });
        } else {
            res.json({
                code: 404,
                message: "해당 게시물을 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getInterestByUserId=async(req,res,next)=>{
    try {
        const user = await User.findOne({
            where: { id: req.params.userId },
            include: [{
                model: Challenge,
                as: 'InterestedChallenge'
            }]
        })
        if (user) {
            res.json({
                code: 200,
                payload: user.InterestedChallenge,
                message: "해당 사용자가 흥미있는 챌린지 목록입니다."
            });
        } else {
            res.json({
                code: 404,
                message: "해당 사용자를 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}
