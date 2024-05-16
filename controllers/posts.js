const {User, Posts} = require('../models');
const op = require('sequelize').Op;
// 컨트롤러 js

exports.getPosts = async(req,res,next)=>{
    try {
        const posts = await Posts.findAll({
            order:[['createdAt','DESC']]
        })
        // if (posts){
        //     const post = await User.getPosts({
        //         attributes: [nickname]
        //     });
        // }
        res.json({
            code:200,
            payload: posts
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.uploadPosts = async(req,res,next)=>{
    try{
        const review = await Community.create({
            title : req.body.title,
            img : req.body.img,
            content : req.body.content,
            // userId: req.user.id, // 여기 user는 어디서 오는 건지 모르겠음
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.modifyPosts = async (req, res, next) => {
    try {
        await Posts.update({
            title: req.body.title,
            img: req.body.img,
            content: req.body.content,
        },{
            where: { id : req.community.id }
        });

        res.json({
            code: 200,
            message: '게시글 수정 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.deletePosts = async(req,res,next)=>{
    try{
        await Posts.destroy({
            where:{id: req.params.postid}
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