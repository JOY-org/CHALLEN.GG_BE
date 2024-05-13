const Sequelize= require("sequelize");

class Success extends Sequelize.Model{
    static initiate(sequelize){
        Success.init({
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
            },
            Success:{
                type:Sequelize.BOOLEAN,
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
        db.Success.belongsTo(db.User)
        db.Success.belongsTo(db.Challenge)
    }
}

module.exports=Success;