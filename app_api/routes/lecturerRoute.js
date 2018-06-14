const route = require('express').Router();
const lecturerCtrl = require('../controllers/lecturerCtrl');

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

route.get('/getInfo', authMiddleware, lecturerCtrl.getInfo);
route.get('/listLec', authMiddleware, lecturerCtrl.listLec);
route.put('/updateInfo', authMiddleware, lecturerCtrl.updateInfo);
route.get('/getListStudentFollow', authMiddleware, lecturerCtrl.getListStudentFollow)
route.get('/reviewReport', authMiddleware, lecturerCtrl.reviewReport);
route.post('/inbox', authMiddleware, lecturerCtrl.inbox);
route.post('/reviewStudent', authMiddleware, lecturerCtrl.reviewStudent);
route.post('/giveGrade', authMiddleware, lecturerCtrl.giveGrade);
route.get('/genExcel', lecturerCtrl.genExcel);

module.exports = route;