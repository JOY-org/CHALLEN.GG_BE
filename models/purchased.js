const Sequelize= require("sequelize");

class Purchased extends Sequelize.Model{
    static initiate(sequelize){
        Purchased.init({
            count:{
                type: Sequelize.INTEGER,
                allowNull:false,
                defaultValue:1
            },
            date:{
                type:Sequelize.DATE,
                allowNull:false
            }
        },{
            timestamps:true,
            sequelize,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Purchased.belongsTo(db.User)
        db.Purchased.belongsTo(db.Product)
    }
}

module.exports=Purchased;