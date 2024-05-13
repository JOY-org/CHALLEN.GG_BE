const {Products} = require('../models');
const op = require('sequelize').Op;

exports.getProducts=async(req,res,next)=>{
    try {
        const product = await Products.findAll({
            order:[['createdAt','DESC']]
        })
        res.json({
            code:200,
            payload: product
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}