const route = require('express').Router();
const studentRoute = require('./studentRoute');
const lecturerRoute = require('./lecturerRoute');
const partnerRoute = require('./partnerRoute');
const adminRoute = require('./adminRoute');
const authenticationRoute = require('./authenticationRoute');

route.use('/', authenticationRoute);
route.use('/lecturer', lecturerRoute);
route.use('/student', studentRoute);
route.use('/partner', partnerRoute);
route.use('/admin', adminRoute);

// route.get('/test', (req, res) => {
//     let a = new Admin();
//     let tes = a.generatePassword();

    

//     res.send(`${tes} fkalsdjfl`);
// })

module.exports = route;