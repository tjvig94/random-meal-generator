$(document).ready(function () {//dont forget this cause it will ruin your day


  $("#search-button").on("click", function (Event) {

    getFood();

  });


  function getFood() {
    // get the search text do some logic on this once it works and you have time
    var sIn = $("#country").val();
    //console.log(sIn);
    //put the api link here
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + sIn //https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"//"https://www.thecocktaildb.com/api/json/v1/1/random.php"; //"https://www.themealdb.com/api/json/v1/1/categories.php"; //"https://www.themealdb.com/api/json/v1/1/filter.php?a=British";

    //get the url info
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        // log it to see whats in it
        // console.log(response);
        $("#dispData").text(response.meals[0].strMeal);
        $(".meal-name").text(response.meals[0].strMeal);
        window.localStorage.setItem("Meal" ,response.meals[0].strMeal);
        $("#showMe").attr("src", response.meals[0].strMealThumb);
        $(".meal-img").attr("src", response.meals[0].strMealThumb);
        window.localStorage.setItem("Pic" ,response.meals[0].strMealThumb);
        $(".ingredients").text(response.meals[0]);
        window.localStorage.setItem("Ingred" ,response.meals[0]);
        getIngredients();
      });

  }

  function getIngredients() {
    // get the search text do some logic on this once it works and you have time
    var x = $("#dispData").text();
    //put the api link here
    var queryURL1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + x //https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"//"https://www.thecocktaildb.com/api/json/v1/1/random.php"; //"https://www.themealdb.com/api/json/v1/1/categories.php"; //"https://www.themealdb.com/api/json/v1/1/filter.php?a=British";
    //get the url info
    $.ajax({
      url: queryURL1,
      method: "GET"
    })

      .then(function (response) {
        // log it to see whats in it
        console.log(response);
        $("#ingreed").text(response.meals[0].strInstructions);
        $(".ingredients").text(response.meals[0].strInstructions);
      });
  }

  function initPage(){
    //$("#country").text(window.localStorage.getItem("Meal"));

  }

  $("#search-button").on("click", function (Event) {

    getFood();

  });

  $("select").formSelect();//DONT REMOVE THIS IS FOR THE DROPDOWN BOX TO WORK!!!!!
  initPage();

$(document).ready(function () {
  $('select').formSelect();

});



});