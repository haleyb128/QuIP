$(document).ready(function(){
    let loginID = localStorage.getItem("id")
    console.log(loginID)
    function loginCheck() {
        $.get("/api/signin", function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == loginID) {
                    $("#userState").text("Logout");
                    $("#userStateIn").hide();
                    $("#userStateOut").show();
                    break
                }
                else {
                    $("#userState").text("Login");
                    $("#userStateOut").hide();
                    $("#userStateIn").show();
                }
            }
        })
    }
    loginCheck();
    $("#logOut").on("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        localStorage.setItem("id", "0");
        location.reload();
    })
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
})