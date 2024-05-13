const Sequelize= require("sequelize");

class Enquiry extends Sequelize.Model{
    static initiate(sequelize){
        Enquiry.init({
            title:{
                type:Sequelize.STRING(25),
                allowNull:false
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
        db.Enquiry.belongsTo(db.User);
        db.Enquiry.belongsTo(db.Products);
    }
}

module.exports=Enquiry;