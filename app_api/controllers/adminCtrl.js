const Admin = require('../models/admin');
const Student = require('../models/student');
const Lecturer = require('../models/lecturer');
const Partner = require('../models/partner');

const updateInfo = (req, res) => {
    const { mail } = req.payload;

    const { name, vnumail, gmail, password, phoneNum } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });
    if (!vnumail) return res.status(400).json({ message: "vnumail is required" });
    if (!gmail) return res.status(400).json({ message: "gmail is required" });
    if (!password) return res.status(400).json({ message: "password is required" });
    if (!phoneNum) return res.status(400).json({ message: "phoneNum is required" });

    Admin.findOne({ mail }, (err, admin) => {
        if (err) return res.status(400).json(err);
        if (!admin) return res.status(400).json({ message: 'no admin is founded' });

        admin.name = name;
        admin.vnumail = vnumail;
        admin.gmail = gmail;
        admin.password = password;
        admin.phoneNum = phoneNum;

        admin.save(e => {
            if (e) return res.status(400).json(e);

            return res.status(200).json({ message: 'success' });
        })
    })
}

const creatStudent = (req, res) => {
    const { mail, password } = req.body;

    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    const MSSV = `x${Date.now().toString()}`,
        name = 'x',
        birth = Date.now(),
        address = 'x',
        classroom = 'x',
        startYear = (new Date()).getFullYear(),
        speciality = 'x',
        averageGrade = 0,
        granduatedYear = (new Date()).getFullYear() + 4,
        phoneNumber = '23454545';

    const newStudent = new Student();
    // newStudent = {
    //     ...newStudent,
    //     mail,
    //     password,
    //     MSSV,
    //     name, 
    //     birth,
    //     address,
    //     classroom,
    //     startYear,
    //     speciality,
    //     averageGrade,
    //     granduatedYear
    // }

    newStudent.mail = mail;
    newStudent.password = password;
    newStudent.MSSV = MSSV;
    newStudent.name = name;
    newStudent.birth = birth;
    newStudent.address = address;
    newStudent.classroom = classroom;
    newStudent.startYear = startYear;
    newStudent.speciality = speciality;
    newStudent.averageGrade = averageGrade;
    newStudent.granduatedYear = granduatedYear;
    newStudent.phoneNumber = phoneNumber;


    newStudent.save(e => {

        if(e) return res.status(500).json(e);

        return res.status(200).json({message: "success"});
    })

}

const createLecturer = (req, res) => {
    const { mail, password } = req.body;

    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    const newLecturer = new Lecturer();
    newLecturer.mail = mail;
    newLecturer.password = password;
    newLecturer.birthday = Date.now();
    newLecturer.name = 'x';

    newLecturer.save(e => {
        if(e) return res.status(500).json(e);

        return res.status(200).json({message: 'success'});
    })
}

const createPartner = (req, res) => {
    const { mail, password } = req.body;

    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    const newPartner = new Partner();
    newPartner.mail = mail;
    newPartner.password = password;
    newPartner.name = 'x';
    newPartner.info = 'x';

    newPartner.save(e => {
        if(e) return res.status(500).json(e);

        return res.status(200).json({message: 'success'});
    })
}

const deleteStudent = (req, res) => {
    const {mail} = req.body;

    Student.findOneAndRemove({mail}, (err, resp) => {
        if(err) return res.status(400).json(err);

        return res.status(200).json({message: 'success'});
    });
}

const deleteLecturer = (req, res) => {
    const {mail} = req.body;

    Lecturer.findOneAndRemove({mail}, (err, resp) => {
        if(err) return res.status(400).json(err);

        return res.status(200).json({message: 'success'});
    });
}

const deletePartner = (req, res) => {
    const {mail} = req.body;

    Lecturer.findOneAndRemove({mail}, (err, resp) => {
        if(err) return res.status(400).json(err);

        return res.status(200).json({message: 'success'});
    });
}

module.exports = {
    updateInfo,
    creatStudent,
    createLecturer,
    createPartner,
    deleteStudent,
    deleteLecturer,
    deletePartner
}