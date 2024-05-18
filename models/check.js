const Sequelize= require("sequelize");

class Check extends Sequelize.Model{
    static initiate(sequelize){
        Check.init({
            img:{
                type:Sequelize.STRING(255),
                allowNull:true,
                defaultValue:"이미지경로"
            },
        },{
            timestamps:true,
            sequelize,
            charset: "utf8",
            collate: "utf8_general_ci",
            updatedAt:false //updatedAt -> 비활성화
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Check.belongsTo(db.User);
        db.Check.belongsTo(db.Challenge);
    }
}

module.exports=Check;