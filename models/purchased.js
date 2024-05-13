const Sequelize= require("sequelize");

class Purchased extends Sequelize.Model{
    static initiate(sequelize){
        Purchased.init({
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
            },
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
            sequelize,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Purchased.belongsTo(db.User)
        db.Purchased.belongsTo(db.Products)
    }
}

module.exports=Purchased;