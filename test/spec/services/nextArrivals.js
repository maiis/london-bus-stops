'use strict';

describe('Service: nextArrivals', function () {

  // load the service's module
  beforeEach(module('londonBusStopsApp'));

  // instantiate service
  var nextArrivals;
  beforeEach(inject(function (_nextArrivals_) {
    nextArrivals = _nextArrivals_;
  }));

  it('should do something', function () {
    expect(!!nextArrivals).toBe(true);
  });

});
