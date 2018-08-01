$(document).ready(function () {
    function randomQuote() {
        $.get("/api/quotes", function (data) {
            let randomNum = Math.floor(Math.random() * data.length)
            for (let i = 0; i < data.length; i++) {
                if (i === randomNum) {
                    console.log(data[i])
                    $("#quote-full").text(data[i].Quote)
                    $("#author-name").text(data[i].Author)
                    $("#quote-full2").text(data[i].Quote)
                    $("#author-name2").text(data[i].Author)
                }
            }
        })
    }
    randomQuote();
})

