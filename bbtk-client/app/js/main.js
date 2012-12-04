requirejs.config({

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

requirejs([
    'jQuery',
    'Angular',
    'bbtk'
], function(jQuery, angular){

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['bbToolkit']);
    });

});
