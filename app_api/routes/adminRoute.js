const route = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

route.post('/updateInfo', authMiddleware, adminCtrl.updateInfo);

module.exports = route;