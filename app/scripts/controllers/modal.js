/* global jQuery:true */

'use strict';

angular.module('londonBusStopsApp')
  .controller('ModalCtrl', function ($scope, $modal, $log) {
	  $scope.items = [];

	  $scope.open = function (stopInfo,id) {
			$scope.loading = true;
			var url = 'http://digitaslbi-id-test.herokuapp.com/bus-stops/'+id;
			$scope.stopInfo = stopInfo;
			jQuery.ajax({
			  dataType: 'jsonp',
			  url: url,
			  success: function(data) {
					$scope.loading = false;
					var modalInstance = $modal.open({
						templateUrl: 'nextArrivals.html',
						controller: 'ModalInstanceCtrl',
						resolve: {
						  items: function () {
								data.infos = stopInfo;
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