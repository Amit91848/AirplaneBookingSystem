const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const db_link = "mongodb+srv://amit:kHG0kHX1S8KhuSuB@cluster0.tdjc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const bcrypt = require('bcrypt');

mongoose.connect(db_link)
    .then(() => {
        console.log("Db connected");
    })
    .catch((err) => {
        console.log(err);
    });

const UserSchema = mongoose.Schema({
    name: {
        type: 'string',
        require: 'true'
    },
    email: {
        type: 'string',
        require: 'true',
        unique: 'true', 
        validate: function() {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: 'string',
        require: 'true',
        minLength: 8
    },
    mobileNumber: {
        type: String,
        minLength: 10,
        maxLength: 10,
    },
    birthDay: {
        type: String,
    },
    Gender: {
        type: String,
    },
    maritalStatus: {
        type: String,
    }
});

const TicketSchema = mongoose.Schema({
    logo: {
        type: String,
        require: true
    },
    arr: {
        type: String,
        require: true
    },
    dep: {
        type: 'object',
        require: true
    },
    price: {
        type: String,
        require: true
    },
    no: {
        type: String,
        require: true
    },
    arrPlace: {
        type: String,
        require: true
    },
    depPlace: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
});

UserSchema.pre('save', async function() {
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString;
});

// password = $2b$10$ZR4AAioWXLbjCtTN5.VAu.eJMGIQ1hPBWUGyCluVKTYjwIitQkmH2


module.exports = {
    UserSchema, TicketSchema
}