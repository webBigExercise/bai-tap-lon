const Lecturer = require("../models/lecturer");
const Project = require('../models/project');
const Student = require('../models/student');
const Person = require('../models/person');
const Dialog = require('../models/dialog');
const Review = require('../models/review');
const Admin = require('../models/admin');
const nodeXlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const del = require('del');

const listLec = async (req, res) => {
    try {
        const lecturers = await Lecturer.find().exec();

        res.status(200).json({lecturers});
    } catch (e) {
        res.status(400).json(e)
    }


}

const updateInfo = (req, res) => {
    const { mail } = req.payload;
    const { vnumail, birthday, phone, note, password, name } = req.body;

    if (!vnumail) return res.status(400).json({ message: "vnumail is required" });
    // if(!birthday) return res.status(400).json({message: "birthday is required"});
    if (!phone) return res.status(400).json({ message: "phone is required" });
    if (!note) return res.status(400).json({ message: "note is required" });
    if (!name) return res.status(400).json({ message: "name is required" });

    Lecturer.findOne({ mail }, (err, lecturer) => {
        if (err) return res.status(400).json(err);
        if (!lecturer) return res.status(400).json({ message: "no lecturer founded" });

        lecturer.vnumail = vnumail;
        if (birthday) lecturer.birthday = birthday;
        lecturer.phone = phone;
        lecturer.note = note;
        lecturer.name = name;
        if (password) lecturer.password = password;

        lecturer.save(err => {
            if (err) return res.status(400).json(err);

            return res.status(200).json({ message: "success" });
        })
    });
}

const getListStudentFollow = async (req, res) => {

    const { mail } = req.payload;
    if (!mail) return res.status(500).json({ message: 'internal error' });

    try {
        // const { listProject } = await Lecturer
        //     .findOne({ mail })
        //     .select('listProject')
        //     .populate({
        //         path: 'listProject',
        //         populate: {
        //             path: 'students.'
        //         }
        //     })
        //     .exec();

        const { listProject }
            = await Lecturer
                .findOne({ mail })
                .populate('listProject')
                .exec();

        const listId
            = listProject
                .map(p => p.students.map(s => s.studentId))
                .reduce((acc, cur) => [...acc, ...cur])
        console.log(listId)


        const students
            = await Student
                .find({ _id: { "$in": listId } })
                .exec();

        if (!students || !students.length)
            return res.status(404).json({ message: "no student found" });
        return res.status(200).json({ students });
    } catch (e) {
        return res.status(400).json(e);
    }


    // Lecturer.findOne({ mail }, (err, lecturer) => {
    //     if (err) return res.status(400).json(err);
    //     if (!lecturer) return res.status(500).json({ message: 'internal error' });

    //     const students = [];
    //     const listProject = lecturer.listProject;

    //     listProject.map(async (p) => {
    //         return new Promise((resolve, reject) => {
    //             try {
    //                 const project = await Project.findById(p).exec();
    //                 const listStudentId = project.students;
    //                 const _students = [];

    //                 listStudentId.forEach(async (s) => {
    //                     const student = await Student.findById(s.studentId).exec();


    //                 })
    //             } catch (e) {
    //                 reject(e);
    //             }
    //         })
    //     })


    // })

    // res.status(200).json({students});

}

const reviewReport = async (req, res) => {
    const { mail } = req.payload;

    try {
        const lecturer = await Lecturer
            .findOne({ mail })
            .populate('reports')
            .exec();

        if (!lecturer) return res.status(404).json({ message: 'not found' });

        const { reports } = lecturer;

        res.status(200).json({ reports });

    } catch (e) {
        return res.status(400).json(e);
    }
}

const inbox = async (req, res) => {
    const senderMail = req.payload.mail;
    const { receivMail, title, content } = req.body;

    if (!receivMail) return res.status(400).json({ message: 'mail is required' });
    if (!content) return res.status(400).json({ message: 'no thing have sent' });

    Person.findByMail(receivMail, (err, receiv) => {
        if (err) return res.status(400).json(err);
        if (!receiv) return res.status(400).json({ message: 'invalid mail' });

        Person.findByMail(senderMail, (err, sender) => {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(400).json({ message: 'wrong token' });

            sendDialog(sender._id, receiv._id, title, content, (err, message) => {
                if (err) return res.status(400).json(err);

                res.status(200).json(message);
            })
        })

    })


}

const reviewStudent = (req, res) => {
    const { studentId, internId } = req.body;
    console.log(req.body);

    if (!studentId) return res.status(400).json({ message: "student id is required" });
    if (!internId) return res.status(400).json({ message: 'intern id is requried' });

    Review
        .findOne({
            intern: internId,
            student: studentId
        }, (err, review) => {
            if (err) return res.status(400).json(err);
            if (!review) return res.status(404).json({ message: 'not found' });

            return res.status(200).json({ review });
        })
}

