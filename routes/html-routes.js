var path = require("path");

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
    app.get("/life", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/love", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/death", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/inspiration", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/happiness", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/humor", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/hope", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/motivation", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/friendship", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tagSearch.html"));
    });
    app.get("/userQuoteCard", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/userQuoteCard.html"));
    });
    app.get('/register', (req, res) => {
        res.render('register', {});
    });
};




















