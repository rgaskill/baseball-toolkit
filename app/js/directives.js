'use strict';

/* Directives */


var module = angular.module('bbToolkit.directives', []);

module.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);



module.directive('positionAutocomplete', function () {
    return function (scope, element, attrs) {
        var expression = attrs.positionAutocomplete;
        var src = scope.$eval(expression);
        var autoComplete = element.autocomplete(src);

        var fireInput = function (eventType, event, ui) {
            setTimeout(function () {
                //ui-state-disabled prevents events from being fired to the autocomplete widget.
                element.addClass('ui-state-disabled');
                element.trigger('input');
                element.removeClass('ui-state-disabled');
                if (src[eventType]) {
                    src[eventType](event, ui);
                }
            }, 0);
        };

        autoComplete.data("autocomplete").option('focus', function (event, ui) {
            fireInput('focus', event, ui);
        });

        autoComplete.data("autocomplete").option('select', function (event, ui) {
            fireInput('select', event, ui);
        });

    };
});
