const { Calorie} = require('../models');
const op = require('sequelize').Op;

exports.getCalorie = async(req,res,next) =>{
    try {
        const calorie =await Calorie.findAll({
            where:{id:req.user.id}
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}