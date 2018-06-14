const route = require('express').Router();

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

const uploadMilleware = require('multer')({ dest: './assets' }).single('report');

const studentCtrl = require('../controllers/studentCtrl');

route.get('/getInfo', authMiddleware, studentCtrl.getInfo);
route.put('/updateInfo', authMiddleware, studentCtrl.updateInfo);
route.get('/getSkill', authMiddleware, studentCtrl.getSkill);

route.post('/findNotif', authMiddleware, studentCtrl.findNotif);
route.put('/asignForIntern', authMiddleware, studentCtrl.asignForIntern);
route.post('/inbox', authMiddleware, studentCtrl.inbox);
route.post('/sendBriefReport', authMiddleware, studentCtrl.sendBriefReport);
route.post('/sendFullReport', authMiddleware, uploadMilleware, studentCtrl.sendFullReport);
route.get('/allNotif', authMiddleware, studentCtrl.allNotif);
route.post('/chooseLecturer', authMiddleware, studentCtrl.chooseLecturer);

route.get('/seeReview', authMiddleware, studentCtrl.seeReview);
module.exports = route;