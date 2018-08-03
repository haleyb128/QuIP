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

    app.get('/api/signin', function (req, res) {
        db.User.findAll().then(function (data) {
            res.json(data);
        });
    });

    app.post("/api/createuser", function (req, res) {
        db.User.create(req.body).then(function (data) {
            res.json(data)
        })
    })
    app.get("/api/quotes/:id", function (req, res) {
        let query = req.params.id
        db.Quote.findAll({
            where: {
                UserId: query
            }
        }).then(function (quotes) {
            res.json(quotes)
        })
    })
    app.get("/api/categories/:id", function (req, res) {
        let query = req.params.id
        db.Quote.findAll({
            where: {
                Category: query
            }
        }).then(function (quotes) {
            res.json(quotes)
        })
    })
    app.get("/api/favorites/:username", function (req, res) {
        let query = parseInt(req.params.username)
        db.Favorite.findAll({
            where: {
                UserId: query
            }
        }).then(function (dbquotes) {
            res.json(dbquotes);
        });
    });
    app.delete("/api/favorites/:id", function (req, res) {
        db.Favorite.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbFavorites) {
            res.json(dbFavorites);
        });
    });
    app.post("/api/favorites/", function (req, res) {
        db.Favorite.create(req.body).then(function (data) {
            res.json(data)
        })
    })
    app.post("/api/addquote", function (req, res) {
        db.Quote.create(req.body).then(function (data) {
            res.json(data)
        })
    })
    app.delete("/api/destroy/:id", function (req, res) {
        db.Quote.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        })
    })
    app.get("/api/quotes/:category", function (req, res) {
        let query = req.params.category
        db.Quote.findAll({
            where: {
                Category: query
            }
        }).then(function (dbquotes) {
            res.json(dbquotes);
        });
    });
    app.post("/api/joesmagicalroute", function (req, res) {
        let array = req.body;
        array.forEach(function (element) {
            db.Quote.create(element).then(function (data) {
                res.json(data)
            })
        });
    })
}
