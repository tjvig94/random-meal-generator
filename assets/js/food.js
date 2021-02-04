$(document).ready(function () {//dont forget this cause it will ruin your day

  
  var index = 0 ;
  //global to check if favorites was clicked clear it
  window.localStorage.setItem("Fav", "");

  function getFood() {
    // get the search text do some logic on this once it works and you have time
    //var sIn = $("#country").val();
   // console.log(window.localStorage.getItem("Country"));

   //some logic to tell if you selected a new country or a favorite
   var countryOrFav = window.localStorage.getItem("FavSelected");
   if (countryOrFav == "favSelect"){
    var lsMealNames = localStorage.getItem("FavMeal");
        
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + lsMealNames;
   }
   else {
    var sIn = window.localStorage.getItem("Country");
    //console.log(sIn);
    //put the api link here
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + sIn //https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"//"https://www.thecocktaildb.com/api/json/v1/1/random.php"; //"https://www.themealdb.com/api/json/v1/1/categories.php"; //"https://www.themealdb.com/api/json/v1/1/filter.php?a=British";
   }
    console.log(countryOrFav);
    console.log(queryURL);
    //get the url info
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function (response) {
      // log it to see whats in it
      //find a random number in the object so it isnt always 0
      let min = 0;
      let max = response.meals.length;
      index = Math.floor(Math.random() * (max - min)+min);
      console.log(index);
      $(".meal-name").text(response.meals[index].strMeal);
      
      
      //window.localStorage.setItem("Meal" ,response.meals[index].strMeal);
           
      $(".meal-img").attr("src", response.meals[index].strMealThumb);
      window.localStorage.setItem("Pic" ,response.meals[index].strMealThumb);
      window.localStorage.setItem("IndexFav", index);

      //make this an array of meal names 
      let x = response.meals[index].strMeal;
      console.log("x = json meal name");
      console.log(x);
      
      //if it is the first time this is run we need to not read in localstorage
      //if there are no meals then set local storage
      //var listMealArray = JSON.parse(localStorage.getItem("Meal"));
     
      let listMealArray = JSON.parse(localStorage.getItem("Meal"));
      if (listMealArray==null){listMealArray=[]}
      console.log(listMealArray);
      listMealArray.push(x);//push this in 
      console.log("after push)");
      console.log(listMealArray);
      window.localStorage.setItem("Meal" ,JSON.stringify(listMealArray));



      getIngredients();
      index ++;
    });
  }

  function getIngredients() {
    // get the search text do some logic on this once it works and you have time
    var x = $(".meal-name").text();
    console.log("getIngredients meal-name");
    console.log(x);
    //put the api link here
    var queryURL1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + x //https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"//"https://www.thecocktaildb.com/api/json/v1/1/random.php"; //"https://www.themealdb.com/api/json/v1/1/categories.php"; //"https://www.themealdb.com/api/json/v1/1/filter.php?a=British";
    //get the url info
    $.ajax({
      url: queryURL1,
      method: "GET"
    })
      .then(function (response) {
        // log it to see whats in it
        $(".ingredients").text(response.meals[0].strInstructions);
        window.localStorage.setItem("Ingred" ,response.meals[0].strInstructions);
      });
  }

  function drink() {

        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(response => {
                const drink = response.drinks[0]
                const drink_photo_url = drink.strDrinkThumb
                const drink_name = drink.strDrink
                let drink_recipe = ''
                for (let i = 1; i <= 15; i++) {
                    if (drink[`strIngredient${i}`] === null) {
                        break
                    }
                    if (drink[`strMeasure${i}`] === null ){
                      var drinkMeas = " ";
                    }
                    else {
                      drinkMeas =  drink[`strMeasure${i}`];
                    };
                    drink_recipe += drink[`strIngredient${i}`] + drink[`strMeasure${i}`];
                }
                $('.drink-img').attr("src", drink_photo_url);
                $('.drink-name').text(drink_name);
                //$('.drink-directions').prepend(drink.strInstructions);
                $('.drink-directions').text(drink_recipe);
                //document.querySelector('.drink-directions').innerText = drink_recipe
            })
      }

  $(".food-btn").on("click", function(event){
    window.localStorage.setItem("FavSelected", "");
    getFood();
  });
  $(".drink-btn").on("click", function(event){
    drink();
  });

  $(".btn").on("click", function(event){
    //set the Fav global so we can check it on index.html
    window.localStorage.setItem("Fav", "Fav");
    //window.location.href='index.html'
  });

  getFood();
  drink();

});

