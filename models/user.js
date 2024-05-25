const Sequelize= require('sequelize')

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            id:{
                type: Sequelize.STRING(255),
                primaryKey:true,
            },
            password:{
                type: Sequelize.STRING(100),
                allowNull:false,
            },
            nickname: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique:true,
            },
            provider:{
                type:Sequelize.STRING(10),
                allowNull:true,
                defaultValue:'local'
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true,
                defaultValue:"/uploads/user/default.png",
            },
            exp:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            kakaoid:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            googleid:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            refreshToken:{
                type: Sequelize.STRING(255),
                allowNull:true,
            }
        },{
            timestamps:true,// createdAt, updatedAt 이것을 false 라고 하면 안뜹니다.
            sequelize,
            paranoid: true,
            //paranoid :deletedAt 생성, true 때문에 완전 삭제가 되는것이 아니라 삭제된 시간이 뜬다.
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
    static associate(db){
        //관계들어갈 곳
        db.User.hasMany(db.Calorie);
        db.User.hasMany(db.Cart);
        db.User.belongsToMany(db.Challenge,{foreignKey:"UserId",as :'InterestedChallenge',through:'ChallengeInterest'}); //흥미있는 챌린지 테이블 생성
        db.User.hasMany(db.Enquiry);
        db.User.hasMany(db.Review);
        db.User.hasMany(db.Purchased);
        db.User.hasMany(db.Notification);
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, { foreignKey: 'followingId', as: 'Followers', through: 'Follow' });
        db.User.belongsToMany(db.User, { foreignKey: 'followerId', as: 'Followings', through: 'Follow' });
        db.User.belongsToMany(db.Post,{foreignKey:"UserId",through:'PostsLike', as:'LikedPosts' }); //PostsLike 테이블 생성
        db.User.hasMany(db.Point);
        db.User.hasMany(db.Success);
    }
}

module.exports=User;