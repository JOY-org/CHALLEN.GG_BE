const passport = require('passport')
const {User} = require('../models')

const google = require('./google')

module.exports =()=> {
    google()
}