const { Check, Success, Challenge, User  } = require('../models');

exports.getSuccess = async(req,res,next) =>{
    try {
        let condition = {}
        if (req.query?.id) {
            condition = {ChallengeId: req.query.id}
        }
        const success= await Success.findAll({
            where :{
                UserId:req.user.id,
                ...condition
            },
            include:{
                model : Challenge
            }
        }) //user가 참여한 모든 챌린지와 그 챌린지 아이디를 확인 할 수 있는 컨트롤러
        res.json({
            code:200,
            payload: success,
            message : "유저가 참여한 챌린지을 조회했습니다."
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.uploadSuccess = async(req,res,next) =>{
    try {
        const success= await Success.create({
            UserId:req.user.id,
            ChallengeId: req.body.id
        })

        res.json({
            code:200,
            payload: success,
            message : "유저가 챌린지에 참여하였습니다."
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.deleteSuccess = async(req,res,next) =>{
    try {
        const success= await Success.destroy({
            where :
            {UserId:req.user.id, ChallengeId: req.body.challengeId}
        })
        res.json({
            code:200,
            payload: success,
            message : "유저가 챌린지를 그만 두었습니다."
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}