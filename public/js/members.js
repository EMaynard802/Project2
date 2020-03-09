$(document).ready(function() {
  var unirest = require("unirest");
  var req = unirest("GET", "https://amazon-price1.p.rapidapi.com/search");
  
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  req.query({
    "keywords": "ipnone",
    "marketplace": "US"
});

req.headers({
    "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
    "x-rapidapi-key": "3f02ee3a6cmshd59f244cdd17b11p1de9e5jsn91062f0f2cd3"
});

req.end(function (res) {
    if (res.error) throw new Error(res.error);
    // console.log(res.body);
    
    for(i=0; i<res.body.length; i++){
        console.log(res.body[i].title);
        console.log(res.body);
    }

});

});
