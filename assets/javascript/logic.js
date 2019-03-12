$("#search-btn").on("click", function () {

    $(".articles").empty();

    //get search term information
    var searchTerm = $("#searchterm").val().trim();
    console.log(searchTerm)

    var APIkey = "2bdxYcdBu066AKNLT2ySa58AXSQqXXlQ";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + APIkey;

    //optional start and end years will be included in queryURL if provided
    var startYear = $("#start-year").val().trim();
    var endYear = $("#end-year").val().trim();
    if (parseInt(startYear)) {
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }
    if (parseInt(endYear)) {
        queryURL = queryURL + "&end_date=" + endYear + "0101";
    }

    //variable which stores the number of records we want to pull
    var records = $("#records option:selected").text();
    console.log("Number of records to pull: " + records);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (i = 0; i < parseInt(records); i++) {

            var pageHeadline = response.response.docs[i].headline.main;
            var pageURL = response.response.docs[i].web_url;
            //console log for debugging
            console.log("Page url " + i + ": " + pageURL);

            //create new divisions and paragraphs to store articles
            var divElem = $("<div>");
            var pElem = $("<p>");

            //assigns the article class to each new paragraph
            pElem.addClass("articles");

            //assigns URL attr to each paragraph
            $(".articles").attr("href", pageURL);

            //assigns each paragraph headline text
            pElem.text(i + 1 + ". " + pageHeadline);

            //append to div
            $(divElem).append(pElem);
            $(".container2").append(divElem);
        };
        $(".articles").on("click", function () {
            var articleURL = $(this).attr("href");
            window.open(articleURL);
        });
    });
});

$("#clear-btn").on("click", function () {
    $(".articles").empty();
});