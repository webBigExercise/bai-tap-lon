const route = require('express').Router();
const lecturerCtrl = require('../controllers/lecturerCtrl');

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

route.put('/updateInfo', authMiddleware, lecturerCtrl.updateInfo);
route.get('/getListStudentFollow', authMiddleware, lecturerCtrl.getListStudentFollow)

module.exports = route;