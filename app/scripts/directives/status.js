/* global jQuery:true */

'use strict';

angular.module('londonBusStopsApp')
  .directive('status', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace:true,
      link: function postLink(scope, element) {

				scope.$watch('currentAction', function (val) {
					var txt = '';
					switch (val) {
					case 'geo':
						txt = 'Getting current position…';
						break;
					case 'bus':
						txt = 'Retriving bus stops…';
						break;
					case 'next':
						txt = 'Next bus coming in…';
						break;
					default:
						txt = '';
					}
					if (val && txt) {
						jQuery(element).html('<div class="alert alert-info status-update">'+txt+'</div>').show();
					} else {
						jQuery(element).empty().hide();
					}
				});

      }
    };
  });
