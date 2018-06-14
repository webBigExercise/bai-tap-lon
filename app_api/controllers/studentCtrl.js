const path = require('path');
const fs = require('fs');
const del = require('del');
const SERVER = 'locahost:3000';

const Student = require('../models/student');
const Project = require('../models/project');
const InternNotif = require('../models/internNotif');
const Dialog = require('../models/dialog');
const Person = require('../models/person');
const Admin = require('../models/admin');
const Report = require('../models/report');
const Review = require('../models/review');
const Lecturer = require('../models/lecturer');

const getInfo = async (req, res) => {
    const { mail } = req.payload;

    //just to make sure
    //but perhaps this line will never be invorked
    if (!mail) return res.status(400).json({ message: 'mail is required' });

    try {
        const student = await Student
        .findOne({mail})
        .populate('listDialogSend')
        .populate('notifFollow')
				.populate('reports')
        .exec();

    if(! student) return res.status(404).json({message: 'no student founded'});
    return res.status(200).json({student});
    } catch (e ) {
        res.status(400).json(e)
    }

    // Student.findOne({ mail }, (err, student) => {
    //     if (err) return res.status(400).json(err);
    //     if (!student) return res.status(400).json({ message: 'student is not found' });
    //     res.status(200).json({student});

    //     // const { MSSV,
    //     //     name,
    //     //     birth,
    //     //     address,
    //     //     classroom,
    //     //     startYear,
    //     //     speciality,
    //     //     // vnuMail : {type: String, required: true},
    //     //     averageGrade,
    //     //     granduatedYear,

    //     //     //user manage 
    //     //     avatar,
    //     //     privateEmail,
    //     //     skypeID,
    //     //     facebook,
    //     //     phoneNumber,
    //     //     EnglishSkill,
    //     //     diploma,
    //     //     expreneced,
    //     //     wantToBe,
    //     //     note } = student;

    //     // res.status(200).json({
    //     //     MSSV,
    //     //     name,
    //     //     birth,
    //     //     address,
    //     //     classroom,
    //     //     startYear,
    //     //     speciality,
    //     //     // vnuMail : {type: String, required: true},
    //     //     averageGrade,
    //     //     granduatedYear,

    //     //     //user manage 
    //     //     avatar,
    //     //     privateEmail,
    //     //     skypeID,
    //     //     facebook,
    //     //     phoneNumber,
    //     //     EnglishSkill,
    //     //     diploma,
    //     //     expreneced,
    //     //     wantToBe,
    //     //     note
    //     // })
    // })
}

const updateInfo = (req, res) => {
    const { mail } = req.payload;

    //just to make sure
    //but perhaps this line will never be invorked
    if (!mail) return res.status(400).json({ message: 'mail is required' });
    const {
        avatar,
        privateEmail,
        skypeID,
        facebook,
        phoneNumber,
        EnglishSkill,
        diploma,
        expreneced,
        wantToBe,
        note,
        // skills
    } = req.body;

    if (!avatar) return res.status(400).json({ message: 'avatar missed' });
    if (!privateEmail) return res.status(400).json({ message: 'privateEmail missed' });
    if (!skypeID) return res.status(400).json({ message: 'skypeID missed' });
    if (!facebook) return res.status(400).json({ message: 'facebook missed' });
    if (!phoneNumber) return res.status(400).json({ message: 'phoneNumber missed' });
    if (!EnglishSkill) return res.status(400).json({ message: 'EnglishSkill missed' });
    if (!diploma) return res.status(400).json({ message: 'diploma missed' });
    if (!expreneced) return res.status(400).json({ message: 'expreneced missed' });
    if (!wantToBe) return res.status(400).json({ message: 'wantToBe missed' });
    if (!note) return res.status(400).json({ message: 'note missed' });
    // if (!skills) return res.status(400).json({ message: 'skills missed' });

    Student.findOne({ mail }, (err, student) => {

        if (err) return res.status(400).json(err);
        if (!student) return res.status(400).json({ message: 'no student founded' });

        student.avatar = avatar;
        student.privateEmail = privateEmail;
        student.skypeID = skypeID;
        student.facebook = facebook;
        student.phoneNumber = phoneNumber;
        student.EnglishSkill = EnglishSkill;
        student.diploma = diploma;
        student.expreneced = expreneced;
        student.wantToBe = wantToBe;
        student.note = note;
        // student.skills = skills;



        student.save(err => {
            if (err) return res.status(400).json(err);

            return res.status(200).json({ message: 'update sucess' });
        })
    })
}

