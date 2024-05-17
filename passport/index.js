const passport = require('passport')
const {User} = require('../models')
const kakao = require('./kakao')
const local = require('./local');
const google = require('./google');

module.exports =()=> {
    local();
    google();
    kakao();
    
    
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    }) // 위에 google과 kakao가 성공한다면 여기를 거치게 된다,

    //여기 이제 deserialize -> 부분을 만들어야한다.
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
        })
        .then(user => {
            done(null, user); // req.user에 저장
        })
        .catch(err => done(err));
    })
    // -> 스켈레톤에서는 팔로우와 팔로잉을 가져왔는데 우리꺼에서는 무엇을 가져와야 하는지 의논 필요
}