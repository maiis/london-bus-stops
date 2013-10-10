"use strict";angular.module("londonBusStopsApp",["ui.map","ui.bootstrap","ui.bootstrap.modal","ui.bootstrap.tpls","angularSpinner"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MapsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("londonBusStopsApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("londonBusStopsApp").controller("MapsCtrl",["$scope",function(a){function b(){console.warn("no location")}function c(b,c,d){google.maps.event.addListener(b,"click",function(){a.open(c,d)})}function d(){var b,d,e=a.myMap.getBounds(),f=e.getNorthEast(),g=e.getSouthWest(),h="http://digitaslbi-id-test.herokuapp.com/bus-stops?northEast="+f.lb+","+f.mb+"&southWest="+g.lb+","+g.mb;jQuery.ajax({dataType:"jsonp",url:h,success:function(e){console.warn(e),a.loading=!1,jQuery.each(e.markers,function(e,f){d=new google.maps.LatLng(f.lat,f.lng),b=new google.maps.Marker({position:d,icon:"images/london-buses-logo.png"}),b.setMap(a.myMap),c(b,f,f.id)})},error:function(a,b,c){console.warn("fail",b,c)}})}a.loading=!0;var e;navigator.geolocation?navigator.geolocation.getCurrentPosition(function(b){e=new google.maps.LatLng(b.coords.latitude,b.coords.longitude),a.myMap.setCenter(e),d(),google.maps.event.addListener(a.myMap,"zoom_changed",function(){d()}),google.maps.event.addListener(a.myMap,"center_changed",function(){d()})},function(){b()}):b(),a.mapOptions={center:new google.maps.LatLng(35.784,-78.67),zoom:17,mapTypeId:google.maps.MapTypeId.ROADMAP}}]),angular.module("londonBusStopsApp").controller("ModalCtrl",["$scope","$modal","$log",function(a,b,c){a.items=[],a.open=function(d,e){a.loading=!0;var f="http://digitaslbi-id-test.herokuapp.com/bus-stops/"+e;a.stopInfo=d,jQuery.ajax({dataType:"jsonp",url:f,success:function(e){a.loading=!1;var f=b.open({templateUrl:"nextArrivals.html",controller:"ModalInstanceCtrl",resolve:{items:function(){return e.infos=d,a.items=e.arrivals,e}}});f.result.then(function(b){a.items=b},function(){c.info("Modal dismissed at: "+new Date)})},error:function(){return!1}})}}]).controller("ModalInstanceCtrl",["$scope","$modalInstance","items",function(a,b,c){a.items=c,a.selected={item:a.items[0]},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}]);