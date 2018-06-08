const Partner = require('../models/partner');
const Intern = require('../models/internNotif');


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

        const newIntern = new Intern({
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
    const { id,content, title, startTime, endTime } = req.body;

    if (!mail) return res.status(400).json({ message: 'partner is not founded' });
    if(!id) return res.status(400).json({message: 'id is required'});

    Intern.findById(id, (err, intern) => {
        if(err) return res.status(400).json(err);
        if(!intern) return res.status(404).json({message: 'intern is not founded'});

        if(content) intern.content = content;
        if(title) intern.title = title;
        if(startTime) intern.startTime = startTime;
        if(endTime) intern.endTime = endTime;

        intern.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: 'success'});
        })

    })
}

module.exports = {
    updateInfo,
    postIntern,
    editIntern
}