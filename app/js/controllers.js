'use strict';

/* Controllers */


function Roster($scope, $log) {

	var emptyPositions = {"1": "Bench","2": "Bench","3": "Bench","4": "Bench","5": "Bench","6": "Bench"};

	var requiredPositions = {'P':'', 'C':'', '1B':'', '2B':'', '3B':'', 'SS':'', 'RF':'', 'RC':'', 'LC':'', 'LF':''};


	$scope.positionMap = {};
	$scope.positionAvailMap = {};
	


	$scope.addPlayer = function(newPlayer){
		$log.log(newPlayer);
		$scope.positionMap[newPlayer] = jQuery.extend(true, {}, emptyPositions);
	};

	$scope.availablePositionsForPlayer = function(player, inning) {



	};

	$scope.availablePositionsForInning = function(inning) {

		var positions = jQuery.extend(true, {}, requiredPositions);
		var ret = [];

		jQuery.each ( $scope.positionMap, function (key, value) {
			delete positions[value[inning]];
		});

		

		jQuery.each ( positions, function (key, value) {
			ret.push(key);
		});

		return ret;

	};

	

	$scope.autocompleteOptions =  function(player, inning) {

		return {
			autoFocus: true,
			delay: 0,
			select: function(event, ui){
				$log.log(player);
				$log.log(inning);
				$log.log(ui.item.value);
				$log.log($scope.positionMap[player][inning]);
				$scope.positionMap[player][inning] = ui.item.value;
				$log.log($scope.positionMap[player][inning]);
			},
			source: function(request, response) {
				response($scope.availablePositionsForInning(inning));
			}
		};


	};

	

}
Roster.$inject = ['$scope','$log'];


