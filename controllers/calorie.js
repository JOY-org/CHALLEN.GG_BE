const { Calorie} = require('../models');
const op = require('sequelize').Op;

exports.getCalorie = async(req,res,next) =>{
    try {
        const calorie =await Calorie.findAll({
            where:{id:req.user.id}
        })
        res.json({
            code:200,
            payload:calorie,
            message: "칼로리를 조회했습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.uploadCalorie = async (req, res, next) => {
    try {
        const { date, sum } = req.body;

        // 주어진 날짜와 사용자에 대한 칼로리 항목이 이미 존재하는지 확인
        const existingCalorie = await Calorie.findOne({
            where: {
                UserId: req.user.id,
                date: date
            }
        });

        if (existingCalorie) {
            // 이미 항목이 존재하는 경우 업데이트
            existingCalorie.sum = sum;
            await existingCalorie.save();
            res.json({
                code: 200,
                payload: existingCalorie,
                message: "칼로리를 업데이트했습니다."
            });
        } else {
            // 항목이 존재하지 않는 경우 새로 생성
            const newCalorie = await Calorie.create({
                UserId: req.user.id,
                date: date,
                sum: sum
            });
            res.json({
                code: 200,
                payload: newCalorie,
                message: "칼로리를 등록했습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.deleteCalorie = async (req, res, next) => {
    try {
        const { date } = req.body;
        // 주어진 날짜와 사용자에 대한 칼로리 항목을 찾기
        const calorie = await Calorie.findOne({
            where: {
                userId: req.user.id,
                date: date
            }
        });

        if (calorie) {
            // 칼로리 항목이 존재하면 삭제
            await calorie.destroy();
            res.json({
                code: 200,
                message: "칼로리를 삭제했습니다."
            });
        } else {
            // 칼로리 항목이 존재하지 않으면 오류 메시지 반환
            res.status(404).json({
                code: 404,
                message: "해당 날짜에 대한 칼로리 기록이 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};