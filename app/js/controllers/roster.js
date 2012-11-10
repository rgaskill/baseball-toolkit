'use strict';

baseballToolkitApp.controller('RosterCtrl', ['$scope','$log', function($scope, $log) {

    var BENCH = {id: 0, label:"Bench"};
    var emptyPositions = {"1": BENCH,"2": BENCH,"3": BENCH,"4": BENCH,"5": BENCH,"6": BENCH};


    //this needs to be positonList and be an array of objects
    $scope.requiredPositions = {"P": {id: 1, label: 'P'},
        "C": {id: 2, label: 'C'},
        "1B": {id: 3, label: '1B'},
        "2B": {id: 4, label: '2B'},
        "3B": {id: 5, label: '3B'},
        "SS": {id: 6, label: 'SS'},
        "RF": {id: 7, label: 'RF'},
        "RC": {id: 8, label: 'RC'},
        "LC": {id: 9, label: 'LC'},
        "LF": {id: 10, label: 'LF'}
    };


    $scope.positionMap = {};


    $scope.benchCount = function(player){
        var pos = $scope.positionMap[player];
        var count = 0;
        angular.forEach(pos, function(value,key) {
            if ( value.label === 'Bench') {
                count = count + 1;
            }
        });
        return count;
    };

    $scope.positionFilled = function(position, inning) {
        var ret = '';
        angular.forEach ( $scope.positionMap, function (value, key) {
            if ( value[inning].label === position ){
                ret = 'X';
            }
        });
        return ret;
    };


    $scope.addPlayer = function(newPlayer){
        $log.log(newPlayer);
        $scope.positionMap[newPlayer] = angular.copy(emptyPositions);
    };

    $scope.availablePositionsForPlayer = function(player, inning) {



    };

    $scope.availablePositionsForInning = function(partial, inning) {

        var positions = angular.copy($scope.requiredPositions);
        var ret = [];

        angular.forEach(positions, function(value, key) {
            if ( key.indexOf(partial.toUpperCase()) != 0 ){
                delete this[key];
            }
        }, positions);

        angular.forEach ( $scope.positionMap, function (inningMap, player) {
            delete this[inningMap[inning].label];
        }, positions);



        angular.forEach ( positions, function (value, key) {
            this.push(value);
        }, ret);

        ret.push(BENCH);

        return ret;

    };


    $scope.setPosition = function(player, inning, position){
        $scope.positionMap[player][inning] =  position;
    };

    $scope.getPositionFromString = function(posString){
        return $scope.requiredPositions[posString];
    }

    $scope.isPositionValid = function(player, inning, pos ){

    }





}]);

baseballToolkitApp.controller('RosterPositionCtrl', ['$scope','$log', function($scope, $log) {

    $scope.$watch('position', function(newValue, oldValue) {
        $scope.setPosition($scope.player, $scope.inning, newValue);
    });

    $scope.positionAutoComplete =  {
        autoFocus: true,
//        messages: '',
        delay: 0,
        source: function(request, response) {
            response($scope.availablePositionsForInning(request.term, $scope.inning));
        }
    };

}]);
