const Sequelize= require("sequelize");

class Review extends Sequelize.Model{
    static initiate(sequelize){
        Review.init({
            title:{
                type:Sequelize.STRING(25),
                allowNull:false
            },
            content:{
                type: Sequelize.TEXT,
                allowNull: true
            },
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
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.Review.belongsTo(db.User)
        db.Review.belongsTo(db.Product)
    }
}

module.exports=Review;