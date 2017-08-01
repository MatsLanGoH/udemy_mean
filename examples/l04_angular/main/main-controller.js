angular
  .module('myApp')
  .controller('MainController', MainController);

function MainController(FilmFactory) {
  var vm = this;

  FilmFactory
    .getAllFilms()
    .then(function(response) {
        vm.films = response;
    });

  vm.date1 = '12 February 2016';
}
