$(document).ready(function() {

  // $(document).ready(function() {

    // var unirest = require("unirest");
    // var req = unirest("GET", "https://amazon-price1.p.rapidapi.com/search");
    var categorySelect = $("#categoryList");
    var listOption;
    // var userInput = categorySelect.val();
    // var currency = $("#currency").val();

    getCategory();

    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.email);
    });

  
    // A function to get Authors and then render our list of Categories
    function getCategory() {
        console.log("inside user-data route");
        $.get("/api/category", renderCategoryList);
    }

    

    // Function to either render a list of categories
    function renderCategoryList(data) {
        console.log("inside rendercategory");
        console.log(data);
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
          rowsToAdd.push(createCategoryList(data[i]));
        }
        

        console.log(rowsToAdd);
        categorySelect.empty();
        console.log(categorySelect);
        categorySelect.append(rowsToAdd);
        // categorySelect.val(authorId);
    }
    
    // Creates the category options in the dropdown
    function createCategoryList(category) {
        
        console.log("inside create category");
        listOption = $("<li>");
        var linkElement = $("<a>");
        listOption.append(linkElement);
        linkElement.attr("value", category.id);
        linkElement.attr("href", "#");
        linkElement.text(category.category_name);
        return listOption;
      }

    // req.query({
    //     "keywords": userInput,
    //     "marketplace": currency
    // });
    
    // req.headers({
    //     "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
    //     "x-rapidapi-key": "3f02ee3a6cmshd59f244cdd17b11p1de9e5jsn91062f0f2cd3"
    // });
    
    // req.end(function (res) {
    //     if (res.error) throw new Error(res.error);
    //     // console.log(res.body);
        
    //     for(i=0; i<res.body.length; i++){
    //         console.log(res.body[i].title);
    //         console.log(res.body);
    //     }
        
    
    // });

    


//});









//   var unirest = require("unirest");
//   var req = unirest("GET", "https://amazon-price1.p.rapidapi.com/search");
  
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(function(data) {
//     $(".member-name").text(data.email);
//   });

//   req.query({
//     "keywords": "ipnone",
//     "marketplace": "US"
// });

// req.headers({
//     "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
//     "x-rapidapi-key": "3f02ee3a6cmshd59f244cdd17b11p1de9e5jsn91062f0f2cd3"
// });

// req.end(function (res) {
//     if (res.error) throw new Error(res.error);
//     // console.log(res.body);
    
//     for(i=0; i<res.body.length; i++){
//         console.log(res.body[i].title);
//         console.log(res.body);
//     }

});

