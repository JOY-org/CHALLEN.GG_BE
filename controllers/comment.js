const { Comment, User } = require('../models');

exports.getComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findAll({
            where : {PostId:req.params.postId},
            include:{
                model: User
            },
            order: [['createdAt', 'DESC']]
        })
        res.json({
            code: 200,
            message: "해당 게시물에 모든 댓글을 조회했습니다.",
            payload:comment
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.uploadComment = async(req,res,next)=>{
    try {
        await Comment.create({
            UserId:req.user.id,
            PostId:req.body.postId,
            content:req.body.content,            
        })
        const comment = await Comment.findAll({
            where:{PostId:req.body.postId},
            include:{
                model: User
            }
        })
        res.json({
            code:200,
            message:"해당 게시물에 댓글을 작성하였습니다.",
            payload:comment
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.modifyComment = async(req,res,next)=>{
    try {
        const comment = await Comment.update({
            content : req.body.content,
            where:{
                UserId: req.user.id,
                PostId: req.params.postId
            }
        })
        res.json({
            code:200,
            message:'해당 댓글을 수정하였습니다.',
            payload: comment
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.deleteComment = async(req,res,next)=>{
    try {
        await Comment.destroy({
            where:{
                id: req.body.id
            }
        })
        res.json({
            code:200,
            message:'해당 댓글을 삭제하였습니다.'
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}