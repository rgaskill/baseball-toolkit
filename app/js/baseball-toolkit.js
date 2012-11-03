'use strict';

var baseballToolkitApp = angular.module('bbToolkit', ['bbToolkit.directives']).
    config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/roster', {templateUrl: 'views/roster.html', controller: 'RosterCtrl'});
    $routeProvider.otherwise({redirectTo: '/roster'});
}]);
