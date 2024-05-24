const Sequelize = require('sequelize');

class Calorie extends Sequelize.Model{
    static initiate(sequelize){
        Calorie.init({
            sum:{
                type:Sequelize.INTEGER,
                allownull:true,
                defaultValue:0
            },date: {
                type: Sequelize.DATEONLY, // 날짜 필드 추가
                allowNull: false
            }
        },{
            sequelize,
            timestamps:true,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        db.Calorie.belongsTo(db.User)
    }
}

module.exports=Calorie;