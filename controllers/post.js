const { Post ,User, Community} = require('../models');
const op = require('sequelize').Op;
// 컨트롤러 js

exports.getPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: {
                model: User,
                attributes: ['id']
            }
        });
        if (posts.length === 0) {
            return res.json({
                code: 200,
                message: '개시글이 없습니다.',
                payload: []
            });
        }

        res.json({
            code: 200,
            payload: posts
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.uploadPost = async(req,res,next)=>{
    try{
        const post = await Post.create({
            title :req.body.title,
            content:req.body.content,
            category:req.body.category,
            UserId: req.user.id,
        })
        res.json({
            code:200,
            payload : post,
            message:"업로드를 완료 했습니다.",
            UserId:req.user.id,
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.uploadImg =(req,res)=>{
    res.json({
        code: 200,
        img:`/uploads/${req.file.filename}` //req.file.filename으로 받아 올수 있다.
    })
}

exports.modifyPost = async (req, res, next) => {
    try {
        await Post.update({
            content:req.body.content,
            img:req.body.img
        },{
            where: { id : req.params.postId}
        });
        const post = await Post.findOne({
            where:{id:req.params.id},
            include :{
                model:User,
                attributes:['id','nickname']
            }
        }); 
        res.json({
            code: 200,
            payload:post,
            message: '게시글 수정 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.deletePost = async(req,res,next)=>{
    try{
        await Post.destroy({
            where:{id: req.params.postId}
        })
        res.json({
            code:200,
            message:"게시글 삭제 완료"
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}