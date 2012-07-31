'use strict';

/* Services */

var angularServices = angular.module('myApp.services', []);

angularServices.factory('twitterSearch', ['$resource', function($resource) {
	return $resource('https://search.twitter.com/search.json',{rpp:100,include_entities:1,result_type:'recent',callback:"JSON_CALLBACK"},{get: {method:'JSONP'}});
	}
]);