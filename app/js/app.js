'use strict';


// Declare app level module which depends on filters, and services
angular.module('bbToolkit', ['bbToolkit.filters', 'bbToolkit.services', 'bbToolkit.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/roster', {templateUrl: 'partials/roster.html', controller: Roster});
    $routeProvider.otherwise({redirectTo: '/roster'});
  }]);

