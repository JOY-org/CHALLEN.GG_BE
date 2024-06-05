const Sequelize = require('sequelize');

class ProductImg extends Sequelize.Model{
    static initiate(sequelize){
        ProductImg.init({
            img:{
                type:Sequelize.STRING(200),
                allowNull:false,
                defaultValue:"이미지 주소",
            },
        },{
            timestamps:true,
            sequelize,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db){
        db.ProductImg.belongsTo(db.Product);
    }
}

module.exports=ProductImg;