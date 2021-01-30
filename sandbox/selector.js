$(document).ready(function () {
  $('select').formSelect();

$("#search-button").on("click", function (Event) {

  window.localStorage.setItem("Country", $(".select-dropdown.dropdown-trigger").val());

});

});