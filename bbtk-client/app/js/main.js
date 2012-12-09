require(['require', 'requireConfig'], function(require) {
    'use strict';
    require([
        'jQuery',
        'Angular',
        'bbtk'
    ], function(jQuery, angular){
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['bbToolkit']);
        });
    });
});
