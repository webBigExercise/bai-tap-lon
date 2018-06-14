const route = require('express').Router();
const partnerCtrl = require('../controllers/partnerCtrl');
const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

route.get('/getInfo', authMiddleware, partnerCtrl.getInfo);
route.put('/updateInfo', authMiddleware, partnerCtrl.updateInfo);
route.post('/postIntern', authMiddleware, partnerCtrl.postIntern);
route.put('/editIntern', authMiddleware, partnerCtrl.editIntern);
route.post('/inbox', authMiddleware, partnerCtrl.inbox);
route.get('/allStudentInIntern', authMiddleware, partnerCtrl.allStudentInIntern);
route.get('/allIntern', partnerCtrl.allIntern);


module.exports = route;