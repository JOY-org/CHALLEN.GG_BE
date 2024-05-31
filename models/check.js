const Sequelize= require("sequelize");

class Check extends Sequelize.Model{
    static initiate(sequelize){
        Check.init({
            date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue: Sequelize.NOW //현재 날짜를 기본값으로 둔다
            },
            img:{
                type:Sequelize.STRING(255),
                allowNull:true,
                defaultValue:"이미지경로"
            },
        },{
            timestamps:true,
            sequelize,
            charset: "utf8mb4",
            collate: "utf8_general_ci",
            updatedAt:false //updatedAt -> 비활성화
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Check.belongsTo(db.Success);
    }
}

module.exports=Check;