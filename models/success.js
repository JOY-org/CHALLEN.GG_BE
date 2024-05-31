const Sequelize= require("sequelize");

class Success extends Sequelize.Model{
    static initiate(sequelize){
        Success.init({
            success:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:false
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
        db.Success.belongsTo(db.User);
        db.Success.belongsTo(db.Challenge);
        db.Success.hasMany(db.Check);
    }
}

module.exports=Success;