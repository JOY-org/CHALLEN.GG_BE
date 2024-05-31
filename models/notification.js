const Sequelize = require('sequelize');

class Notification extends Sequelize.Model{
    static initiate(sequelize){
        Notification.init({
            content:{
                type:Sequelize.STRING(100),
                allowNull:false,
            }
        },{
            timestamps:true,
            sequelize,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        })
    }
    static associate(db){
        db.Notification.belongsTo(db.User)
    }
}

module.exports=Notification