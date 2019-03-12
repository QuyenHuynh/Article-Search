$("#search-btn").on("click", function () {

    //get search term information
    var searchTerm = $("#searchterm").val().trim();
    console.log(searchTerm)

    var APIkey = "2bdxYcdBu066AKNLT2ySa58AXSQqXXlQ";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (i = 0; i < parseInt(records); i++) {
            //create new div for articles
            var elem = $("<p>");
            //give the divs a class
            elem.addClass("articles");
            var pageTitle = response.response.docs[i].lead_paragraph;
            elem.text(i + 1 + ". " + pageTitle);
            $(".container2").append(elem);
        }
        $(".articles").on("click", function () {
            window.open(pageURL);
        });
    });
});

$("#clear-btn").on("click", function () {
    $(".articles").empty();
});