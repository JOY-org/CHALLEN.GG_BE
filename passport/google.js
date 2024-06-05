const passport = require("passport");
const User = require("../models/user");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = () =>{
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/v1/auth/google/callback"
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            const exUser = await User.findOne({
                where:{ //googleId 칸이 없지만 일단 비슷하게 만들어 두었다. 
                    googleid:profile.id, //구글에서 제공하는것과 비교해서 찾아보아야 한다.
                    id:profile.id,
                    provider:'google'
                }
            });
            if (exUser){
                done(null,exUser);
            } else{
                const newUser = await User.create({
                    nickname : profile.displayName, //google이 제공하는게 맞나 확인해봐야 한다.
                    googleid: profile.id, // 지금 우리 데이터 베이스에는 google id 라는 데이터 열이 없다. 만들어봐야하는지 확인해 봐야한다.
                    id:profile.id,
                    provider:'google'
                });
                done(null, newUser)
            }
        }catch(err){
            console.error(err);
            document(err);
        }
    }));
}
