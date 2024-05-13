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
        db.Challenge.belongsToMany(db.User,{foreignKey:'challengeid',through:'ChallengeInterest'}); //흥미있는 챌린지 테이블 생성
        db.Challenge.hasMany(db.Success)
        db.Challenge.hasMany(db.Check)
    }
}

module.exports=Challenge;