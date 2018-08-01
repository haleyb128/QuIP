//not done! dont know if works!
$(document).ready(function () {
    function searchQuotes() {
        $.get("/api/quotes", function (data) {
            for (let i = 0; i < data.length; i++) {
                if (i === data[i].Quote) {
                    console.log(data[i])
                    $("#quote-full").text(data[i].Quote)
                    $("#author-name").text(data[i].Author)
                    $("#quote-full2").text(data[i].Quote)
                    $("#author-name2").text(data[i].Author)
                }
            }
        });
    }
    searchQuotes();
});