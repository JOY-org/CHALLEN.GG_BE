const Sequelize = require('sequelize');

class Point extends Sequelize.Model{
    static initiate(sequelize){
        Point.init({
            point:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            }
        },{
                sequelize,
                charset: "utf8",
                collate: "utf8_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Point.belongsTo(db.User)
    }
}

module.exports=Point;