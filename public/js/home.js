$(document).ready(function () {
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
                    // localStorage.setItem("id", "0")
                    // loginID = localStorage.getItem("id")
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
        let compareName;
        let comparePass;
        let id;
        let userObj = {
            id: "",
            name: "",
            password: "",
        };
        console.log(userName + " " + password)
        $.get("/api/signin", function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === userName) {
                    id = data[i].id;
                    compareName = data[i].name;
                    comparePass = data[i].password;
                    userObj = {
                        id: id,
                        name: compareName,
                        password: comparePass
                    }
                    console.log(userObj)
                    return userObj;
                }
            }
        }).then(function () {
            console.log(userObj)
            if (userObj.name === userName && userObj.password === password) {
                localStorage.clear();
                localStorage.setItem("id", userObj.id);
                console.log("Succes!!")
                location.reload();
            }
            else if (userObj.name != userName) {
                $('#userModal').modal("show")
            }
            else if (userObj.password != password) {
                $('#passwordModal').modal("show")
            }

        })
    })
    $(".categories").on("click", function(event){
        event.preventDefault();
        let search = $(this).data("id");
        localStorage.setItem("category", search)
        window.location.href = "/" + search
    })
    randomQuote();

})

