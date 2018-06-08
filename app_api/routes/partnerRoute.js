const route = require('express').Router();
const partnerCtrl = require('../controllers/partnerCtrl');
const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

route.put('/updateInfo', authMiddleware, partnerCtrl.updateInfo);

module.exports = route;