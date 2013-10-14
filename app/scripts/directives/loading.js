/* global jQuery:true */

'use strict';

angular.module('londonBusStopsApp')
.directive('loading', function () {
	return {
		restrict: 'E',
		replace:true,
		template: '<div class="loading"></div>',
		link: function (scope, element) {
			scope.$watch('ajaxInProgress', function (val) {
				if (val) {
					jQuery(element).spin('large').show();
					jQuery(element).parent().addClass('busy');
				} else {
					jQuery(element).spin(false).hide();
					jQuery(element).parent().removeClass('busy');
				}
			});
		}
	};
})
.directive('loadingdetails', function () {
	return {
		restrict: 'E',
		replace:true,
		template: '<div class="loading"></div>',
		link: function (scope, element) {
			scope.$watch('isDetailsLoading', function (val) {
				if (val) {
					jQuery(element).spin('large').show();
					jQuery(element).parent().addClass('busy');
				} else {
					jQuery(element).spin(false).hide();
					jQuery(element).parent().removeClass('busy');
				}
			});
		}
	};
});

