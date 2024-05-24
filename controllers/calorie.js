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