const { Check, Success, Challenge, User  } = require('../models');

// (도전별 체크 조회)
// select chk.id, chk.img, s.UserId, clg.id 
// from checks chk
// left join successes s on s.id = chk.SuccessId
// left join challenges clg on clg.id = s.ChallengeId;
exports.getCheckByChallengeId = async (req,res,next) =>{
    try {
        const check= await Check.findAll({
            include: {
                model: Success,
                include: [
                    {
                        model: Challenge,
                        where: {id: req.params.challengeId}
                    },
                    {
                        model: User
                    }
                ]
            }
        });
        res.json(check)

    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.getCheckByUserId = async (req,res,next) =>{
    try {
        const check= await Check.findAll({
            include: {
                model: Success,
                include: [
                    {
                        model: Challenge
                    },
                    {
                        model: User,
                        where: {id: req.params.userId}
                    }
                ]
            }
        });
        res.json(check)

    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.uploadCheck = async(req, res,next)=>{
    try {
        const check = await Check.create({
            img: req.file ? `/uploads/check/${req.file.filename}` : "빈 이미지",
            date: new Date(),
            SuccessId : req.body.SuccessId
        })
        res.json({
            code:200,
            payload:check,
            message:"인증 사진을 업로드 했습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.deleteCheck = async(req, rex,next)=>{
    try {
        await Check.destroy({
            where:{id : req.params.checkId}
        })
        res.json({
            code : 200,
            message: "인증 사진을 삭제했습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}