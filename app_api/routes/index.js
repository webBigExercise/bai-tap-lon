const route = require('express').Router();
const studentRoute = require('./studentRoute');
const lecturerRoute = require('./lecturerRoute');
const authenticationRoute = require('./authenticationRoute');

route.use('/', authenticationRoute);
route.use('/lecturer', lecturerRoute);
route.use('/student', studentRoute);

// route.get('/test', (req, res) => {
//     let a = new Admin();
//     let tes = a.generatePassword();

    

//     res.send(`${tes} fkalsdjfl`);
// })

module.exports = route;