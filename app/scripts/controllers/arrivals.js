/* global jQuery:true */

'use strict';

angular.module('londonBusStopsApp')
  .controller('ArrivalsCtrl', function ($scope, $modal,$log) {
	  $scope.items = [];

	  $scope.open = function (marker) {
			jQuery('#loader').show().spin('large');
			var url = 'http://digitaslbi-id-test.herokuapp.com/bus-stops/'+marker.stopInfo.id;
			$scope.stopInfo = marker.stopInfo;
			jQuery.ajax({
			  dataType: 'jsonp',
			  url: url,
			  success: function(data) {
					jQuery('#loader').spin(false).hide();
					var modalInstance = $modal.open({
						templateUrl: 'nextArrivals.html',
						controller: 'ArrivalsInstanceCtrl',
						resolve: {
						  items: function () {
								data.infos = marker.stopInfo;
								$scope.items = data.arrivals;
						    return data;
						  }
						}
					});
					modalInstance.result.then(function (selectedItem) {
						$scope.items = selectedItem;
					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
			  },
			  error: function(xhr,status,error) {
					$log.info('Error', status,error);
			  }
			});
	  };

  })
  .controller('ArrivalsInstanceCtrl', function ($scope, $modalInstance, items) {
	  $scope.items = items;
	  $scope.selected = {
	    item: $scope.items[0]
	  };

	  $scope.ok = function () {
	    $modalInstance.close($scope.selected.item);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	});