const Sequelize = require('sequelize');

class Point extends Sequelize.Model{
    static initiate(sequelize){
        Point.init({
            id:{
                type: Sequelize.INTEGER,
                primaryKey:true,
            },
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
        db.Point.hasMany(db.User)
    }
}

module.exports=Point;