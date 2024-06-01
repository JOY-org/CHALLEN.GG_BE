const { Post ,User,Comment } = require('../models');
const op = require('sequelize').Op;
const sequelize = require('sequelize');
// 컨트롤러 js

exports.getPostByCommId = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: User
            },{
                model: User,
                as: 'Likers',
                attributes: ['id']
            },{
                model:Comment
            }],
            where: {
                category: req.params.commId
            }
        });
        res.json({
            code: 200,
            payload: posts
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
exports.getPost = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: User
            }]
        });
        res.json({
            code: 200,
            payload: posts
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// exports.uploadPost = async(req,res,next)=>{
//     try{
//         const post = await Post.create({
//             title :req.body.title,
//             content:req.body.content,
//             category:req.body.category,
//             img:req.body.img,
//             UserId: req.user.id,
//         })
//         res.json({
//             code:200,
//             payload : post,
//             message:"업로드를 완료 했습니다.",
//             UserId:req.user.id,
//         })
//     }catch(err){
//         console.error(err);
//         next(err)
//     }
// }

// exports.uploadImg =(req,res)=>{
//     res.json({
//         code: 200,
//         img:`/uploads/${req.file.filename}` //req.file.filename으로 받아 올수 있다.
//     })
// }

exports.uploadPostAndImg = async (req, res, next) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            img: req.file ? `/uploads/post/${req.file.filename}` : `/uploads/post/default.png`,
            UserId: req.user.id,
        });
        const result = await Post.findOne({
            where : {id: post.id},
            include: [{
                model: User
            }]
        });


        res.json({
            code: 200,
            payload: result,
            message: "게시물과 이미지를 업로드했습니다.",
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.modifyPost = async (req, res, next) => {
    try {
        await Post.update(req.body,{
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
        next(err);
    }
}

exports.likePost = async(req, res, next)=>{
    try {
        const post = await Post.findOne({
            where:{id: req.body.id }
        });
        if (post) {
            await post.addLiker(req.user.id);   
            res.json({
                code:200,
                payload : post,
                message:"해당 게시물을 좋아합니다."
            })
        } else{
            res.json({
                code : 404,
                message:"해당 게시물을 찾을 수 없습니다."
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.unlikePost = async(req, res, next)=>{
    try {
        const user = await User.findOne({
            where:{id: req.user.id }
        });
        if (user){
            await user.removeLikedPosts(req.body.id); // 게시글 아이디를 찾아 지운다.
            res.json({
                code:200,
                message:"좋아요를 취소하였습니다"
            });
        } else {
            res.json({
                code: 404,
                message : "사용자를 찾을 수 없습니다."
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getLikersByPostId = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [{
                model: User,
                as: 'Likers',
                attributes:['id']
            }]
        });

        if (post) {
            res.json({
                code: 200,
                payload: post.Likers,
                message: "해당 게시물을 좋아요한 사용자 목록입니다."
            });
        } else {
            res.json({
                code: 404,
                message: "해당 게시물을 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.getLikedPostsByUserId = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId },
            include: [{
                model: Post,
                as: 'LikedPosts'
            }]
        });

        if (user) {
            res.json({
                code: 200,
                payload: user.LikedPosts,
                message: "해당 사용자가 좋아요한 게시물 목록입니다."
            });
        } else {
            res.json({
                code: 404,
                message: "해당 사용자를 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};