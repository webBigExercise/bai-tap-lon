const Partner = require('../models/partner');


const updateInfo = (req, res) => {
    const { mail } = req.payload;

    const {name, info, password} = req.body;

    if(!name) return res.status(400).json({message: 'name is required'});
    if(!info) return res.status(400).json({message: 'info is required'});

    Partner.findOne({mail}, (err, partner) => {
        if(err) return res.status(400).json(err);
        if(!partner) return res.status(400).json({message: 'no partner found'});

        partner.info = info;
        partner.name = name;
        if(password) partner.password = password;

        partner.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: 'success'});
        })
    })

}

module.exports = {
    updateInfo
}