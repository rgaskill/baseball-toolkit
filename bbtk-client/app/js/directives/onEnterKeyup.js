define(['Angular', 'bbtkApp'],function(angular) {

    angular.module('bbToolkit.directives').directive('onEnterKeyup', ['$parse', function($parse) {
        return function(scope, elm, attrs) {

            var expression = attrs.onEnterKeyup;
            var fn = $parse(expression);
            console.log(expression);

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