const passport = require("passport");
const User = require("../models/user");
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = () =>{
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "/v1/auth/kakao/callback"
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            const exUser = await User.findOne({
                where:{  
                    kakaoid:profile.id, //카카오에서 제공하는것과 비교해서 찾아보아야 한다.
                    provider:'kakao'
                }
            });
            if (exUser){
                done(null,exUser);
            } else{
                const newUser = await User.create({
                    nickname : profile.nickname, //제공은 nickname 인데 강사님과 다른이유
                    kakaoid: profile.id, 
                    provider:'kakao'
                });
                done(null, newUser)
            }
        }catch(err){
            console.error(err);
            document(err);
        }
    }));
}