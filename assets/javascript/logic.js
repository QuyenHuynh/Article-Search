//On-click search button function
$("#search-btn").on("click", function () {

    $(".results-container").empty();

    //get search term information
    var searchTerm = $("#searchterm").val().trim();
    console.log(searchTerm)

    var APIkey = "2bdxYcdBu066AKNLT2ySa58AXSQqXXlQ";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + APIkey;

    //Start and end years (optional)
    var startYear = $("#start-year").val().trim();
    var endYear = $("#end-year").val().trim();

    if (parseInt(startYear)) {
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }
    if (parseInt(endYear)) {
        queryURL = queryURL + "&end_date=" + endYear + "1231";
    }

    //Stores the number of records we want pulled
    var records = $("#records option:selected").text();
    console.log("Number of records to pull: " + records);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (NYTData) {
        console.log(NYTData);

        for (i = 0; i < parseInt(records); i++) {

            var pageHeadline = NYTData.response.docs[i].headline.main;
            var author = NYTData.response.docs[i].byline.original;
            var section = NYTData.response.docs[i].section_name;
            var date = NYTData.response.docs[i].pub_date;
            var pageURL = NYTData.response.docs[i].web_url;

            console.log("Headlines: " + pageHeadline);
            console.log("Authors:" + author);
            console.log("Sections: " + section);
            console.log("Date: " + date);
            console.log("URL: " + pageURL);

            //create new div in to hold the articles
            var divElem = $("<div>");
            divElem.addClass("results")

            //create new paragraph elements with the ids for title, author, section, date, and link
            var pElem = $("<p>");
            pElem.attr("id", "title");
            var pElem2 = $("<p>");
            var pElem3 = $("<p>");
            var pElem4 = $("<p>");
            var pElem5 = $("<p>");

            //assigns each paragraph their respective information
            pElem.html(pageHeadline);
            pElem2.html(author);
            pElem3.html("Section: " + section);
            pElem4.html("Date: " + date);
            pElem5.html("Link: " + "<a href='" + pageURL + "'>" + pageURL + "</a>");

            //append to divs
            $(divElem).append(pElem);
            $(divElem).append(pElem2);
            $(divElem).append(pElem3);
            $(divElem).append(pElem4);
            $(divElem).append(pElem5);
            $(".results-container").append(divElem);
            $(".results-container").append("<hr>");
        };
    });
});

$("#clear-btn").on("click", function () {
    $(".results-container").empty();
});