

define(['Angular'],function(angular) {
    'use strict';
    angular.module('bbToolkit.controllers').controller('RosterCtrl', ['$scope','$log', 'BbtkService', function($scope, $log, BbtkService) {
//
        var emptyPositions = [{inning:1, label:"Bench"},
            {inning:2, label:"Bench"},
            {inning:3, label:"Bench"},
            {inning:4, label:"Bench"},
            {inning:5, label:"Bench"},
            {inning:6, label:"Bench"}];


        //this needs to be positonList and be an array of objects
        $scope.requiredPositions = {"P": "P",
            "C": "C",
            "1B": "1B",
            "2B": "2B",
            "3B": "3B",
            "SS": "SS",
            "RF": "RF",
            "RC": "RC",
            "LC": "LC",
            "LF": "LF"
        };

        $scope.players = BbtkService.Player.query();

        $scope.innings = ["1","2","3","4","5","6"];

        $scope.benchCount = function(player){
            var pos = player.positions;
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
            angular.forEach ( $scope.players, function (player) {
                if ( player.positions[inning-1].label === position ){
                    ret = 'X';
                }
            });
            return ret;
        };


        $scope.addPlayer = function(newPlayer){



            var splitVals = newPlayer.split(" ");
            var numberString = splitVals.slice(-1).pop();
            var number = parseInt(numberString);
            var nameArray = splitVals.slice(0, -1);
            var name = "";
            $log.log(name);
            $log.log(number);


            if ( !angular.isNumber(number) || isNaN(number) ){
                nameArray.push(numberString);
                number = undefined;
            }

            name = nameArray.join(" ");

            $log.log(name);
            $log.log(number);

            var rPlayer = new BbtkService.Player({name: name, number: number, positions: angular.copy(emptyPositions)});
            rPlayer.$save();

            $scope.players.push(rPlayer);
            $scope.newPlayer = undefined;
        };

        $scope.availablePositionsForInning = function(partial, inning) {

            var positions = angular.copy($scope.requiredPositions);
            var ret = [];

            angular.forEach(positions, function(pos) {
                if ( pos.indexOf(partial.toUpperCase()) != 0 ){
                    delete this[pos];
                }
            }, positions);

            angular.forEach ( $scope.players, function (player) {
                delete this[player.positions[inning-1].label];
            }, positions);



            angular.forEach ( positions, function (posKey, pos) {
                this.push(pos);
            }, ret);

            ret.push('Bench');

            return ret;

        };

    }]);

    angular.module('bbToolkit.controllers').controller('RosterPositionCtrl', ['$scope','$log', function($scope, $log) {


        $scope.positionAutoComplete =  {
            autoFocus: true,
//        messages: '',
            delay: 0,
            source: function(request, response) {
                response($scope.availablePositionsForInning(request.term, $scope.position.inning));
            },
            select: function( event, ui ) {
                console.log("position", ui.item);
                $scope.$apply(function() {
                    $scope.position.label = ui.item.value;
                    $scope.player.$save();
                });

            }
        };

    }]);


    angular.module('bbToolkit.controllers').controller('RosterPlayerCtrl', ['$scope','$log', function($scope, $log) {

        $scope.editMode = false;





    }]);


});

