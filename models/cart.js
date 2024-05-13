const Sequelize = require('sequelize');

class Cart extends Sequelize.Model{
    static initiate(sequelize){
        Cart.init({
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
            },
            count:{
                type: Sequelize.INTEGER,
                allowNull:false,
                defaultValue:1,
            }
        },{
            timestamps:true,
            sequelize,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Cart.belongsTo(db.User)
        db.Cart.belongsTo(db.Products)
    }
}

module.exports=Cart;