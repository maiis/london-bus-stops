/* global google:true, jQuery:true */
'use strict';

angular.module('londonBusStopsApp')
  .controller('MapsCtrl', function ($scope,$location,NextarrivalsService) {

		$scope.busStops = [];
		$scope.detailview = false;
  	$scope.isDetailsLoading = false;
  	$scope.ajaxInProgress = false;
  	$scope.currentAction = false;

		var myPosition;

		function handleNoGeolocation() {
			jQuery('.map-container').addClass('no-location');
		}

		function getBusStops() {
			$scope.ajaxInProgress = true;
			$scope.currentAction = 'bus';
			var bounds = $scope.myMap.getBounds(),
					northEast = bounds.getNorthEast(),
					southWest = bounds.getSouthWest(),
					marker,markerLatLng;

			NextarrivalsService.getBusStops(northEast,southWest).then(function(data) {
				$scope.ajaxInProgress = false;
				$scope.currentAction = false;
				jQuery.each(data.markers, function(i,markerInfo){
					markerLatLng = new google.maps.LatLng(markerInfo.lat,markerInfo.lng);
					marker = new google.maps.Marker({
						map: $scope.myMap,
						position: markerLatLng,
						icon: 'images/london-buses-logo.png'
					});

					marker.stopInfo = markerInfo;
					$scope.busStops.push(marker);
				});
			});
		}

		$scope.showNextArrivals = function(busStop) {
			$scope.detailview = true;
			$scope.isDetailsLoading = true;
			$scope.busStopInfo = busStop.stopInfo;
			$scope.currentAction = 'next';
			NextarrivalsService.getNextArrivals(busStop.stopInfo.id).then(function(data) {
				$scope.isDetailsLoading = false;
				$scope.nextArrivals = data;
				$scope.currentAction = false;
			});
		};

		$scope.closeNextArrivals = function() {
			$scope.detailview = false;
			$scope.nextArrivals = [];
		};

		$scope.mapOptions = {
      center: new google.maps.LatLng(51.511214, -0.119824),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

		if(navigator.geolocation) {
			$scope.currentAction = 'geo';
		  navigator.geolocation.getCurrentPosition(function(position) {
		    myPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		    $scope.myMap.setCenter(myPosition);
		    $scope.myMap.setZoom(17);
		    $scope.currentAction = false;
		    getBusStops();

		    google.maps.event.clearListeners($scope.myMap, 'click');

				google.maps.event.addListener($scope.myMap, 'zoom_changed', function() {
					getBusStops();
				});
				google.maps.event.addListener($scope.myMap, 'center_changed', function() {
					getBusStops();
				});
		  }, function() {
		    handleNoGeolocation();
		  });
		} else {
		  handleNoGeolocation();
		}

  });