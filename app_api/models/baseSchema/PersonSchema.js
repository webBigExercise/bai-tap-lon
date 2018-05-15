const name = 'person';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const util = require('util');

// const PersonSchema = function () {
//     Schema.apply(this, arguments);

//     this.add({
//         mail: {type: String, required: true, default: 'nah00'},
//         password: {type: String, required: true},

//         contact: {
//             name: {type: String, required: true},
//             birth: {type: Date, required: true},
//             hometown: {type: String, required: true}
//         }
//     })
// }

// util.inherits(PersonSchema, Schema);

// PersonSchema.plugin = (new Schema()).plugin.bind(PersonSchema);

// PersonSchema.plugin((schema, options) => {
//     schema.methods.generatePassword = function(){
//         return 'extend method successs';
//     }
// })

// PersonSchema.methods.generatePassword = function(){
//     return 'passwords';
// }


const PersonSchema = new Schema({
    mail: { type: String, required: true, default: 'nah00' },
    password: { type: String, required: true },
    listDialogSend: { type: [Schema.Types.ObjectId], default: [] },
    listDialogReceive: { type: [Schema.Types.ObjectId], default: [] },
    _hashAlready: { type: Boolean, default: false }

}, { discriminatorKey: '_type' });


PersonSchema.pre('save', function (next) {
    let self = this;

    if (self._hashAlready || !self.password) return next();

    bcrypt.genSalt((err, salt) => {
        if (err) return next(err);

        bcrypt.hash(self.password, salt, (err, hash) => {
            if (err) return next(err);

            self.password = hash;
            self._hashAlready = true;
            next();
        })
    })
})

PersonSchema.methods.comparePassword = function (password, callback) {
    let self = this;

    bcrypt.compare(password, self.password, (err, same) => {
        if (err) callback(err);
        else callback(null, same);
    })
}

PersonSchema.methods.changePassword = function (newPassword) {
    this._hashAlready = false;
    this.password = newPassword;
}

PersonSchema.methods.generateJwt = function (more) {

    let self = this;

    return jwt.sign({
        mail: self.mail,
        _type,
        more
    }, process.env.JWT_SECRET)
}

module.exports = PersonSchema;