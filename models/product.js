const Sequelize= require('sequelize')

class Product extends Sequelize.Model{
    static initiate(sequelize){
        Product.init({
            img:{
                type:Sequelize.STRING(200),
                allowNull:false,
                defaultValue:"이미지 주소",
            },
            name:{
                type:Sequelize.STRING(20),
                allowNull:false
            },
            brand:{
                type:Sequelize.STRING(20),
                allowNull:true,
                defaultValue:"X"
            },
            price:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:1000,
            },
            counts:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            description:{
                type:Sequelize.TEXT,
                allowNull:false,
                defaultValue:"물품 설명"
            },
            star:{
                type : Sequelize.INTEGER,
                allowNull: false,
            }
        },{
            timestamps:false,
            sequelize,
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db){
        //관계들어갈 곳
        // db.Product.hasMany(db.Cart);
        db.Product.hasMany(db.Review);
        db.Product.hasMany(db.Enquiry);
        db.Product.hasMany(db.Purchased);
    }
}

module.exports = Product;