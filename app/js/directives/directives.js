'use strict';

/* Directives */


var module = angular.module('bbToolkit.directives', []);

module.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);



module.directive('positionAutocomplete', function() {
    return {
        template: '<input type="text"></input>',
        replace: true,
        require: 'ngModel',
        restrict: 'E',
        link: function(scope, element, attrs, ctrl) {
            var expression = attrs.autoComplete;
            var src = scope.$eval(expression);
            var autoComplete = element.autocomplete(src);
            autoComplete.data("autocomplete")._renderItem = function(ul, item) {
                if ( item.description ) {
                    return angular.element( "<li>")
                        .data( "item.autocomplte", item)
                        .append( "<a>" + item.label + " (" + item.description + ")</a>"  )
                        .appendTo(ul);
                } else {
                    return angular.element( "<li>")
                        .data( "item.autocomplte", item)
                        .append( "<a>" + item.label + "</a>"  )
                        .appendTo(ul);
                }

            };

            var fireInput = function(eventType, event, ui) {
                setTimeout(function() {
                    //ui-state-disabled prevents events from being fired to the autocomplete widget.
                    element.addClass('ui-state-disabled');
                    element.trigger('input');
                    element.removeClass('ui-state-disabled');
                    if ( src[eventType]){
                        src[eventType](event,ui);
                    }
                }, 0);
            };

            autoComplete.data("autocomplete").option('focus', function(event,ui) {
                fireInput('focus', event, ui);
            });

            autoComplete.data("autocomplete").option('select', function(event,ui) {
                fireInput('select', event, ui);
            });

            if (attrs.listClick) {
                element.data("autocomplete").option('minLength', 0);
                element.click(function() {
                    element.data("autocomplete").search('');
                });
            }

            var valObjName = attrs.name;
            if ( attrs.validateRequired ){
                attrs.ngClass= "{'ui-state-error': $error."+valObjName+"}";
            }
            ctrl.$parsers.unshift(function(viewValue) {

                var obj = scope.getPositionFromString(viewValue);

                if ( !obj ){
                    obj = {label: viewValue};
                }

                if ( attrs.validateRequired ){
                    var valid = obj['id'];
                    if ( valid ){
                        element.removeClass('ui-state-error');
                    } else {
                        element.addClass('ui-state-error');
                    }
                    ctrl.$setValidity(valObjName, valid);
                }

                return obj;
            });

            ctrl.$formatters.unshift(function(modelValue) {
                return modelValue ? modelValue.label : modelValue;
            });
        }
    };
});
