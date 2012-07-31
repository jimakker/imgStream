'use strict';

angular.module('imgStream', ['myApp.filters', 'myApp.services', 'myApp.directives','ngResource']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/app', {templateUrl: 'partials/app.html', controller: MainCtrl});
    $routeProvider.otherwise({redirectTo: '/app'});
  }]);
