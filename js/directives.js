'use strict';

/* Directives */


var angularDirectives = angular.module('myApp.directives', []);

  angularDirectives.directive('full', [function() {
    return function(scope, elm, attrs) {
      $(elm).height(window.innerHeight-40).width(window.innerWidth);
      $(window).resize(function() {
		  $(elm).height(window.innerHeight-40).width(window.innerWidth);
	});
   
    };
  }]);