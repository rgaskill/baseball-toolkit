requirejs.config({

    paths: {
        jQuery: 'vendor/jquery',
        jQueryUi: 'vendor/jquery-ui',
        Angular: 'vendor/angular',
        AngularResource: 'vendor/angular-resource.min',
        Controllers: 'controllers/controllers',
        Directives: 'directives/directives',
        Services: 'services/services'
    },

    shim: {
        'Modernizr': {exports: 'Modernizr'},
        'jQuery': {exports: 'jQuery'},
        'jQueryUi': {deps:['jQuery']},
        'Angular': {exports: 'angular'},
        'AngularResource': {
            deps: ['Angular'],
            exports: 'angularResource'
        }
    }

});

requirejs([
    'jQuery'
    , 'Angular'
    , 'AngularResource'
], function(jQuery, angular){

    angular.module('bbToolkit.services',['ngResource']);

    angular.module('bbToolkit.directives',[]);

    angular.module('bbToolkit.controllers',[]);

    angular.module('bbToolkit', ['bbToolkit.services', 'bbToolkit.controllers', 'bbToolkit.directives']);

    requirejs(['Controllers'
        ,'Directives'
        ,'Services'
    ], function(){

        angular.module('bbToolkit')
            .config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
            $routeProvider.when('/roster', {templateUrl: 'views/roster.html', controller: 'RosterCtrl'});
            $routeProvider.otherwise({redirectTo: '/roster'});
        }]);

        angular.element(document).ready(function() {
            angular.bootstrap(document, ['bbToolkit']);
        });
    });

});
