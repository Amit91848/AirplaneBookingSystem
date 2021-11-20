const { UserSchema, TicketSchema } = require("../models/Model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = mongoose.model('UserModel', UserSchema);
const TicketModel = mongoose.model('TicketModel', TicketSchema);

async function saveTicketToDb(req, res) {
    try {
        let ticketObj = req.body;
        ticketObj["userId"] = req.session.user._id;
        const data = await TicketModel.create(ticketObj);
        res.json(JSON.stringify(data));
    } catch(err) {
        console.log(err);
    }
}

async function userSignup(req, res) {
    let userObj = req.body;
    const data = await UserModel.create(userObj);
    req.session.user = data;
    res.redirect('/homepage');
}

async function userLogin(req, res){
    let user = await UserModel.findOne({email: req.body.email});
    if(user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match){
            req.session.user = user;
            res.redirect('/homepage');
        } else {
            res.json({error: 'Invalid password'});
        }
    }
}

async function userLogout(req, res) {
    req.session.user = null;
    res.redirect('/homepage');
}

module.exports = {
    userSignup, userLogin, userLogout, saveTicketToDb
}