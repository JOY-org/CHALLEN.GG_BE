const Sequelize = require('sequelize');

class Comment extends Sequelize.Model{
    static initiate(sequelize){
        Comment.init({
            content :{
                type:Sequelize.TEXT,
                allowNull:false
            }
        },{
            sequelize,
            timestamps:true,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
}

module.exports=Comment;