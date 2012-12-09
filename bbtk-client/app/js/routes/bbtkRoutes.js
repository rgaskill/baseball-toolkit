define(['Angular', 'bbtkApp'], function(angular) {
    'use strict';
    angular.module('bbToolkit')
        .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/roster', {templateUrl: 'views/roster.html', controller: 'RosterCtrl'});
        $routeProvider.otherwise({redirectTo: '/roster'});
    }]);

});