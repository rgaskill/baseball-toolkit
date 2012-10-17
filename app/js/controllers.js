'use strict';

/* Controllers */


function Roster($scope, $log) {

	var emptyPositions = {"1": {value:"Bench"},"2": {value:"Bench"},"3": {value:"Bench"},"4": {value:"Bench"},"5": {value:"Bench"},"6": {value:"Bench"}};

	var requiredPositions = {'P':'', 'C':'', '1B':'', '2B':'', '3B':'', 'SS':'', 'RF':'', 'RC':'', 'LC':'', 'LF':''};


	$scope.positionMap = {};
	
	


	$scope.addPlayer = function(newPlayer){
		$log.log(newPlayer);
		$scope.positionMap[newPlayer] = angular.copy(emptyPositions);
	};

	$scope.availablePositionsForPlayer = function(player, inning) {



	};

	$scope.availablePositionsForInning = function(inning) {

		var positions = angular.copy(requiredPositions);
		var ret = [];

		angular.forEach ( $scope.positionMap, function (value, key) {
			delete this[value[inning].value];
		}, positions);

		

		angular.forEach ( positions, function (value, key) {
			this.push(key);
		}, ret);

		return ret;

	};

	
	$scope.setPosition = function(player, inning, position){
		$scope.positionMap[player][inning].value =  position;
		$scope.$digest();
	};

	

	

}
Roster.$inject = ['$scope','$log'];

function RosterPosition($scope,$log) {
	$scope.autocompleteOptions =  {
		autoFocus: true,
		delay: 0,
		select: function(event, ui){
			$scope.setPosition($scope.player,$scope.inning, ui.item.value);
		},
		source: function(request, response) {
			response($scope.availablePositionsForInning($scope.inning));
		}
	};
}
RosterPosition.$inject = ['$scope','$log'];


