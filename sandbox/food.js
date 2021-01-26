$(document).ready(function() {//dont forget this cause it will ruin your day

  $("#search-button").on("click", function(Event){
  
    getFood();

  });

  function getFood(){
    // get the search text do some logic on this once it works and you have time
    var sIn = $("#country").val();
    console.log(sIn);
    //put the api link here
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + sIn //https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"//"https://www.thecocktaildb.com/api/json/v1/1/random.php"; //"https://www.themealdb.com/api/json/v1/1/categories.php"; //"https://www.themealdb.com/api/json/v1/1/filter.php?a=British";
    
    //get the url info
    $.ajax({
      url: queryURL,
      method: "GET"
  })
    
    .then(function(response) {
    // log it to see whats in it
      console.log(response);
    });
  }
})