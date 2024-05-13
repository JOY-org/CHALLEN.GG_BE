const {User, Product, Cart} = require('../models');

exports.dummyInput = async (req, res, next)=>{
    const user_dummy = [
        {"id":"kwj123", "nickname": "kwj","provider": true, "exp": 0},
        {"id":"pwd123", "nickname": "psw","provider": true, "exp": 0}
    ]

    const prod_dummy = [

    ]
    try {
        await User.bulkCreate(user_dummy);

        await Product.bulkCreate(prod_dummy);
        res.json({'res':'dummydata input ok'});
    } catch (error) {
        console.error(error);
        res.json({'res':'dummydata input not ok, look at your terminal'});
    }
}