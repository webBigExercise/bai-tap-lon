const Admin = require('../models/admin');
const Student = require('../models/student');
const Lecturer = require('../models/lecturer');
const Partner = require('../models/partner');
const InternNotif = require('../models/internNotif');
const Review = require('../models/review');

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

const allStudent = (req, res) => {
    Student.find((err, students) => {
        if (err) return res.status(400).json(err);

        res.status(200).json({ students });
    })
}

const allLecturer = (req, res) => {
    Lecturer.find((err, lecturers) => {
        if (err) return res.status(400).json(err);

        res.status(200).json({ lecturers });
    })
}

const allPartner = (req, res) => {
    Lecturer.find((err, partners) => {
        if (err) return res.status(400).json(err);

        res.status(200).json({ partners });
    })
}

const creatStudent = (req, res) => {
    const { mail, password } = req.body;

    if (!mail) return res.status(400).json({ message: 'mail is required' });
    if (!password) return res.status(400).json({ message: 'password is required' });

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

        if (e) return res.status(500).json(e);

        return res.status(200).json({ message: "success" });
    })

}

const createLecturer = (req, res) => {
    const { mail, password } = req.body;

    if (!mail) return res.status(400).json({ message: 'mail is required' });
    if (!password) return res.status(400).json({ message: 'password is required' });

    const newLecturer = new Lecturer();
    newLecturer.mail = mail;
    newLecturer.password = password;
    newLecturer.birthday = Date.now();
    newLecturer.name = 'x';

    newLecturer.save(e => {
        if (e) return res.status(500).json(e);

        return res.status(200).json({ message: 'success' });
    })
}

const createPartner = (req, res) => {
    const { mail, password } = req.body;

    if (!mail) return res.status(400).json({ message: 'mail is required' });
    if (!password) return res.status(400).json({ message: 'password is required' });

    const newPartner = new Partner();
    newPartner.mail = mail;
    newPartner.password = password;
    newPartner.name = 'x';
    newPartner.info = 'x';

    newPartner.save(e => {
        if (e) return res.status(500).json(e);

        return res.status(200).json({ message: 'success' });
    })
}

const deleteStudent = (req, res) => {
    const { mail } = req.body;

    Student.findOneAndRemove({ mail }, (err, resp) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({ message: 'success' });
    });
}

const deleteLecturer = (req, res) => {
    const { mail } = req.body;

    Lecturer.findOneAndRemove({ mail }, (err, resp) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({ message: 'success' });
    });
}

const deletePartner = (req, res) => {
    const { mail } = req.body;

    Lecturer.findOneAndRemove({ mail }, (err, resp) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({ message: 'success' });
    });
}

const allIntern = (req, res) => {
    InternNotif.find((err, internNotifs) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({ internNotifs });
    })
}

const delIntern = (req, res) => {
    const id = req.body.id;

    InternNotif.findOneAndRemove({ _id: id }, (err, resp) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({ message: 'success' });
    })
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

const filterReview = async (req, res) => {
    const { partner, lecturer, student } = req.query;

    try {

        let reviews = await Review
            .find({})
            .populate('intern')
            .populate('student')
            .exec();

        reviews = reviews.filter(r => {

            if (student && r.student.name !== student) return false;
            if (lecturer && r.student.lecturer !== lecturer) return false;

            return true;
        });

        if (partner) {

            const listPartnerId = reviews
                .map(r => r.intern)
                .map(intern => intern.ownerId);

            const listPartner = await Partner
                .find({ _id: { $in: listPartnerId } })
                .select('name')
                .exec();

            const initDictVal = {};
            initDictVal[listPartner[0]._id] = listPartner[0].name;

            const idToNameDict = listPartner
                .reduce((pre, cur) => {
                    const {_id, name} = cur;
                    pre[_id] = name;

                    return pre;
                }, initDictVal);

            reviews = reviews.filter(r => idToNameDict[r.intern.ownerId] === partner);

                

            res.send(reviews);

        } else {

            res.status(200).send(reviews);

        }


    } catch (e) {
        res.status(400).json(e);
    }

}

const asignLecForStu = async (req, res) => {
    const {stuId, lecId} = req.body;

    const stu = await Student.findById(stuId).exec();
    if(stu.lecturer) {
        res.status(400).json({message: 'This student has already managed by a lecturer'});
    } else {
        stu.lecturer = lecId;
        stu.save(e => {
            if(e) res.status(400).json(e);
            else res.status(200).json({message: 'success'});
        })
    }

}



module.exports = {
    updateInfo,
    creatStudent,
    createLecturer,
    createPartner,
    deleteStudent,
    deleteLecturer,
    deletePartner,
    allStudent,
    allLecturer,
    allPartner,
    allIntern,
    delIntern,
    inbox,
    filterReview, 
    asignLecForStu
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