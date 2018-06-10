const Admin = require('../models/admin');

const updateInfo = (req, res) => {
    const { mail } = req.payload;

    const {name, vnumail, gmail, password, phoneNum} = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });
    if (!vnumail) return res.status(400).json({ message: "vnumail is required" });
    if (!gmail) return res.status(400).json({ message: "gmail is required" });
    if (!password) return res.status(400).json({ message: "password is required" });
    if (!phoneNum) return res.status(400).json({ message: "phoneNum is required" });

    Admin.findOne({mail}, (err, admin) => {
        if(err) return res.status(400).json(err);
        if(!admin) return res.status(400).json({message: 'no admin is founded'});

        admin.name = name;
        admin.vnumail = vnumail;
        admin.gmail = gmail;
        admin.password = password;
        admin.phoneNum = phoneNum;

        admin.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: 'success'});
        })
    })
}

module.exports = {
    updateInfo
}