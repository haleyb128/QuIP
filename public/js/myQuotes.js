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
                alert("WRONG NAME")
            }
            else if (userObj.password != password) {
                alert("WRONG PASSWORD")
            }
        })
    })
    $("#addQuote").on("click", function (event) {
        event.preventDefault();
        let quote = $("#add-body").val().trim();
        let author = $("#add-author").val().trim();
        let cat = $("#select-category").val().trim();
        let subCat = $("#select-subcategory").val().trim();
        console.log(quote)
        console.log(author)
        console.log(cat)
        console.log(subCat)
        $.post("api/favorites", {
            Quote: quote,
            Author: author,
            Category: cat,
            Subcategory: subCat,
            LoginId: loginID
        }).then(function(){
            location.reload();
        })
    })
})