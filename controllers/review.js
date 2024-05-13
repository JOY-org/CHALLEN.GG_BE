const {User, Product, Review} = require('../models');
const op = require('sequelize').Op;

exports.getReview = async(req, res, next)=>{
    try{
        let reviews=[];
        reviews=await Review.findAll({
            order:['createdAt','DESC']
        });//attributes로 user의 닉네임, 레밸들을 가져와야한다.
        if (reviews){
            const review = await User.getReview({
                attributes :[nickname]
            }); // 이부분이 맞나 확인 
        }
        res.json({
            code:200,
            payload:reviews
        });
    }catch(err){
        console.error(err);
        next(err);
    }
} // 미완성

exports.uploadReview = async(req,res,next)=>{
    try{
        console.log(req.body.title); // 프론트에서 데이터를 어떻게 보내냐에 따라 달라진다 *필수로 들어가야하는 타이틀
        console.log(req.body.content); // 프론트에서 데이터를 어떻게 보내냐에 따라 달라 질수 있다. (확인해보기) * 필수로 들어가야 하는 리뷰 내용
        console.log(req.user.id); // 프론트에서 데이터를 어떻게 보내냐에 따라 달라 질수 있고 누가 review를 썻는지 연결이 가능하다,
        const review = await Review.create({
            title : req.body.title,
            content : req.body.content,
            UserId:req.user.id,
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.modifyReview = async(req,res,next)=>{
    try{
        await Review.update({
            title:req.body.title,
            content:req.body.content
        },{
            where:{id:req.params.id}
        }); //프론트에서 누른다면 Review의 아이디가 찍혀 그 id를 교체해준다.

        //수정했으면 아래로 다시 뿌려줘야하는데 이게 맞는가?
        const review = await Review.findAll({
            order:['createdAt','DESC'] //이렇게해서 정렬을 해준다
        })
        //attributes로 user의 닉네임, 레밸들을 가져와야한다.
    }catch(err){
        console.error(err);
        next(err)
    }
}

exports.deleteReview = async(req,res,next)=>{
    try{
        await Review.destroy({
            where:{id:req.params.id} 
            //프론트에서 누른다면 Review의 아이디가 찍혀 그 id를 가지고 지운다.
        })
        res.json({
            code:200,
            message:"리뷰가 삭제되었습니다."
        })
    }catch(err){
        console.errer(err);
        next(err);
    }
}