var path = require("path");
var Passport = require('passport');
var LocalStrategy = require('passport-local');

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/favorites", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/favorites.html"));
    });

    app.get("/about", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"));
    });

    app.get("/quoteCard", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/quoteCard.html"));
    });

    app.get("/tagSearch", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });

    app.get("/userQuoteCard", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/userQuoteCard.html"));
    });

    app.get('/register', (req, res) => {
        res.render('register', {});
    });

    app.post('/register', (req, res, next) => {
        Account.register(new Account({ username: req.body.username }), req.body.password, (err, account) => {
            if (err) {
                return res.render('register', { error: err.message });
            }

            passport.authenticate('local')(req, res, () => {
                req.session.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        });
    });


    app.get('/login', (req, res) => {
        res.render('login', { user: req.user, error: req.flash('error') });
    });

    app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });

    app.get('/logout', (req, res, next) => {
        req.logout();
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });

    app.get('/ping', (req, res) => {
        res.status(200).send("pong!");
    });

};




















