define(['Angular', 'bbtkApp', 'jQueryUi'],function(angular) {
    'use strict';
    angular.module('bbToolkit.directives').directive('listClick', function() {
        return function(scope, elm, attrs){
            elm.autocomplete( "option", "minLength", 0 );
//            elm.data("autocomplete").option('minLength', 0);
            elm.click(function() {
                elm.data("autocomplete").search('');
            });
        };
    });

});