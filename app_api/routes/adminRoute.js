const route = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

route.post('/updateInfo', authMiddleware, adminCtrl.updateInfo);
route.get('/allStudent', authMiddleware, adminCtrl.allStudent);
route.get('/allLecturer', authMiddleware, adminCtrl.allLecturer);
route.get('/allPartner', authMiddleware, adminCtrl.allPartner);
route.post('/createStudent', authMiddleware, adminCtrl.creatStudent);
route.post('/createLecturer', authMiddleware, adminCtrl.createLecturer);
route.post('/createPartner', authMiddleware, adminCtrl.createPartner);
route.post('/deleteStudent', authMiddleware, adminCtrl.deleteStudent);
route.post('/deleteLecturer', authMiddleware, adminCtrl.deleteLecturer);
route.post('/deletePartner', authMiddleware, adminCtrl.deletePartner);
route.get('/allIntern', authMiddleware, adminCtrl.allIntern);
route.post('/delIntern', authMiddleware, adminCtrl.delIntern);
route.post('/inbox', authMiddleware, adminCtrl.inbox);

module.exports = route;