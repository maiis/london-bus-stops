/* global jQuery:true */

'use strict';

angular.module('londonBusStopsApp')
  .controller('ModalCtrl', function ($scope, $modal, $log) {
	  $scope.items = [];
	  $scope.stopInfo = [];

	  $scope.open = function (stopInfo,id) {
			var url = 'http://digitaslbi-id-test.herokuapp.com/bus-stops/'+id;
			$scope.stopInfo = stopInfo;
			console.warn("MMMM",stopInfo);
			jQuery.ajax({
			  dataType: 'jsonp',
			  url: url,
			  success: function(data) {
					var modalInstance = $modal.open({
						templateUrl: 'nextArrivals.html',
						controller: 'ModalInstanceCtrl',
						resolve: {
						  items: function () {
						  	console.warn(data.arrivals);
						  	data.infos = stopInfo;
						  	console.warn(data);
						    return data;
						  }
						}
					});
					modalInstance.result.then(function (selectedItem) {
						$scope.nextArrivals = selectedItem;
					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
			  },
			  error: function(xhr,status,error) {
			    return false;
			  }
			});



	  };

  })
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
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