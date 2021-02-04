$(document).ready(function () {


//read the favorites from local storage if there are any
//load the results into the list
//

//newst item goes last
//when you click on the button get meal name
//setitem meal in local storage
//read the local storage and make it a json obj or array

  function init(){
    var listOfFavs = getFavs();
    console.log("list of favs");
    console.log(listOfFavs);
    //if the favorites button was pressed save the data to the rows?
   // if (window.localStorage.getItem("Fav") == "Fav"){
      //Stick the local storage info in the ul = list-group li = search-input
      //Ingred, Fav, IndexFav, Pic, Meal, Country
      
      for (var i = 0 ; i< listOfFavs.length; i++){
        var tagit = $("<li>");//create a li item
        tagit.attr("class", "new-item");
        tagit.addClass("search-input");
        tagit.text(listOfFavs[i]);//(window.localStorage.getItem("Meal"));
        $(".list-group").append(tagit);  
      }
      //loop through the local storage array if it exists
  }


//in global scope make meal a variable 

  
  function getFavs(){
    //append or prepend the favorite to the list
    //JSON.parse(localStorage.getItem("todos"));
    let favs = JSON.parse(localStorage.getItem("Meal"));//maybe make Meals MealNames as its a list of meals 
    if (favs == null){//falsey vals are empty strings 0 null undefined and false 
      console.log("favs array from localstorage");
      console.log(favs); 
      favs=[]; 
    }
    
    return favs; // window.localStorage.getItem("Meal");//return an empty array
  }

  function makeNewJSON(){
    //stringify data into new json obj in local storage
  }

  $(".list-group").on("click", "li", function(event){
    //when they click on a fav load the results page with that info...
    
    //window.localStorage.setItem("Country", $(".select-dropdown.dropdown-trigger").val());
    window.localStorage.setItem("FavSelected", "favSelect");//key to know if they click on the search button or the favorite 
    window.localStorage.setItem("FavMeal", $(this).text());
    window.location.href='results.html'
    //$("#search-input").val($(this).text());//set the val of search area
  });

  $("#search-button").on("click", function (Event) {

    window.localStorage.setItem("Country", $(".select-dropdown.dropdown-trigger").val());
    window.localStorage.setItem("FavSelected", "");
  });

  $('select').formSelect();

  init();

});





// var tagit = $("<li>");//create a li item
//       tagit.attr("class", "new-item");
//       tagit.addClass("search-input");
//       tagit.text(window.localStorage.getItem("Meal"));
//       $(".list-group").append(tagit);  //<li class="list-group-item">Boston</li>
//       console.log(tagit);
//       howManyFavs ++;
//       window.localStorage.setItem("FavMeal" + howManyFavs, window.localStorage.getItem("Meal"));
    