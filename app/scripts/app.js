'use strict';

angular.module('londonBusStopsApp', ['ui.map','ui.event','ui.bootstrap','ui.bootstrap.modal','ui.bootstrap.tpls','angularSpinner'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MapsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