const getSkill = (req, res) => {
    const { mail } = req.payload;

    Student.findOne({ mail }, (err, student) => {
        if (err) return res.status(400).json(err);

        const { skills, projects } = student;

        Project
            .find({
                _id: { $in: projects.map(p => toObjectId(p)) },
                // _id: "5adecb5edcdd621678cc1e32"
            })
            // .select('name')
            .exec((err, resp) => {
                if (err) return res.status(400).json(err);
                if (!resp || !resp.length) return res.status(400).json({ message: 'no project founded' });

                res.status(200).json({
                    projects: resp.map(p => p.name),
                    skills
                })
            })

    })
}

const findNotif = (req, res) => {
    const { title, ownerId } = req.body;

    if (!title && !ownerId) return res.status(400).json({ message: ' title or owner must be filled' });

    if (!ownerId) {
        InternNotif
            .find({ title }, (err, notifs) => sendToClient(err, notifs))
    } else {

        let query = InternNotif.find({ ownerId });
        if (title) query = query.find({ title });

        query.exec((err, notifs) => sendToClient(err, notifs));

    }




    function sendToClient(err, notifs) {
        if (err) return res.status(400).json(err);

        if (!notifs || !notifs.length) return res.status(400).json({ message: 'no content founded' });

        return res.status(200).json({ notifs });
    }
}

const allNotif = async (req, res) => {
    try {
        const notifs = await InternNotif
        .find({})
        .populate('ownerId')
        .exec();

        if(!notifs || !notifs.length) return res.status(400).json({message: 'no notifs'})
        return res.status(200).json({notifs})
    } catch (e) {
        res.status(400).json(e);
    }
}

const chooseLecturer = async (req, res) => {
    const {mail} = req.payload;
    const lecId = req.body;

    if(!lecId) return res.status(400).json({message: 'lecId is required'})

    try {
        let student = await Student.findOne({mail}).exec();
        
        if(student.lecturer) return res.status(400).json({message: 'already asign for a lecturer'});

        student.lecturer = lecId;
        await student.save();

        res.status(200).json({message: 'success'});

    } catch (e) {
        res.status(400).json(e);
    }
}

const asignForIntern = (req, res) => {
    const studentMail = req.payload.mail;
    const internNotifId = req.query.id;

    if (!internNotifId) return res.status(400).json({ message: 'id is required' });

    Student
        .findOne({ mail: studentMail }, (err, student) => {

            if (err) return res.status(400).json(err);


            InternNotif.findById(internNotifId, async (err, internNotif) => {

                if (err) return res.status(400).json(err);
                if (!internNotif) return res.status(400).json({ message: 'no intern founded' });
                if (checkIncludes(internNotif.followers, student._id))
                    return res.status(400).json({ message: 'already follow this intern' });


                //if partner use system
                internNotif.followers.push(student._id);
                student.notifFollow.push(internNotif._id);

                try {
                    await internNotif.save();
                    await student.save();
                } catch(e) {
                    return res.status(400).json(e);
                }

                const emailContent = `
                sinh vien: ${student.name},
                MSSV : ${student.MSSV},
                class: ${student.classroom},
                phone-number: ${student.phoneNumber}
            `

                if (!internNotif.ownerId) {

                    //gui thong tin den admin
                    Admin.findOne({}, (err, admin) => {
                        const adminId = admin._id;
                        const title = 'RECRUIT FORM';
                        sendDialog(student._id, adminId, title, emailContent, (err, message) => {
                            if (err) res.status(400).json(err);
                            else res.status(200).json(message);
                        })
                    });

                } else {
                    const title = 'RECRUIT FORM';
                    sendDialog(student._id, internNotif.ownerId, title, emailContent, (err, message) => {
                        console.log(err);
                        if (err) res.status(400).json(err);
                        else res.status(200).json(message);
                    })
                }
            })
        })


}


