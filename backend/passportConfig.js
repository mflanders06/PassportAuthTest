const user = require('./user.js');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    new localStrategy((username, password, done) => {
        user.
    })
}
