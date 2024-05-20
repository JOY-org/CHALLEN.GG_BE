const Sequelize= require("sequelize");

class Review extends Sequelize.Model{
    static initiate(sequelize){
        Review.init({
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
        db.Review.belongsTo(db.User)
        db.Review.belongsTo(db.Product)
    }
}

module.exports=Review;