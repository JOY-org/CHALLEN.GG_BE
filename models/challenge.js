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
            }
        },{
            timestamps:true,
            sequelize,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Challenge.belongsToMany(db.User, {as :'Interester' ,through:'ChallengeInterest' }); //흥미있는 챌린지 테이블 생성
        db.Challenge.hasMany(db.Check)
        db.Challenge.hasMany(db.Success)
    }
}

module.exports=Challenge;