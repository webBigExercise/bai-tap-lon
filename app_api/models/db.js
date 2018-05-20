const mongoose = require('mongoose');
const uri = 'mongodb://localhost/baiTapLon';

mongoose.connect(uri);

mongoose.connection.on('connected', () => console.log('connected to ' + uri));
mongoose.connection.on('disconnected', () => console.log('disconnected to ' + uri));
mongoose.connection.on('error', err => console.log(err));

require('./admin');
require('./lecturer');
require('./partner');
require('./student');
require('./project');
require('./internNotif');
require('./dialog');
require('./report');
require('./review');
require('./seed');