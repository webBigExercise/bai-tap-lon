const Partner = require('../models/partner');
const InternNotif = require('../models/internNotif');
const Person = require('../models/person');
const Student = require('../models/student');


const updateInfo = (req, res) => {
    const { mail } = req.payload;

    const { name, info, password } = req.body;

    if (!name) return res.status(400).json({ message: 'name is required' });
    if (!info) return res.status(400).json({ message: 'info is required' });

    Partner.findOne({ mail }, (err, partner) => {
        if (err) return res.status(400).json(err);
        if (!partner) return res.status(400).json({ message: 'no partner found' });

        partner.info = info;
        partner.name = name;
        if (password) partner.password = password;

        partner.save(e => {
            if (e) return res.status(400).json(e);

            return res.status(200).json({ message: 'success' });
        })
    })

}

const postIntern = (req, res) => {
    const { mail } = req.payload;
    const { content, title, startTime, endTime } = req.body;

    if (!mail) return res.status(400).json({ message: 'partner is not founded' });
    if (!content) return res.status(400).json({ message: 'content is not founded' });
    if (!title) return res.status(400).json({ message: 'title is not founded' });
    if (!startTime) return res.status(400).json({ message: 'startTime is not founded' });
    if (!endTime) return res.status(400).json({ message: 'endTime is not founded' });

    Partner.findOne({ mail }, (err, partner) => {
        if (err) return res.status(400).json(err);
        if (!partner) return res.status(400).json({ message: 'partner is not founded' });

        const newIntern = new InternNotif({
            content, title, startTime, endTime,
            ownerId: partner._id
        });

        newIntern.save(e => {
            if (e) return res.status(400).json(e);

            return res.status(400).json({ message: 'success' });
        })
    })

}

const editIntern = (req, res) => {
    const { mail } = req.payload;
    const { id, content, title, startTime, endTime } = req.body;

    if (!mail) return res.status(400).json({ message: 'partner is not founded' });
    if (!id) return res.status(400).json({ message: 'id is required' });

    InternNotif.findById(id, (err, intern) => {
        if (err) return res.status(400).json(err);
        if (!intern) return res.status(404).json({ message: 'intern is not founded' });

        if (Date.now() >= intern.endTime) return res.status(400).json({ message: 'time is expired' });

        if (content) intern.content = content;
        if (title) intern.title = title;
        if (startTime) intern.startTime = startTime;
        if (endTime) intern.endTime = endTime;

        intern.save(e => {
            if (e) return res.status(400).json(e);

            return res.status(200).json({ message: 'success' });
        })

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

const allStudentInIntern = async (req, res) => {
    const { mail } = req.payload;

    if (!mail) return res.status(400).json({ message: 'partner is not founded' });

    try {

        const partner = await Partner
            .findOne({ mail })
            .populate('listProject')
            .exec();

        
        if(!partner) return res.status(404).json({message: 'not founded partner'});

        const listStudentId = partner.listProject
            .map(p => p.students)
            .reduce((pre, cur) => [...pre, ...cur])
            .map(s => s.studentId);

        const listStudent = await Student
            .find({_id: {$in: listStudentId}})
            .select('name')
            .exec();

        if(!listStudent || !listStudent.length) 
            return res.status(404).json({message: 'no student is in this partner \' project '});
        
        return res.status(200).json({listStudent});
        

    } catch (e) {
        if (e) return res.status(400).json(e);
    }
}

module.exports = {
    updateInfo,
    postIntern,
    editIntern,
    inbox,
    allStudentInIntern
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