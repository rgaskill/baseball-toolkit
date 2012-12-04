define([
    'Angular',
    'AngularResource',
    'AngularUi'
], function(angular) {

    angular.module('bbToolkit.services',['ngResource']);

    angular.module('bbToolkit.directives',[]);

    angular.module('bbToolkit.controllers',[]);

    angular.module('bbToolkit', ['bbToolkit.services', 'bbToolkit.controllers', 'bbToolkit.directives', 'ui']);

});