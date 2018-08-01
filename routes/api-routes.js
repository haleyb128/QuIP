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
        db.User.findAll().then(function (data){
            res.json(data);
        });
    });

    app.post("/api/createuser", function(req,res){
        db.User.create(req.body).then(function(data){
            res.json(data)
        })
    })

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

    app.get('/api/tagSearch', function(dbQuotes) {
        res.json(dbQuotes);
     });
   
   // app.get("/api/quotes/:category", function (req, res) {
   //     var query = {};
   // if (req.query.quotes) {
   //   query.quotes = req.query.category;
   // }
   //     db.quotes.findAll({
   //         where: query 
   //     }).then(function (dbquotes) {
   //         res.json(dbquotes);
   //     });
   // });
    
}
// let array = req.body;
// array.forEach(function(element){
//     db.Quote.create(element).then(function(data){
//         res.json(data)
// })

// })