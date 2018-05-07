const route = require('express').Router();
const authenticationCtrl = require('../controllers/authenticationCtrl');


route.post('/login', authenticationCtrl.login);

module.exports = route;