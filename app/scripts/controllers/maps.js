/* global google:true, jQuery:true */
'use strict';

angular.module('londonBusStopsApp')
  .controller('MapsCtrl', function ($scope) {
		$scope.loading = true;
		var myPosition;

		function handleNoGeolocation() {
			console.warn('no location');
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
					console.warn(data);
					$scope.loading = false;
					jQuery.each(data.markers, function(i,markerInfo){
						markerLatLng = new google.maps.LatLng(markerInfo.lat,markerInfo.lng);

						marker = new google.maps.Marker({
							position: markerLatLng,
							icon: 'images/london-buses-logo.png'
						});

						marker.setMap($scope.myMap);
						attachMarkerClick(marker,markerInfo,markerInfo.id);

					});
			  },
			  error: function(xhr,status,error) {
			    console.warn('fail',status,error);
			  }
			});
		}

		// Try W3C Geolocation (Preferred)
		if(navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(function(position) {
		    myPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		    $scope.myMap.setCenter(myPosition);
		    getBusStops();

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
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  });