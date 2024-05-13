const Sequelize = require('sequelize');

class Community extends Sequelize.Model{
    static initiate(sequelize){
        Community.init({
            name:{
                type:Sequelize.STRING(50),
                allowNull:false,
                unique:true,
            },
            img:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            comment:{
                type:Sequelize.TEXT,
                allowNull:false,
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
        db.Community.belongsToMany(db.User,{foreignKey:'communityid',through:'UserCommunity'}); //사용자의 커뮤니티 테이블 생성
        db.Community.belongsToMany(db.User,{foreignKey:'communityid',through:'CommunityInterest'}); // 흥미있는커뮤니티 테이블 생성
        db.Community.hasMany(db.Posts)
    }
}  

module.exports=Community;