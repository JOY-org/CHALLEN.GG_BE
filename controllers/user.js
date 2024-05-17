const {User} = require('../models');
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

exports.modifyUser = async(req,res,next)=>{
    try {
        await User.update(req.body,{where:{id:req.user.id}}) //params가 아니라 토큰으로 찾은 user을 넘겨준다.
        res.json({
            code:200,
            message:'수정이 완료되었습니다'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.deleteUser = async (req,res,next)=>{
    try {
        await User.destroy({
            where:{id:req.user.id}
        })
        res.json({
            code:200,
            message:'삭제가 완료되었습니다'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}