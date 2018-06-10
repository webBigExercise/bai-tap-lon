const route = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

route.post('/updateInfo', authMiddleware, adminCtrl.updateInfo);
route.post('/createStudent', authMiddleware, adminCtrl.creatStudent);
route.post('/createLecturer', authMiddleware, adminCtrl.createLecturer);
route.post('/createPartner', authMiddleware, adminCtrl.createPartner);
route.post('/deleteStudent', authMiddleware, adminCtrl.deleteStudent);
route.post('/deleteLecturer', authMiddleware, adminCtrl.deleteLecturer);
route.post('/deletePartner', authMiddleware, adminCtrl.deletePartner);

module.exports = route;