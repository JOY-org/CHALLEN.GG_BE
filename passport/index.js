const passport = require('passport');
const {User} = require('../models');

const local = require('./local');
const google = require('./google');

module.exports =()=> {
    local();
    google();
}