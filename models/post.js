const Sequelize = require('sequelize');

class Posts extends Sequelize.Model{
    static initiate(sequelize){
        Posts.init({
            img:{
                type: Sequelize.STRING(225),
                allowNull:false,
            },
            content:{
                type: Sequelize.TEXT,
                allowNull:false
            },
            title:{
                type:Sequelize.STRING(30),
                allowNull:false
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
        db.Posts.belongsToMany(db.User,{foreignKey:"postid",through:'PostsLike'}) //Posts 테이블 생성
        db.Posts.belongsTo(db.User)
        db.Posts.belongsTo(db.Community)
    }
}
module.exports=Posts;
