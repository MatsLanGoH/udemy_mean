angular
  .module('myApp')
  .controller('MainController', MainController);

function MainController($http) {
  var vm = this;

  $http
    .get('http://swapi-tpiros.rhcloud.com/films')
    .then(function(response) {
      console.log(response.data);
      vm.films = response.data;
    });
}
