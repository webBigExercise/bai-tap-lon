const route = require('express').Router();
const authMid = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
})
const studentCtrl = require('../controllers/studentCtrl');

route.get('/getInfo', authMid, studentCtrl.getInfo);
route.put('/updateInfo', authMid, studentCtrl.updateInfo);
route.get('/getSkill', authMid, studentCtrl.getSkill);

route.post('/findNotif', authMid, studentCtrl.findNotif);
route.put('/asignForIntern', authMid, studentCtrl.asignForIntern);
route.post('/inbox', authMid, studentCtrl.inbox );
route.post('/sendBriefReport', authMid, studentCtrl.sendBriefReport);
module.exports = route;