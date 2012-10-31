'use strict';

describe('Controller: RosterCtrl', function() {

  // load the controller's module
  beforeEach(module('baseballToolkitApp'));

  var RosterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    RosterCtrl = $controller('RosterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
