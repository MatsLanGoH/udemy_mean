angular
  .module('myApp')
  .controller('FilmController', FilmController);

function FilmController($http, $routeParams) {
  var vm = this;
  var id = $routeParams.id;

  $http
    .get('http://swapi-tpiros.rhcloud.com/films/' + id)
    .then(function(response) {
      vm.film = response.data;
    });
}
