const {User, Products, Cart} = require('../models');

exports.dummyInput = async (req, res, next)=>{
    const user_dummy = [
        {"id":"kwj","password":123,"nickname": "kwj"},
        {"id":"pse","password":123,"nickname": "psw"}
    ]

    const prod_dummy = [
        {"name":"아이폰","brand":"apple"},
        {"name":"아이패드"}
    ]
    try {
        await User.bulkCreate(user_dummy);
        await Products.bulkCreate(prod_dummy);
        
        res.json({'res':'dummydata input ok'});
    } catch (error) {
        console.error(error);
        res.json({'res':'dummydata input not ok, look at your terminal'});
    }
}