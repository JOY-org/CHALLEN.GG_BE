const bcrypt = require('bcrypt');
const {User}= require ('../models')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {ExtractJwt} = require('passport-jwt')

exports.createToken = (req, res, next) => {
    try{
        passport.authenticate('local', {session:false}, (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            } else if (!user) {
                throw new Error(info.message);
            }
            return req.login(user, (err) => {
                // token access
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                        nickname: user.nickname
                    },
                    process.env.JWT_SECRET,
                    // 1시간 후엔 expire
                    {expiresIn: '1h', issuer: 'multi_project', subject:'accessToken'}
                );

                // token refresh
                const refreshToken = jwt.sign(
                    {
                        id: user.id,
                        nickname: user.nickname
                    },
                    process.env.JWT_SECRET,
                    {expiresIn: '7d', issuer: 'multi_project', subject:'accessToken'}
                );
                User.update({refreshToken}, {where: {di:user.id}});
                if(err) {
                    console.error(err);
                    return next(err);
                }
                res.json({
                    code:200,
                    message: '토근 발급 완료',
                    accessToken,
                    refreshToken,
                    userid: user.id
                });
            })
        })(req, res, next);
    } catch(err){
        console.error(err);
        next(err);
    }
}

exports.join = async(req,res,next)=>{
    console.log(req.body);
    const { id,password,nickname}= req.body; //password가 숫자 X 문자열 이여야 한다.
    try {
        const exId = await User.findOne({where:{id}});
        if(exId){
            throw new Error('이미 가입된 아이디 입니다.')
        }
        const exNickname = await User.findOne({where:{nickname}});
        if(exNickname){
            throw new Error('이미 존재하는 닉네임 입니다.')
        }
        const hash =await bcrypt.hash(password,10) //암호화를 10번 정도 돌리자
        await User.create({
            id,
            nickname,
            password:hash 
        });
        res.json({
            code:200,
            message:"회원가입이 완료되었습니다."
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}


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
}// 카카오 로그인