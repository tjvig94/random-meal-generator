$(document).ready(function () {

  function init(){//this gets called first
    var listOfFavs = getFavs();//initialize the array with localstorage meal names if there are any
      //Stick the local storage info in the ul = list-group li = search-input
      //Ingred, Fav, IndexFav, Pic, Meal, Country
      for (var i = 0 ; i< listOfFavs.length; i++){
        var tagit = $("<li>");//create a li item
        tagit.attr("class", "new-item");
        tagit.addClass("search-input");
        tagit.text(listOfFavs[i]);//(window.localStorage.getItem("Meal"));
        $(".list-group").append(tagit);  
      }
  }

//in global scope make meal a variable 

  function getFavs(){
    
    let favs = JSON.parse(localStorage.getItem("Meal"));//load favs array with local storage array 
    if (favs == null){//if there is no local storage just init the array
      favs=[]; 
    }
    
    return favs; //return the array to init()
  }

  $(".list-group").on("click", "li", function(event){
    //when they click on a fav load the results page with that info...
    
    //window.localStorage.setItem("Country", $(".select-dropdown.dropdown-trigger").val());
    window.localStorage.setItem("FavSelected", "favSelect");//key to know if they click on the search button or the favorite 
    window.localStorage.setItem("FavMeal", $(this).text());//set the local storage to whatever list itme they clicked on 
    window.location.href='results.html'//open the results page
    //$("#search-input").val($(this).text());//set the val of search area
  });

  $("#search-button").on("click", function (Event) {//if they click on the search button

    window.localStorage.setItem("Country", $(".select-dropdown.dropdown-trigger").val());//if they select a country load the localstorage global with the country
    window.localStorage.setItem("FavSelected", "");//make sure you clear the local storage global if they chose a fav before
  });

  $('select').formSelect();//need thsi for chads gui stuff

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
    