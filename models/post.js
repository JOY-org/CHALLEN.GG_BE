const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static initiate(sequelize){
        Post.init({
            img:{
                type: Sequelize.STRING(225),
                allowNull:false,
                defaultValue:"이미지 경로"
            },
            content:{
                type: Sequelize.STRING(150),
                allowNull:false
            },
            title:{
                type:Sequelize.STRING(30),
                allowNull:false
            },
            category:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:1
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
        db.Post.belongsTo(db.User)
        db.Post.belongsToMany(db.User, {as:'liker', through: 'PostsLike' }) //Posts 테이블 생성
    }
}
module.exports=Post;
