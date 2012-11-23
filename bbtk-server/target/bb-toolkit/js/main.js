//<script src="js/vendor/modernizr-2.6.2.min.js"></script>
//<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
//    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
//        <script src="js/vendor/jquery-ui.js"></script>
//        <script src="js/jquery.dataTables.js"></script>
//        <script src="js/plugins.js"></script>
//        <script src="js/main.js"></script>
//        <script src="js/vendor/angular.js"></script>
//        <script src="js/vendor/angular-resource.js"></script>
//        <script src="js/vendor/angular-sanitize.js"></script>
//        <script src="js/inspectit-app.js"></script>
//        <script src="js/directives/inspectit/header.js"></script>
//        <script src="js/directives/inspectit/content.js"></script>
//        <script src="js/directives/inspectit/nav.js"></script>
//        <script src="js/controllers/inspectit/header-ctrl.js"></script>
//        <script src="js/controllers/inspectit/main-page-ctrl.js"></script>
//        <script src="js/controllers/inspectit/recent-items-ctrl.js"></script>
//        <script src="js/controllers/inspectit/accounts-ctrl.js"></script>
//        <script src="js/controllers/inspectit/contacts.js"></script>
//        <script src="js/directives/jquery-ui/button.js"></script>
//        <script src="js/directives/jquery-ui/tabs.js"></script>
//        <script src="js/directives/jquery-ui/datatable.js"></script>

requirejs.config({

    paths: {
        jQuery: 'vendor/jquery',
        jQueryUi: 'vendor/jquery-ui',
        Angular: 'vendor/angular',
        Controllers: 'controllers/controllers',
        Directives: 'directives/directives',
        Services: 'services/services'
    },

    shim: {
        'Modernizr': {exports: 'Modernizr'},
        'jQuery': {exports: 'jQuery'},
        'jQueryUi': {deps:['jQuery']},
        'Angular': {exports: 'angular'}
    }

});

requirejs([
    'jQuery'
    , 'Angular'
], function(jQuery, angular){

    angular.module('bbToolkit.services',[]);

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
