const schedule = require('node-schedule')
const { Success, Check, Challenge} = require('../models')

const successCheck = schedule.scheduleJob('0 0 0 * * *', async() => {
    // 매일 한국시간으로 오전 
    try {
        const successes = await Success.findAll(); //모든 Success항목을 가져온다.
        for(const success of successes){
            const checks = await Check.findAll({
                where :{ SuccessId: success.id}
            }) //해당 success.id에 해당하는 check 열을 모두 가져온다.
            const checkout = checks.length
            const challenge = await Challenge.findOne({
                where : {Id : success.ChallengeId}
            })
            if ( checkout>= challenge.duration){
                await success.update({success:true})
            }
        }
        console.log("해당기간만큼 인증하였기 때문에 성공했습니다.");
    } catch (err) {
        console.error(err);
    }
})

module.exports = successCheck