// function drink() {

//   fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
//       .then(response => response.json())
//       .then(response => {
//           const drink = response.drinks[0]
//           const drink_photo_url = drink.strDrinkThumb
//           const drink_name = drink.strDrink
//           let drink_recipe = ''
//           for (let i = 1; i <= 15; i++) {
//               if (drink[`strIngredient${i}`] === null) {
//                   break
//               }
//               console.log(response);
//               console.log(drink[`strMeasure${i}`]);
//               console.log(drink[`strIngredient${i}`]);
//               if (drink[`strMeasure${i}`] === null ){
//                 var drinkMeas = " ";
//               }
//               else {
//                 drinkMeas =  drink[`strMeasure${i}`];
//               };
//               // $('.drink-directions').prepend(drinkMeas);
//               // $('.drink-directions').prepend('<BR>');
//               // $('.drink-directions').prepend(drink[`strIngredient${i}`]);
//               // $('.drink-directions').prepend('<BR>');
//               drink_recipe += drink[`strIngredient${i}`] + drink[`strMeasure${i}`];
//               // drink_recipe = drink_recipe + drinkMeas + String.fromCharCode(13);
//               // drink_recipe = drink_recipe + drink[`strIngredient${i}`];
//           }
//           $('.drink-img').attr("src", drink_photo_url);
//           $('.drink-name').text(drink_name);
//           //$('.drink-directions').prepend(drink.strInstructions);
//           //$('.drink-directions').text(drink_recipe);
//           document.querySelector('.drink-directions').innerText = drink_recipe
//       })
// }






// function drink() {

//   fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
//       .then(response => response.json())
//       .then(response => {
//           const drink = response.drinks[0]
//           const drink_photo_url = drink.strDrinkThumb
//           const drink_name = drink.strDrink
//           let drink_recipe = ''
//           for (let i = 1; i <= 15; i++) {
//               if (drink[`strIngredient${i}`] === null) {
//                   break
//               }
//               drink_recipe += drink[`strIngredient${i}`] + ' ' + drink[`strMeasure${i}`]
//           }
//           document.querySelector('.drink-img').src = drink_photo_url
//           document.querySelector('.drink-directions').innerText = drink_name
//           document.querySelector('.drink-directions').innerText = drink_recipe
//       })
// }
// drink()















// $("#search-button").on("click", function (Event) {

//   getFood();

// });


// $(document).ready(function () {
//   $('select').formSelect();

// });

// $(document).ready(function() {//dont forget this cause it will ruin your day

//   //this here below is so important doesnt work if you have 
//   //.list-group-items and no li as a second parameter WHY!?
//   //event delegation 
//   //attach a click event listener to the list group 
//   //the function event wont fire unless you literally click on a li
//   //inputs and buttons only have val();!!!!.
//    $(".list-group").on("click", "li", function(event){
//      //when they click on a past ietm load it up baby!
//      //why does this not work for newly added rows... is it val or what 
//      console.log(event);
//      $("#search-input").val($(this).text());//set the val of search area
//      getWeather();//update with this city
//    });

//   //the json return object has the following 
//   //0 index = today
//   //5 = noon next day
//   //13 noon 2 days out
//   //21 noon 3 days out
//   //29 noon 4 days out 
//   //37 noon 5th day out

//   $("#search-button").on("click", function(Event){
//     var tagit = $("<li>");//create a li item

//     tagit.attr("class", "new-item");
//     tagit.addClass("list-group-item");

//     var t = $("#search-input").val();

//     tagit.text(t);

//     $(".list-group").append(tagit);  //<li class="list-group-item">Boston</li>
//     console.log(tagit);

//     getWeather();
//   });

