const { Check } = require('../models');

exports.getCheck = async (req,res,next) =>{
    try {
        const check = await Check.findAll({
            where:{}
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.uploadCheck = async(req, rex,next)=>{
    try {
        
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.deleteCheck = async(req, rex,next)=>{
    try {
        
    } catch (err) {
        console.error(err);
        next(err)
    }
}