	'use strict';

/* Directives */


var module = angular.module('bbToolkit.directives', []);

module.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

module.directive('positionAutocomplete', function() {
    return function(scope, elm, attrs) {
		var expression = attrs.positionAutocomplete;
		var options = scope.$eval(expression);
		elm.autocomplete(options);
    };
  });
