angular.module('myApp', ['ngRoute']).config(config);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      template: "templates/main.html",
      controller: 'MyController',
      controllerAs: 'vm'
    })
    .when('/hello', {
      template: "templates/hello.html",
      controller: 'HelloController',
      controllerAs: 'vm'
    });
}
