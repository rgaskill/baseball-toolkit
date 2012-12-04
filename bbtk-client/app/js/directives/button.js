define(['Angular', 'bbtkApp','jQueryUi'],function(angular) {

    angular.module('bbToolkit.directives').directive('button',function() {
        return {
            restrict: 'E',
            link: function(scope, elm, attrs){
    //            conslole.log("button");
                elm.button();
            }
        };
    });

});

