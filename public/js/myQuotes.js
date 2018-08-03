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
                $('#userModal').modal("show")
            }
            else if (userObj.password != password) {
                $('#passwordModal').modal("show")
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
        if (loginID == 0) {
            $('#loginModal').modal("show")
        }
        else {
            $.post("/api/addquote", {
                Quote: quote,
                Author: author,
                Category: cat,
                Subcategory: subCat,
                UserId: loginID
            }).then(function () {
                location.reload();
            })
        }
    })
    function getUserQuotes() {
        $.get("/api/quotes/" + loginID, function (data) {
            for (let i = 0; i < data.length; i++) {
                let newli = $("<li>")
                newli.addClass("list-group-item")
                newli.attr("id", "user-quote" + i)
                let newp = $("<p>")
                newp.addClass("mb-1")
                newp.text(data[i].Quote)
                newli.append(newp)
                let newh5 = $("<h5>")
                newh5.addClass("mb-1")
                newh5.text(data[i].Author)
                newli.append(newh5)
                let newbutton = $("<button>")
                newbutton.addClass("destroy")
                newbutton.attr("data-id", data[i].id)
                newbutton.text("Delete this quote")
                newli.append(newbutton)
                $("#user-quotes").append(newli)
            }
        })
    }
    getUserQuotes();

    $(".my-quotes-list").on("click", ".destroy", function (event) {
        event.preventDefault();
        let destroyId = $(this).data("id")
        $.ajax({
            url: '/api/destroy/' + destroyId,
            type: 'DELETE',
            success: function (result) {
                console.log(result)
                location.reload();
            }
        });
    })
})