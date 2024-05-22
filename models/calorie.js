const Sequelize = require('sequelize');

class Calorie extends Sequelize.Model{
    static initiate(sequelize){
        Calorie.init({
            sum:{
                type:Sequelize.INTEGER,
                allownull:true,
                defaultValue:0
            }
        },{
            sequelize,
            timestamps:true,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        db.Cart.belongsTo(db.User)
    }
}

module.exports=Calorie;