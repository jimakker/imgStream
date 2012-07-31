'use strict';

/* Controllers */

function MainCtrl($scope,$http,twitterSearch,$timeout,$routeParams,$location){
	$scope.interMSeconds = 15000;
	$scope.url = encodeURIComponent($location.$$absUrl);
	document.title = "imgStream | The Social Image Stream Viewer";
	$scope.init = function(){
		$location.search('search',$scope.searchQuery);
		$scope.searchPages = 5;
		$scope.dataCheck = 0;
		$scope.twits = [];
		$scope.twit = "";
		$scope.clearInterval();		
		$scope.curPos = 0;
		for(var i = 0; i < $scope.searchPages;i++){
			twitterSearch.get({q:$scope.searchQuery,page:i},function(res){
				angular.forEach(res.results, function(value,key){
					if(value.entities != null && value.entities.media != null){
						$scope.twits.push(value);
						}
				});
				$scope.checkData();
			});
		}
	};

	$scope.trendSelected = function(trend){
		$scope.searchQuery = trend;
		$scope.init();
	};

	$scope.checkData = function(){
		$scope.dataCheck++;
		if($scope.dataCheck == $scope.searchPages) {
			if($scope.twits.length==0){
				alert("Sorry, the search didn\'t return any result. Try a different search please.");
			} else {
				$scope.twit = $scope.twits[0];
				$scope.twitCount = $scope.twits.length;
				$scope.backgroundImage = {background:"url("+$scope.twit.entities.media[0].media_url+") no-repeat center center"};
				$scope.curPosHuman = $scope.curPos+1;
				if($scope.twitCount>1){
					$scope.setInterval();
				}
				document.title = $scope.searchQuery +" - imgStream | The Social Image Stream Viewer";
			}
		}
	};

	$scope.previous = function(){
		if($scope.curPos==0){
			$scope.curPos = $scope.twits.length - 1;
		} else {
			$scope.curPos = $scope.curPos-1;
		}
		$scope.twit = $scope.twits[$scope.curPos];
		$scope.backgroundImage = {background:"url("+$scope.twit.entities.media[0].media_url+") no-repeat center center"};
		$scope.curPosHuman = $scope.curPos+1;
		$scope.clearInterval();
		$scope.setInterval();
	}

	$scope.next = function(){
		$scope.updateTwit();
		$scope.clearInterval();
		$scope.setInterval();
	};

	$scope.intervalChanged = function(){
		$scope.clearInterval();
		$scope.setInterval();
	}

	$scope.clearInterval = function(){
		clearInterval($scope.interval);
	};

	$scope.setInterval = function(){
		if($scope.twits!=null){
			$scope.interval = setInterval(function(){
				$scope.$apply(function() {
	            	$scope.updateTwit();
	        	});
			},$scope.interMSeconds);
		}
	};

	$scope.updateTwit = function(){
		if($scope.curPos == $scope.twits.length-1){
			$scope.curPos = 0;
		}else{
			$scope.curPos++;
		}
		$scope.twit = $scope.twits[$scope.curPos];
		$scope.backgroundImage = {background:"url("+$scope.twit.entities.media[0].media_url+") no-repeat center center"};
		$scope.curPosHuman = $scope.curPos+1;
	};

	if($routeParams.search!=null){
		$scope.searchQuery = $routeParams.search;
		$scope.init();
	} else {
		$scope.trends = [];
		$.ajax({
		    url: 'http://api.twitter.com/1/trends/1.json',
		    dataType: 'jsonp',
		    success: function(data){
		        $.each(data[0].trends, function(i){
		            $scope.trends.push(data[0].trends[i]);
		        });
		        $scope.$apply(function(){
		        	$scope.globalTrends = $scope.trends;	
		        });
		        
		    }
		});
	}
}