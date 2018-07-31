var db = require("../models");

module.exports = function (app) {
    app.get("/api/quotes", function (req, res) {
        db.Quote.findAll().then(function (data) {
            res.json(data)
        })
    });
    app.post("/api/quotes", function (req, res) {
        db.Quote.create(req.body).then(function (data) {
            res.json(data)
        })
    });

    app.get('/signin', function (req, res) {
        res.render('signin');
    });

    // app.post('/login', passport.authenticate('local-signin', {
    //     successRedirect: '/favorites',
    //     failureRedirect: '/signin'
    // })
    // );

    app.get('/logout', function (req, res) {
        var name = req.user.username;
        console.log("LOGGIN OUT " + req.user.username)
        req.logout();
        res.redirect('/');
        req.session.notice = "You have successfully been logged out " + name + "!";
    });

    //add favorites to username profile
    app.get('/api/favorites/:username', function (req, res) {
        var query = {};
        if (req.query.username) {
            query.users = req.query.username;
        }
        db.Favorites.findAll({
            where: query
        }).then(function (dbFavorites) {
            res.json(dbFavorites);
        });
    });
    app.delete("/api/favorites/:username", function (req, res) {
        db.Favorites.destroy({
            where: {
                id: req.params.id
            },
            include: [db.Quotes]
        }).then(function (dbFavorites) {
            res.json(dbFavorites);
        });
    });
    app.post("/api/favorites/:username", function (req, res) {
        const data = {
            body: req.body.body,
            AuthorID: req.body.AuthorID

        }
        db.Favorites.create(data).then(function (dbFavorites) {
            res.json(dbFavorites);
        });
    });

}
// let array = req.body;
// array.forEach(function(element){
//     db.Quote.create(element).then(function(data){
//         res.json(data)
// })

// })