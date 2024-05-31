const Sequelize = require('sequelize');

class Cart extends Sequelize.Model{
    static initiate(sequelize){
        Cart.init({
            count:{
                type: Sequelize.INTEGER,
                allowNull:false,
                defaultValue:1,
            }
        },{
            sequelize,
            timestamps:true,
            charset: "utf8mb4",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Cart.belongsTo(db.User)
        // db.Cart.belongsTo(db.Product)
    }
}

module.exports=Cart;