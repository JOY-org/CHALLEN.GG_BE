const passport = require('passport')
const {User,Point, Notification} = require('../models')
const kakao = require('./kakao')
const local = require('./local');
const google = require('./google');
const jwt = require('./jwt')

module.exports =()=> {
    local();
    google();
    kakao();
    jwt();
    
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    }) // 위에 google과 kakao가 성공한다면 여기를 거치게 된다,

    //여기 이제 deserialize -> 부분을 만들어야한다.
    // 매번 로그인한다면 가져와야할 부분
    passport.deserializeUser((id,done)=>{
        User.findOne({  //id를 가지고 팔로워와 팔로윙도 가져오는 것이다.
            where:{ id },
            include :[
                {
                    model:User,
                    attribute:['id','nickname'],
                    as:'Followers'
                },
                {
                    model:User,
                    attribute:['id','nickname'],
                    as:'Followings'
                },
                {
                    model:Point,
                    attribute:['id','point'],
                },
                {
                    model:Notification,
                    attribute:['content']
                }
            ]
        })
        .then(user =>{
            done(null,user);
        })
        .catch(err=>{
            console.log(err);
        })
    })
    // -> 스켈레톤에서는 팔로우와 팔로잉을 가져왔는데 우리꺼에서는 무엇을 가져와야 하는지 의논 필요/ 알림과 포인트 까지는 가져와야 할것 같다.
}