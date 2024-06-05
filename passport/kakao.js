const passport = require("passport");
const User = require("../models/user");
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = () =>{
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_KEY,
        callbackURL: "/v1/auth/kakao/callback"
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            const exUser = await User.findOne({
                where:{  
                    id:profile.id, //카카오에서 제공하는것과 비교해서 찾아보아야 한다.
                    kakaoid: profile.id,
                    provider:'kakao'
                }
            });
            if (exUser){
                done(null,exUser);
            } else{
                const newUser = await User.create({
                    nickname : profile.displayName,
                    id: profile.id,
                    kakaoid: profile.id,
                    provider:'kakao'
                });
                done(null, newUser)
            }
        }catch(err){
            console.error(err);
            done(err);
        }
    }));
}