// const giveGrade = (req, res) => {
//     const { grade, internId, studentId } = req.body;

//     if (!studentId) return res.status(400).json({ message: "student id is required" });
//     if (!internId) return res.status(400).json({ message: 'intern id is requried' });
//     if (grade !== 0 && !grade) return res.status(400).json({ message: "grade is required" });

//     Review
//         .findOne({
//             intern: internId,
//             student: studentId
//         }, (err, review) => {
//             if (err) return res.status(400).json(err);
//             if (!review) return res.status(404).json({ message: 'not found' });

//             review.grade = grade;
//             review.save(e => {
//                 if (e) return res.status(400).json(e);

//                 res.status(200).json({ message: "success" });
//             })
//         })


// }

const giveGrade = (req, res) => {
    const {grade, studentId, comment} = req.body;

    if (!studentId) return res.status(400).json({ message: "student id is required" });
    if (!comment) return res.status(400).json({ message: "comment id is required" });
    if (grade !== 0 && !grade) return res.status(400).json({ message: "grade is required" });

    Student.findById(studentId, (err, stu) => {
        if(err) return res.status(400).json(err);
        if(!stu) return res.status(400).json({message: 'no student found'});

        stu.grade = grade;
        stu.comment = comment;
        stu.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: 'success'});
        })
    })
}

const genExcel = async (req, res) => {
    // const { mail } = req.payload;
    let mail;
    if(req.payload) mail = req.payload.mail;
    if (!mail) mail = req.query.mail;

    if (!mail) return res.status(400).json({ message: 'mail is required' });
    // const mail = 'le@gmail.com';

    try {


        const { listProject } = await Lecturer
            .findOne({ mail })
            .populate('listProject')
            .select('listProject')
            .exec();

        const students = await Student
            .find({})
            .select('name')
            .select('_id')
            .exec();

        const reviews = listProject
            .map(p => p.students)
            .reduce((acc, cur) => [...acc, cur]);

        //create data
        const data = [];
        for (let review of reviews) {
            for (let student of students) {
                if (review.studentId.toString() === student._id.toString())
                    data.push([student.name, review.grade, review.comment]);
            }
        }

        //create table
        const table = [['name', 'grade', 'comment'], ...data];
        const buffer = nodeXlsx.build([{ name: "namae", data: table }]);
        // res.write(buffer);
        // res.end();
        const filePath = path.join(__dirname, '..', '..', 'public', 'assets', 'temp.xlsx');
        const wStream = fs.createWriteStream(filePath);
        wStream.write(buffer);
        wStream.end();

        wStream.on('finish', async () => {
            
            //give admin a link
            
            const admin = await Admin.findOne({}).exec();
            if(!admin) return res.status(512);

            const link = `localhost:3000/api/lecturer/genExcel?mail=${mail}`;
            admin.listExcelReport.push(link);

            admin.save(e => {

                if(e) return res.status(400).json(e);

                res.download(filePath);
                del(filePath);
            })


            //download from client


            // res.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
            // res.end(new Buffer(buffer, 'base64'))
        })

        wStream.on('error', (e) => {
            console.log('err');
            res.status(400).json(e);
        })

    } catch (e) {
        res.status(400).json(e);
    }
}

const getInfo = async (req, res) => {
    const {mail} = req.payload;

    try {
        const lec = await Lecturer
            .findOne({mail})
            .populate('reports')
            .populate('listProject')
            .populate('listNotiF')
            .populate('listNotiF')
            .populate('listDialogReceive')
            .exec();

        if(!lec) return res.status(400).json({message: 'no lec found'});
        return res.status(200).json({lec})
    } catch (e) {
        res.status(400).json(e);
    }
}

module.exports = {
    listLec,
    updateInfo,
    getListStudentFollow,
    reviewReport,
    inbox,
    reviewStudent,
    giveGrade,
    genExcel
}

async function sendDialog(senderId, receiverId, title, content, callback) {
    const dialog = new Dialog({ sender: senderId, title, receiver: receiverId, content });
    dialog.save(async (err) => {
        if (err) return callback(err);

        try {
            let send = await Person.findById(senderId);
            let receiv = await Person.findById(receiverId);

            send.listDialogSend.push(dialog._id);
            receiv.listDialogReceive.push(dialog._id);

            await send.save(err => err ? callback(err) : null);
            receiv.save(err => err ? callback(err) : callback(null, { message: 'success' }));
        } catch (e) {
            callback(e);
        }
    })
}