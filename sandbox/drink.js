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
               drink_recipe += drink[`strIngredient${i}`] + ' ' + drink[`strMeasure${i}`]
           }
           document.querySelector('.card-img-top').src = drink_photo_url
           document.querySelector('.card-title').innerText = drink_name
           document.querySelector('.card-text').innerText = drink_recipe
       })
}
drink()