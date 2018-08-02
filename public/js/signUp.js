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
    $("#signUp").on("click", function (event) {
        event.preventDefault();
        let name = $("#sign-username").val().trim();
        let password = $("#sign-password").val().trim();
        let compareName;
        $.get("/api/signin", function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === name) {
                    compareName = name;
                    return compareName;
                }
            }
        }).then(function () {
            console.log(name)
            console.log(compareName)
            if (compareName === name) {
                alert("Name taken!")
            }
            else {
                $.post("/api/createuser", {
                    name: name,
                    password: password
                }).then(function () {
                    $.get("/api/signin", function (data) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].name === name) {
                                localStorage.clear();
                                localStorage.setItem("id", data[i].id);
                                console.log("SUCCESS!")
                            }
                        }
                    }).then(function () {
                        window.location.href = "/"
                    })
                })
            }
        })
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
                window.location.href = "/"
            }
            else if (userObj.name != userName) {
                $('#userModal').modal("show")
            }
            else if (userObj.password != password) {
                $('#passwordModal').modal("show")
            }
        })
    })
})