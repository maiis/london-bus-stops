'use strict';

angular.module('londonBusStopsApp', ['ui.map','ui.event'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MapsCtrl'
      })
      .when('/busStop/:busStopId', {
        templateUrl: 'views/next_arrivals.html',
        controller: 'ArrivalsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
