var db = require("../models");

module.exports = function(app){
    app.get("/api/quotes", function(req, res){
        db.Quote.findAll().then(function(data){
            res.json(data)
        })
    })
    app.post("/api/quotes", function(req, res){
        db.Quote.create(req.body).then(function(data){
            res.json(data)
        })
    })

    
}
// let array = req.body;
// array.forEach(function(element){
//     db.Quote.create(element).then(function(data){
//         res.json(data)
// })

// })