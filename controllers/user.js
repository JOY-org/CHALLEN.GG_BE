const {User, Notification} = require('../models');
const Point = require('../models/point');
const op = require('sequelize').Op;
// 컨트롤러 js

exports.getLoginedUser = async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
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

exports.getAllUsers = async(req,res,next)=>{
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
//이미지와 닉네임을 수정하는코드
exports.modifyUser = async (req, res, next) => {
    try {
        let updateData = {};
        if (req.body.nickname) {
            updateData.nickname = req.body.nickname;
        }
        if (req.file) {
            updateData.img = `/uploads/user/${req.file.filename}`;
        }
        await User.update(updateData, { where: { id: req.user.id } });

        const user = await User.findOne({ where: { id: req.user.id } });
        res.json({
            code: 200,
            message: '수정이 완료되었습니다',
            img: user.img,
            nickname: user.nickname
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

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

exports.follow = async (req, res, next) => {
    try {
        // 내 아이디 : req.user.id
        // 상대방 아이디 : req.body.id
        const user = await User.findOne({
            where: { id: req.body.id }
        });
        if (user) {
            // me follower you following
            await user.addFollowers(req.user.id);
            await Notification.create({
                content: `${req.user.nickname}님 당신을 팔로우했습니다 q(≧▽≦q)`,
                UserId: req.body.id
            })
            res.json({
                code: 200,
                message: "팔로우 되었습니다."
            });
        } else {
            res.json({
                code: 404,
                message: "사용자를 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.unfollow = async (req, res, next) => {
    try {
        // 내 아이디 : req.user.id
        // 상대방 아이디 : req.body.id
        const user = await User.findOne({
            where: { id: req.user.id }
        });
        if (user) {
            await user.removeFollowings(req.body.id);
            await Notification.create({
                content: `${req.user.nickname}님 당신을 언팔로우했습니다 (┬┬﹏┬┬)`,
                UserId: req.body.id
            })
            res.json({
                code: 200,
                message: "언팔로우 되었습니다."
            });
        } else {
            res.json({
                code: 404,
                message: "사용자를 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getFollowers = async (req, res ,next) => {
    // 조회할 대상자의 아이디 : req.params.id
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });
        if (user) {
            const followers = await user.getFollowers({
                attributes: ['id', 'nickname','provider','img']
            });
            res.json({
                code: 200,
                payload: followers
            });
        } else {
            res.json({
                code: 404,
                message: "사용자를 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getFollowings = async (req, res ,next) => {
    // 조회할 대상자의 아이디 : req.params.id
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });
        if (user) {
            const followings = await user.getFollowings({
                attributes: ['id', 'nickname','provider','img']
            });
            res.json({
                code: 200,
                payload: followings
            });
        } else {
            res.json({
                code: 404,
                message: "사용자를 찾을 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getPoint = async(req,res,next) =>{
    try {
        const point = await Point.findOne({
            where:{ UserId:req.user.id}
        })
        res.json({
            code:200,
            payload:point,
            message:"point 조회 완료"
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.modifyPoint = async(req,res,next)=>{
    try{
        const point = await Point.update(req.body, {where:{UserId:req.user.id}})
        res.jsont({
            code:200,
            payload:point,
            message:"point 수정 완료"
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}