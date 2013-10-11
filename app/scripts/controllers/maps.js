/* global google:true, jQuery:true */
'use strict';

angular.module('londonBusStopsApp')
  .controller('MapsCtrl', function ($scope) {
		jQuery('#loader').spin('large').show();
		$scope.busStops = [];
		var myPosition;

		function handleNoGeolocation() {
			jQuery('.map-container').addClass('no-location');
		}

		function attachMarkerClick(marker,stopInfo,id) {
			google.maps.event.addListener(marker, 'click', function() {
			  $scope.open(stopInfo,id);
			});
		}

		function getBusStops() {
			var bounds = $scope.myMap.getBounds(),
					northEast = bounds.getNorthEast(),
					southWest = bounds.getSouthWest(),
					url = 'http://digitaslbi-id-test.herokuapp.com/bus-stops?northEast='+northEast.lb+','+northEast.mb+'&southWest='+southWest.lb+','+southWest.mb+'',
					marker,markerLatLng;

			jQuery.ajax({
			  dataType: 'jsonp',
			  url: url,
			  success: function(data) {
					$scope.loading = false;
					jQuery.each(data.markers, function(i,markerInfo){
						markerLatLng = new google.maps.LatLng(markerInfo.lat,markerInfo.lng);

						var marker = new google.maps.Marker({
							map: $scope.myMap,
							position: markerLatLng,
							icon: 'images/london-buses-logo.png'
						});

						marker.stopInfo = markerInfo;
						$scope.busStops.push(marker);


					});

					$scope.showNextArrivals = function(busStop) {
						$scope.open(busStop);
					};
			  },
			  error: function(xhr,status,error) {
			    console.log('fail',status,error);
			  }
			});
		}

		if(navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(function(position) {
		    myPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		    $scope.myMap.setCenter(myPosition);
		    $scope.myMap.setZoom(17);
		    jQuery('#loader').spin(false).hide();
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
		}
		// Browser doesn't support Geolocation
		else {
		  handleNoGeolocation();
		}


    $scope.mapOptions = {
      center: new google.maps.LatLng(51.511214, -0.119824),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  });