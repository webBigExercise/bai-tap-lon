const route = require('express').Router();
const studentRoute = require('./studentRoute');
const authenticationRoute = require('./authenticationRoute');

route.use('/', authenticationRoute);
route.use('/student', studentRoute);

// route.get('/test', (req, res) => {
//     let a = new Admin();
//     let tes = a.generatePassword();

    

//     res.send(`${tes} fkalsdjfl`);
// })

module.exports = route;