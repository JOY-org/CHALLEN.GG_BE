const bcrypt = require('bcrypt');
const {User}= require ('../models;')
const passport = require('passport');

// const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('authenticate 완료', err, user, info);
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            throw new Error(info.message);
        }
        return req.login(user, (err) => {
            console.log('login 실행', err);
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/');
        })
    })(req, res, next);

const jwt = require('jsonwebtoken');

exports.refreshToken = async(req,res,next) =>{
    try{
        const {accessToken}= ren.body;
        const accessResult=jwt.decode(accessToken,process.env.JWT_SECRET);
        const user= await User.findOne({where:{id:accessResult.id}})
        const refreshResult= jwt.verify(user.refreshToken,process.env.JWT_SECRET);
        if(accessResult.id!==refreshResult.id){
            throw new Error('토큰이 일치하지 않습니다.');
        }
        const newAccessToken = jwt.sing(
            { id: accessResult.id, nickname: accessResult.nickname},
            process.env.JWT_SECRET,
            {expiresIn:'1h',issuer:"mini_project",subject:"accessToken"}
        )

        res.json({
            code:200,
            message:"새로운 토큰이 발급되었습니다.",
            accessToken:newAccessToken
        })
    }catch(err){
        console.error(err);
        next(err)
    }
} //refresh 토큰 만들기

exports.googleLogin = async(req, res, next)=>{
    try{
        passport.authenticate('google',{session:false},(err,user,info)=>{
            if (err){
                return next(err);
            }
            if(!user){
                throw new Error(info.message);
            }
            return req.login(user,(err)=>{
                const accessToken = jwt.sign( 
                    { id: user.id, nickname: user.nickname},
                    process.env.JWT_SECRET,
                    { expiresIn : '1h', issuer: "mini_project", subject: "accessToken"}
                );

                const refreshToken = jwt.sign(
                    { id: user.id, nickname: user.nickname},
                    process.env.JWT_SECRET,
                    { expiresIn : '7d', issuer: "mini_project", subject: "refreshToken"}
                );

                User.update({refreshToken},{where :{id:user.id}}); //업데이트 되면 refresh토큰열에 새로 refresh토큰을 넣어준다. 

                if (err) {
                    console.error(err);
                    return next(err);
                }; //여기까지 그냥 로그인한다면 토큰을 주는 것들 반복이다.
                
                res.cookie("userId",user.id,{
                    httpOnly: false,
                    secure:false
                }) //아이디도 같이 보내준다.

                res.cookie("accessToken",accessToken,{
                    httpOnly: false,
                    secure:false
                }) // 토큰을 쿠키로 보내준다.
                res.status(302).redirect(process.env.CLIENT_URL)
            })
        })
    } catch(err){
        return next(err);
    }
} // 구글 로그인 부분

exports.kakaoLogin = async(req, res, next)=>{
    try{
        passport.authenticate('kakao',{session:false},(err,user,info)=>{
            if (err){
                return next(err);
            }
            if(!user){
                throw new Error(info.message);
            }
            return req.login(user,(err)=>{
                const accessToken = jwt.sign(
                    { id: user.id, nickname: user.nickname},
                    process.env.JWT_SECRET,
                    { expiresIn : '1h', issuer: "mini_project", subject: "accessToken"}
                );

                const refreshToken = jwt.sign(
                    { id: user.id, nickname: user.nickname},
                    process.env.JWT_SECRET,
                    { expiresIn : '7d', issuer: "mini_project", subject: "refreshToken"}
                );

                User.update({refreshToken},{where :{id:user.id}}); 
                if (err) {
                    console.error(err);
                    return next(err);
                }; 
                
                res.cookie("userId",user.id,{
                    httpOnly: false,
                    secure:false
                }) 

                res.cookie("accessToken",accessToken,{
                    httpOnly: false,
                    secure:false
                })
                res.status(302).redirect(process.env.CLIENT_URL)
            })
        })
    } catch(err){
        return next(err);
    }
}