require.config({

    paths: {
        jQuery: 'vendor/jquery',
        jQueryUi: 'vendor/jquery-ui',
        Angular: 'vendor/angular',
        AngularResource: 'vendor/angular-resource.min',
        AngularUi: 'vendor/angular-ui'
    },

    shim: {
        'jQuery': {},
        'jQueryUi': {deps:['jQuery']},
        'Angular': {deps: ['jQuery'], exports: 'angular'},
        'AngularResource': {
            deps: ['Angular'],
            exports: 'angularResource'
        },
        'AngularUi': {
            deps: ['Angular'],
            exports: 'angularUi'
        }
    }

});

require([
    'jQuery',
    'Angular',
    'bbtk'
], function(jQuery, angular){
    'use strict';
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['bbToolkit']);
    });

});
