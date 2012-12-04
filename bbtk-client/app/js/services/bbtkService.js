define(['Angular', 'bbtkApp'],function(angular) {

    angular.module('bbToolkit.services').factory('BbtkService', ['$resource', function($resource) {

        return {
            Player: $resource('service/player/:id',{id: '@id'})

        };

    }]);

});