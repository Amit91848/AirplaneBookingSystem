const express = require('express');
const app = express();
const { userSignup, userLogin, userLogout, saveTicketToDb } = require("./src/Controllers/Controller");
const session = require("cookie-session");
const { airports } = require("./src/Controllers/flight-details/airport-details");
const { details } = require("./src/Controllers/flight-details/flight-ticket-details");

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static('public/images'));
app.use(express.static('js'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'mySecret'
}));

app.get('/', (req, res) => {
    res.redirect('homepage');
});
app.get('/homepage', (req, res) => {
    if(req.session.user){
        res.render('homepage', {user: req.session.user, airports: airports});
    } else {
        res.render('homepage', {user:"", airports: airports});
    }
});

app.post("/signupAuth", userSignup);
app.post("/loginAuth", userLogin);
app.get("/logout", userLogout);
app.post("/saveTicketDataToDb", saveTicketToDb);

app.post("/search-flights", (req ,res) => {
    if(req.session.user){
        res.render('searchflights', {user: req.session.user, flightDetails: req.body, airports: airports, details: details});
    } else {
        res.render('homepage', {error: "Login first"});
    }
});
app.get("/search-flights", (req ,res) => {
    res.render('searchflights', {user: req.session.user, flightDetails: req.body, airports: airports});
});

app.get("/testOptions", (req, res) => {
    res.render('testOptions', {user: req.session.user, flightDetails: req.body, airports: airports, details: details});
});

app.post("/profile", (req, res) => {
    res.render('profile')
});

app.get("/profile", (req, res) => {
    res.render('profile', {user: req.session.user})
})

app.listen(5464, () => {
    console.log('Server started on http://localhost:5464');
});