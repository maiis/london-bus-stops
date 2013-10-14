'use strict';

angular.module('londonBusStopsApp')
  .service('NextarrivalsService', function Nextarrivals($http,$q,$routeParams) {

  	 this.getBusStops = function(northEast,southWest) {
			var deferred = $q.defer();
			var url = 'http://digitaslbi-id-test.herokuapp.com/bus-stops?northEast='+northEast.lb+','+northEast.mb+'&southWest='+southWest.lb+','+southWest.mb+'&callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data) {
				deferred.resolve(data);
			}).error(function(err){
				deferred.reject(err);
      });
			return deferred.promise;
    };

    this.getNextArrivals = function(id) {
			var deferred = $q.defer();
			var url = 'http://digitaslbi-id-test.herokuapp.com/bus-stops/'+id+'?callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data) {
				deferred.resolve(data);
			}).error(function(err){
				deferred.reject(err);
      });
			return deferred.promise;

    };

   });
