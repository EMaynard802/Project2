
var categorySelect = $("#categoryList");
var listOption;
var itemCard = $("#item-container").clone();
var addToCart = $("#add-button");

var itemArray = [];




var userInput = categorySelect.val();
var currency = $("#currency").val()
  $("#item-container").remove();
  getCategory();


  categorySelect.on("click", getCategoryValue);

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  // A function to get categories and then render our list of Categories
  function getCategory() {
    console.log("inside user-data route");
    $.get("/api/category", renderCategoryList);
  }

  // Function to render a list of categories
  function renderCategoryList(data) {
    console.log("inside rendercategory");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createCategoryList(data[i]));
    }
    
    categorySelect.empty();
    categorySelect.append(rowsToAdd);
  
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

  //function to get selected category

  async function getCategoryValue(event){
    event.stopPropagation();
    // $("#item-container").remove();
    console.log("inside getcategoryname function");
    var categoryName = $(event.target).text();
    console.log(categoryName);
    getAmazonData(categoryName);
    //return categoryName;
  }

  
async function getAmazonData(keyword){

  console.log("keyword:" + keyword);

  const header = {
    "async": true,
    "crossDomain": true,
    "url": `https://amazon-price1.p.rapidapi.com/search?keywords= ${keyword}&marketplace=US`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
      "x-rapidapi-key": ""
    }
  }

  await $.ajax(header).done(function (response) {
    generateItem(response);

  });
}  

// generates new item card
function generateNewCard(data) {
    
  let newItemCard = itemCard.clone();
  
  //Item Details
  newItemCard.find(".title").html(data.title).text();
  newItemCard.find("#image").attr("src", data.image);
  newItemCard.find(".price").html(data.price).text();
  newItemCard.find(".price-old").html(data.listPrice).text();

  return newItemCard;
}

//Renders generated item cards
function generateItem(response) {
  const results  = response;
  results.forEach((item) => {
  
      let newGeneratedItem = new Item(item.imageUrl, item.title,item.price, item.listPrice);
      itemArray.push(newGeneratedItem);
      //Make the card element from the NewGeneratdItem
      let addItemCard= generateNewCard(newGeneratedItem);
      $(".row").prepend(addItemCard);

  });
}

addToCart.on("click", itemCart);

// async function itemCart(event) {
//   // prevents the click listener for the list from being called when the button inside of it is clicked
//   event.stopPropagation();
//   console.log("inside handle delete note function");
//   cartArray = []
//    var item =  await $(this)
//     .parent(".card-product")
//     .data();
//     console.log("Item Cart:");
//     console.log(item);
// };






      
   

    












