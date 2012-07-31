'use strict';

/* Filters */

var angularFilter = angular.module('myApp.filters', []);

angularFilter.filter('formatTime', [function() {
  return function(text) {    
    	setInterval(function(){
    		return moment(text).fromNow();
    	},60000);
    return moment(text).fromNow();
  }
}]);