const {User, Product, Cart} = require('../models');
const op = require('sequelize').Op;
// 컨트롤러 js

exports.getUser = async(req,res,next)=>{
    try {
        const user = await User.findAll({
            order:[['createdAt','DESC']]
        })
        res.json({
            code:200,
            payload: user
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}