define(['Angular', 'bbtkApp'],function(angular) {
    'use strict';
    angular.module('bbToolkit.directives').directive('onEnterKeyup', ['$parse',
        '$log',
        function($parse,$log) {
        return function(scope, elm, attrs) {

            var expression = attrs.onEnterKeyup;
            var fn = $parse(expression);
            $log.info(expression);
            elm.bind("keyup", function(event) {
                if (event.keyCode === 13 ){
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                }
            });
        };
    }]);
});