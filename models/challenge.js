const Sequelize= require("sequelize");

class Challenge extends Sequelize.Model{
    static initiate(sequelize){
        Challenge.init({
            name:{
                type:Sequelize.STRING(50),
                allowNull:false
            },
            img:{
                type:Sequelize.STRING(50),
                allowNull:true,
                defaultValue:"기본 이미지 경로"
            },
            startDay:{
                type:Sequelize.DATE,
                allowNull:false
            },
            EndDay:{
                type:Sequelize.DATE,
                allowNull:false
            },
            point:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            comment:{
                type:Sequelize.STRING(255),
                allowNull:true
            },
            caution:{
                type:Sequelize.STRING(255),
                allowNull:true
            },
            duration: { //end day start day 를 이용한 기간 을 넣는다.
                type: Sequelize.VIRTUAL, // 가상 필드로 설정
                get() {
                    const start = this.getDataValue('startDay');
                    const end = this.getDataValue('endDay');
                    return Math.floor((end - start) / (1000 * 60 * 60 * 24)); // 일 수 계산
                },
                set(value) {
                    throw new Error('임의로 작성하실수 없습니다');
                }
            }
        },{
            timestamps:true,
            sequelize,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
            hooks: {
                beforeSave: (challenge, options) => {
                    const start = challenge.startDay;
                    const end = challenge.endDay;
                    challenge.duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)); 
                } //이부분은 훅을 사용하는 것이다. -> 데이터 베이스 이전에 저장하기 전에 duration 부분을 채울수 있다.
            }
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Challenge.belongsToMany(db.User, {as :'Interester' ,through:'ChallengeInterest' }); //흥미있는 챌린지 테이블 생성
        db.Challenge.hasMany(db.Success)
    }
}

module.exports=Challenge;