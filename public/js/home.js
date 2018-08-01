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
    $("#userSubmit").on("click", function (event) {
        event.preventDefault();
        let userName = $("#exampleInputEmail2").val().trim();
        let password = $("#exampleInputPassword2").val().trim();
        console.log(userName + " " + password)
        $.get("/api/signin", function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === userName && data[i].password === password) {
                    let id = data[i].id
                    localStorage.clear();
                    localStorage.setItem("id", id);
                    console.log("Succes!!")
                }
                else if (data[i].name != userName) {
                    console.log('Incorrect user name')
                }
                else if (data[i].password != password) {
                    console.log("Incorrect password")
                }

            }
        })
    })
    randomQuote();

})

