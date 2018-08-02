$(document).ready(function () {
    let divID = 0;
    let i = 0;
    let k = 2
    let loginID = localStorage.getItem("id")
    let search = localStorage.getItem("category")
    console.log(search)
    console.log(loginID)
    function loginCheck() {
        $.get("/api/signin", function (data) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].id == loginID) {
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
        localStorage.setItem("category", search)
        location.reload();
    })
    function searchQuotes() {
        searchQuery = "/api/categories/" + search
        console.log(searchQuery)
        $.get(searchQuery, function (data) {
            divID++;
            let newDiv = $("<div>")
            newDiv.addClass("row")
            newDiv.attr("id", "new-div-" + divID)
            $("#quote-container").append(newDiv)
            if (k >= data.length) {
                $("#load-more").hide()
            }
            for (i; i < k; i++) {
                let subDiv9 = $("<div>")
                subDiv9.addClass("col-xs-12 col-sm-6 col-md-6")
                subDiv9.attr("id", "subdiv9-" + i + divID)
                let subDiv1 = $("<div>")
                subDiv1.addClass("image-flip")
                subDiv1.attr("ontouchstart", "this.classList.toggle('hover');")
                subDiv1.attr("id", "subdiv1-" + i + divID)
                let subDiv2 = $("<div>")
                subDiv2.addClass("mainflip")
                subDiv2.attr("id", "subdiv2-" + i + divID)
                let subDiv3 = $("<div>")
                subDiv3.addClass("frontside")
                subDiv3.attr("id", "subdiv3-" + i + divID)
                let subDiv4 = $("<div>")
                subDiv4.addClass("card")
                subDiv4.attr("id", "subdiv4-" + i + divID)
                let subDiv5 = $("<div>")
                subDiv5.addClass("card-body text center")
                subDiv5.attr("id", "subdiv5-" + i + divID)
                let frontQuote = $("<p>")
                frontQuote.addClass("quote-body")
                frontQuote.text(data[i].Quote)
                frontQuote.attr("id", "front-quote-" + i + divID)
                frontQuote.append("<br>")
                frontQuote.append("<br>")
                let frontAuthor = $("<h4>")
                frontAuthor.addClass("card-title")
                frontAuthor.text(data[i].Author)
                frontAuthor.attr("id", "front-author-" + i + divID)
                let subDiv6 = $("<div>")
                subDiv6.addClass("backside")
                subDiv6.attr("id", "subdiv6-" + i + divID)
                let subDiv7 = $("<div>")
                subDiv7.addClass("card")
                subDiv7.attr("id", "subdiv7-" + i + divID)
                let subDiv8 = $("<div>")
                subDiv8.addClass("card-body text center mt-4")
                subDiv8.attr("id", "subdiv8-" + i + divID)
                let backQuote = $("<p>")
                backQuote.addClass("quote-body")
                backQuote.text(data[i].Quote)
                backQuote.attr("id", "back-quote-" + i + divID)
                backQuote.append("<br>")
                backQuote.append("<br>")
                let backAuthor = $("<h4>")
                backAuthor.addClass("card-title")
                backAuthor.text(data[i].Author)
                backAuthor.attr("id", "back-author-" + i + divID)
                let subDivFav = $("<div>")
                subDivFav.addClass("click")
                let favSpan = $("<span>")
                favSpan.addClass("fa fa-star-o")
                subDivFav.append(favSpan)
                let favDiv1 = $("<div>")
                favDiv1.addClass("ring")
                subDivFav.append(favDiv1)
                let favDiv2 = $("<div>")
                favDiv2.addClass("ring2")
                subDivFav.append(favDiv2)
                let favP = $("<p>")
                favP.addClass("info")
                favP.text("Added to favorites")
                subDivFav.append(favP)
                $("#new-div-" + divID).append(subDiv9)
                $("#subdiv9-" + i + divID).append(subDiv1)
                $("#subdiv1-" + i + divID).append(subDiv2)
                $("#subdiv2-" + i + divID).append(subDiv3)
                $("#subdiv3-" + i + divID).append(subDiv4)
                $("#subdiv4-" + i + divID).append(subDiv5)
                $("#subdiv5-" + i + divID).append(frontQuote)
                $("#front-quote-" + i + divID).append(frontAuthor)
                $("#subdiv2-" + i + divID).append(subDiv6)
                $("#subdiv6-" + i + divID).append(subDiv7)
                $("#subdiv7-" + i + divID).append(subDiv8)
                $("#subdiv8-" + i + divID).append(backQuote)
                $("#back-quote-" + i + divID).append(backAuthor)
                $("#subdiv6-" + i + divID).append(subDivFav)
            }
        });
    }
    searchQuotes();
    $("#load-more").on("click", function (event) {
        event.preventDefault();
        k = k + 2
        searchQuotes();
    })
    // $(document).on("scroll", function() {
    //     console.log("scrolling")
    //     if($(document).scrollTop() + $(document).innerHeight() >= $(document).scrollHeight){
    //         alert("it works!")
    //     }
    // });
    // $(window).on("scroll", function() {
    //     console.log("scrolling")
    //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //         searchQuotes();
    //     }
    // });
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
                localStorage.setItem("category", search)
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
})