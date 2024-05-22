const { ConnectionError } = require('sequelize');
const {Notification}= require ('../models')

exports.getNotification=async(req,res,next)=>{
    try {
        const notifi = await Notification.findAll({
            where : {UserId: req.user.id}
        })
        if(notifi.length ===0 ){
            return res.json({
                code: 200,
                message: '알림이 없습니다.',
                payload: []
            });
        }
        res.json({
            code:200,
            payload:notifi,
            message:"알림 열람이 완료되었습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}//알림을 확인

exports.uploadNotification = async(req,res,next)=>{
    try {
        const notifi = await Notification.create({
            UserId:req.user.id,
            content: req.body.content
        });
        res.json({
            code:200,
            payload:notifi,
            message:"알림 등록이 완료되었습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}//새로운 알림 업로드

exports.deleteNotification=async(req,res,next)=>{
    try {
        const notifi = await Notification.destroy({
            where:{id:req.body.id}
        })
        res.json({
            code:200,
            message:"알리 삭제가 완료되었습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}//알림을 삭제

exports.modifyNotification=async(req,res,next)=>{
    try {
        const notifi = await Notification.update(req.body,{
            where:{id:req.body.id}
        })
        res.json({
            code:200,
            payload:notifi,
            message:"알림 변경이 완료되었습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}// 알림을 변경 -> 이부분은 필요할까?