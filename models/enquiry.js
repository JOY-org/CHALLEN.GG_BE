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
            charset: "utf8mb4",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Enquiry.belongsTo(db.User);
        db.Enquiry.belongsTo(db.Product);
    }
}

module.exports=Enquiry;