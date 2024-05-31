const Sequelize= require("sequelize");

class Challenge extends Sequelize.Model{
    static initiate(sequelize){
        Challenge.init({
            name:{
                type:Sequelize.STRING(50),
                allowNull:false
            },
            img:{
                type:Sequelize.STRING(255),
                allowNull:true,
                defaultValue:"/uploads/challenge/default.png"
            },
            startDay:{
                type:Sequelize.DATEONLY,
                allowNull:false
            },
            endDay:{
                type:Sequelize.DATEONLY,
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
                type: Sequelize.INTEGER,
                allowNull:false
            },
            max:{
                type: Sequelize.INTEGER,
                allowNull:false,
                defaultValue:20
            }
        },{
            timestamps:true,
            sequelize,
            paranoid: true,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Challenge.belongsToMany(db.User, {as :'Interester' ,through:'ChallengeInterest' }); //흥미있는 챌린지 테이블 생성
        db.Challenge.hasMany(db.Success)
    }
}

module.exports=Challenge;