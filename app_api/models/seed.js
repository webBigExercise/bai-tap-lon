const Student = require('./student');
const Project = require('./project');
const Partner = require('./partner');
const Lecturer = require('./lecturer');
const InternNotif = require('./internNotif');
const Review = require('./review');
const Report = require('./report');
// const { Schema } = require('mongoose');

const students = [
    {
        mail: 'firstStd@gmail.com',
        password: 'somepass',
        //admin provide
        MSSV: 'dfadsf',
        name: 'nah bar sa',
        birth: new Date(2017, 1, 1),
        address: 'Mars',
        classroom: 'K61-CLC',
        startYear: 2015,
        speciality: 'nah',
        // vnuMail : {type: String, required: true},
        averageGrade: 6.789,
        granduatedYear: 2020,

        //user manage 
        privateEmail: 'lkfsadjlkfj',
        phoneNumber: '342-324-234',
        skills: ['html', 'pascal']
    },
    {
        mail: 'secStd@gmail.com',
        password: 'somepass',
        //admin provide
        MSSV: 'dfadfdsf',
        name: 'nah bdfar sa',
        birth: new Date(2017, 1, 1),
        address: 'Mars',
        classroom: 'K61-CLC',
        startYear: 2015,
        speciality: 'nah',
        // vnuMail : {type: String, required: true},
        averageGrade: 6.789,
        granduatedYear: 2020,

        //user manage 
        privateEmail: 'fasdlkfsadjlkfj',
        phoneNumber: '342-324-234',
        skills: ['html', 'pascal']
    }
]

const projects = [
    {
        name: 'sdlkafj',
        requiredSkills: ['html', 'css']
    }, {
        name: 'lecturerrdkfasldkf',
        requiredSkills: ['html', 'css']
    }
]

const partners = [{
    mail: 'pa@gmail.com',
    password: 'somepass',
    name: 'nah'
}]

const lecturers = [
    {
        mail: 'le@gmail.com',
        password: 'somepass',
        name: 'nahfd',
        birthday: Date.now()
    }
]

const notifs = [{
    title: 'nah',
    content: 'talk about something call recruit',
    startTime: Date.now(),
    endTime: new Date(4324, 2, 2),
    followers: []
}]

const reviews = [{
    intern: '',
    student: '',
    grade: 7,
    review: 'hahahahahahahahaha'
}];

const reports = [{
    content: 'soem thidkfjasldkf adsklfjl',
    docLink: ''
}]

createSeed();

// Student.count({}, (err, count) => {
//     console.log(count);
//     if (!count) Student.create(students);
// })


// Partner.count({}, (err, count) => {
//     if (!count) Partner.create(partners, (err, docs) => {

//         Project.count({}, (err, count) => {
//             if (!count) Project.create(projects.map(p => {
//                 return {
//                     ...p,
//                     partnerId: docs[0]._id
//                 }
//             }));
//         })


//     });
// })


async function createSeed() {
    await console.log('parnter');
    let count = await Partner.count({}).exec();

    if (!count) {

        //create partner
        await Partner.create(partners);
        let _partners = await Partner.find({}).exec();

        //create lecturer
        await Lecturer.create(lecturers);
        let _lecturers = await Lecturer.find({}).exec();


        //init project
        for (let i = 0; i < projects.length; ++i) {
            projects[i].ownerId = _partners[0]._id;
        }

        await Project.create(projects);
        let _projects = await Project.find({}).exec();



        //init student
        for (let i = 0; i < students.length; ++i) {
            students[i].projects = [_projects[0]._id];
        }
        await Student.create(students);
        await Project.create(_projects);
        let _students = await Student.find({}).exec();


        //student add project
        // _students.forEach(s => {
        //     _projects[0].students.push({
        //         studentId: s._id,
        //         grade: 6,
        //         comment: 'nhu cut'
        //     });
        // });

        //student add project
        _projects[0].students.push({
            studentId: _students[0]._id,
            grade: 6,
            comment: 'nhu cut'
        });
        _projects[1].students.push({
            studentId: _students[1]._id,
            grade: 7,
            comment: 'nhu shit'
        })

        //partner add project
        _partners[0].listProject = [_projects[0]];
        await Partner.create(_partners);
        await Project.create(_projects);


        //lecturer add project
        _lecturers[0].listProject = [_projects[1]];
        await Lecturer.create(_lecturers);
        _projects[1].ownerId = _lecturers[0]._id;
        await Project.create(_projects);

        //create notif
        for (let i = 0; i < notifs.length; ++i) {
            notifs[i].ownerId = _partners[i % notifs.length]._id;
            notifs[i].followers.push(_students[i % notifs.length]._id);
        }

        await InternNotif.create(notifs);
        let _notifs = await InternNotif.find({}).exec();

        //add notif for partner
        _partners[0].listNotiF.push(_notifs[0]._id);
        await Partner.create(_partners);


        //create review
        for (let i = 0; i < reviews.length; ++i) {
            reviews[i].intern = _notifs[i % _notifs.length]._id;
            reviews[i].student = _students[i % _students.length]._id;
        }
        await Review.create(reviews);


        //create report
        reports[0].sender = _students[0]._id;
        reports[0].receiver = _lecturers[0]._id;
        await Report.create(reports);
        let _reports = await Report.find({}).exec();

        //add report to stu lec
        _students[0].reports.push(_reports[0]._id);
        _lecturers[0].reports.push(_reports[0]._id);
        await Lecturer.create(_lecturers);
        await Student.create(_students);
    }

}