//   function getWeather(){
//     // get the search text do some logic on this once it works and you have time
//     var sIn = $("#search-input").val();
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + sIn + ",840&appid=ca623f88e9a094baf03a0e31d283744f&units=imperial";
//     //"https://api.openweathermap.org/data/2.5/forecast?q=troy,ny,840&appid=ca623f88e9a094baf03a0e31d283744f"
//     //840 is usa https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes

//     //"https://api.openweathermap.org/data/2.5/onecall?lat=43.31&lon=4.59&exclude=hourly,daily&appid=ca623f88e9a094baf03a0e31d283744f";

//     //get the url info
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//   })
//     //the json return object has the following 
//     //0 index = today
//     //5 = noon next day
//     //13 noon 2 days out
//     //21 noon 3 days out
//     //29 noon 4 days out 
//     //37 noon 5th day out
//     // response has all the goodness in it
//     .then(function(response) {
//     // log it to see whats in it
//       //console.log(response);
//       //console.log(response.city.name);
//       //populate right side with teh json object returned
//       $("#cityDate").text("Currently in " + response.city.name + " its " + response.list[0].weather[0].description + " today.");
//       $("#temp").text("Temp: " + response.list[0].main.temp +"F");
//       $("#humid").text("Humidity: " + response.list[0].main.humidity + "%");
//       $("#wind").text("Wind Speed: " + response.list[0].wind.speed + "MPH");

//       const lati = response.city.coord.lat;
//       const long = response.city.coord.lon;
//       //now go get UV Index from the one call api using the vars above

//      let previousDay = "";

//      response.list.forEach((element) => {
//        //whats up with elemtn
//        const day = dayjs(element.dt_txt).format('dddd');
//        if (day != previousDay){
//         //get vals you need from element 
//         //only console day 1 each time the day changes...
//          console.log(day);
//          previousDay = day;
//        }


//      });

//      getUVI(lati, long);

//     });
//   }

//   function getUVI(x,y){
//     $.ajax({
//       url:"https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&exclude=hourly,daily&appid=ca623f88e9a094baf03a0e31d283744f",
//       method: "GET"
//     })
//       .then(function(response){
//         console.log(response);
//         $("#uvi").text("UV Index: " + response.current.uvi); 
//       })
//   }
// });

// //<div id="cityDate"></div>
// //<div id="temp"></div>
// //<div id="humid"></div>
// //<div id="wind"></div>
// //<div id="uvi"></div>


// // $("#cat-button").on("click", function() {

// //   // Storing our giphy API URL for a random cat image
// //   var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats&rating=pg";

// //   // Perfoming an AJAX GET request to our queryURL
// //   $.ajax({
// //     url: queryURL,
// //     method: "GET"
// //   })

// //   // After the data from the AJAX request comes back
// //     .then(function(response) {

// //     // Saving the image_original_url property
// //       var imageUrl = response.data.image_original_url;

// //       // Creating and storing an image tag
// //       var catImage = $("<img>");

// //       // Setting the catImage src attribute to imageUrl
// //       catImage.attr("src", imageUrl);
// //       catImage.attr("alt", "cat image");

// //       // Prepending the catImage to the images div
// //       $("#images").prepend(catImage);
// //     });
// // });

// // MAJOR TASK #2: ATTACH ON-CLICK EVENTS TO "LETTER" BUTTONS
//       // =================================================================================

//       // 7. Create an "on-click" event attached to the ".letter-button" class.
//       // $(".letter-button").on("click", function() {

//       //   // Inside the on-click event...

//       //   // 8. Create a variable called "fridgeMagnet" and set the variable equal to a new div.
//       //   var fridgeMagnet = $("<div>");

//       //   // 9. Give each "fridgeMagnet" the following classes: "letter fridge-color".
//       //   fridgeMagnet.addClass("letter fridge-color");

//       //   // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))
//       //   // attr acts as both a setter and a getter for attributes depending on whether we supply one argument or two
//       //   // NOTE: There IS a $(data) jQuery method, but it doesn't do what you'd expect. So just use attr.
//       //   fridgeMagnet.text($(this).attr("data-letter"));

//       //   // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);
//       //   // Again you can see we use that find, and once its found we append the item
//       //   $("#display").append(fridgeMagnet);

//       // });
