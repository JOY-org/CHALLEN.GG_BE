const Sequelize= require('sequelize')

class Products extends Sequelize.Model{
    static initiate(sequelize){
        Products.init({
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:false
            },
            name:{
                type:Sequelize.STRING(20),
                allowNull:false
            },
            brand:{
                type:Sequelize.STRING(20),
                allowNull:true,
            },
            price:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            counts:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            description:{
                type:Sequelize.TEXT,
                allowNull:false
            }
        },{
            timestamps:false,
            sequelize,
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db){
        //관계들어갈 곳
        db.Products.hasMany(db.Cart);
        db.Products.hasMany(db.Review);
        db.Products.hasMany(db.Enquiry);
        db.Products.hasMany(db.Purchased);
    }
}

module.exports = Products;