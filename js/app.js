(function (){


	/*************************
		Google Map
	**************************/

	var geocoder;
	var map;
	var infowindow = new google.maps.InfoWindow();
	var marker;

	function initialize() {
	  geocoder = new google.maps.Geocoder();
		  
		  var latlng = new google.maps.LatLng(6.3456, 80);
		  var mapOptions = {
		    zoom: 15,
		    center: latlng,
		    mapTypeId: 'roadmap'
		  }

		  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		
	}
	
	function codeLatLng(lat, lng) {
		
		  var latlng = new google.maps.LatLng(lat, lng);
		
		  geocoder.geocode({'latLng': latlng}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		      if (results[1]) {
		        map.setZoom(15);
		        marker = new google.maps.Marker({
		            position: latlng,
		            map: map

		        });

		        infowindow.setContent(results[1].formatted_address);
		        infowindow.open(map, marker);
		      } 
		      else {
		        alert('No results found');
		      }

		    } 
		    else {
		      alert('Geocoder failed due to: ' + status);
		    }

		  });

		}

		google.maps.event.addDomListener(window, 'load', initialize);


	/*************************
	  Image Loaded by Default
	**************************/
	
		var app = angular.module('flickr', []);
		
		app.controller("flickrController", ["$http", "$scope", function( $http, $scope){

			var pics = this;
			var findPix = 'Lagos, Nigeria';
			 
			var config = {
	            params: {
	                api_key: "6bf279c5f9d9e36bea5b3fb83f7a44f6",
	                
	            }
       		 };

       		 $scope.search = function(){
       		 	
       		 	$scope.picture = "";

       		 	$http({method: 'jsonp', url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6bf279c5f9d9e36bea5b3fb83f7a44f6&tags='+ $scope.picture +'&has_geo=1&extras=geo&format=json&jsoncallback=JSON_CALLBACK'})
				.success(function(data, config){
					
					 pics.results = data.photos.photo;
					 

					 console.log(data.photos.photo);
					 console.log(data);

				});
       		 };

       		 $scope.locate = function(val){
       		 	console.log(val);
       		 	console.log(val.latitude);
       		 	console.log(val.longitude);

       		 	codeLatLng(val.latitude, val.longitude)

       		 };
			
			$http({method: 'jsonp', url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6bf279c5f9d9e36bea5b3fb83f7a44f6&tags='+ findPix +'&has_geo=1&extras=geo&format=json&jsoncallback=JSON_CALLBACK'})
				.success(function(data, config){
					
					 pics.results = data.photos.photo;
					 

					 console.log(data.photos.photo);
					 console.log(data);

				});

		

		}]);

		
})();