const inbox = (req, res) => {
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

const sendBriefReport = (req, res) => {
    const senderEmail = req.payload.mail;
    const { receivMail, content } = req.body;

    if (!receivMail) res.status(400).json({ message: "receive mail is required" });
    if (!content) res.status(400).json({ message: "content is required" });

    Student
        .findOne({ mail: senderEmail }, (err, student) => {
            if (err) return res.status(400).json(err);
            if (!student) return res.status(404).json({ message: "no student founded" });

            console.log('no err in student');

            Person.findByMail(receivMail, (err, receiver) => {
                if (err) return res.status(400).json(err);
                if (!receiver) return res.status(400).json({ message: 'wrong receiver' });

                const newReport = new Report({
                    sender: student._id,
                    receiver: receiver._id,
                    content
                })

                newReport.save(e => {
                    if (e) return res.status(400).json(e);

                    student.reports.push(newReport._id);

                    student.save(e => {

                        if (e) return res.status(400).json(e);

                        receiver.reports.push(newReport._id);

                        receiver.save(e => {
                            if (e) return res.status(400).json(e);

                            res.status(200).json({
                                message: "sending sucess"
                            })
                        })

                    })
                })
            })
        })
}

const sendFullReport = (req, res) => {
    const senderMail = req.payload.mail;
    const { receivMail } = req.body;
    const file = req.file;


    if (!receivMail) res.status(400).json({ message: "receive mail is required" });
    if (!file) res.status(400).json({ message: "content is required" });

    const rootApp = path.dirname(require.main.filename);

    const tmpPath = file.path;
    console.log(tmpPath);
    const destPath = path.join(rootApp, '..', 'assets', file.originalname);
    console.log(destPath);

    saveFile();

    //copy to dest
    function saveFile() {
        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(destPath);

        console.log('dfjlasd')

        src.pipe(dest);

        src.on('end', () => {
            del(tmpPath)
                .then(() => {
                    const docLink = `${SERVER}/assets/${file.originalname}`;
                    // saveReport(res, senderMail, receivMail, '', docLink);

                    // res.status(200).json({ message: 'upload success' });

                    Student
                        .findOne({ mail: senderMail }, (err, student) => {
                            if (err) return res.status(400).json(err);
                            if (!student) return res.status(404).json({ message: "no student founded" });

                            Person.findByMail(receivMail, (err, receiver) => {
                                if (err) return res.status(400).json(err);
                                if (!receiver) return res.status(400).json({ message: 'wrong receiver' });

                                const newReport = new Report({
                                    sender: student._id,
                                    receiver: receiver._id,
                                    docLink
                                })

                                newReport.save(e => {
                                    if (e) return res.status(400).json(e);

                                    student.reports.push(newReport._id);

                                    student.save(e => {

                                        if (e) return res.status(400).json(e);

                                        receiver.reports.push(newReport._id);

                                        receiver.save(e => {
                                            if (e) return res.status(400).json(e);

                                            res.status(200).json({
                                                message: "sending sucess"
                                            })
                                        })

                                    })
                                })
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({ message: 'internal error' });
                    // console.log(err);
                    // res.status(400).json(err);
                })
        })

        src.on('error', err => res.status(500).json({ message: 'internal error' }));

    }
}

const seeReview = (req, res) => {
    const { mail } = req.payload;
    const { intern } = req.query;

    if (!intern) return res.status(400).json({ message: 'intern is required' });


    Student.findOne({ mail }, (err, student) => {
        if (err || !student)
            return res.status(500).json({ message: 'internal error' });

        Review.findOne({
            intern,
            student: student._id
        }, (err, review) => {
            if(err) return res.status(400).json(err);
            if(!review) return res.status(404).json({message: 'no review'});

            return res.status(200).json(review);
        })

    })
}

module.exports = {
    getInfo,
    updateInfo,
    getSkill,
    findNotif,
    asignForIntern,
    inbox,
    sendBriefReport,
    sendFullReport,
    seeReview,
    allNotif,
    chooseLecturer
};



//helper
function toObjectId(str) {
    const ObjectId = require('mongoose').Types.ObjectId;

    return new ObjectId(str);
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

function checkIncludes(arr, el) {
    const _arr = arr.map(e => e.toString());
    const _el = el.toString();

    return _arr.includes(_el);
}