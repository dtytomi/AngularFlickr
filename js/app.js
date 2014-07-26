/*************************
    Google Map
**************************/

myApp = {

    init: function() {
        myApp.config = {
            geocoder: new google.maps.Geocoder(),
            mapOptions: {
                zoom: 15,
                center: new google.maps.LatLng(6.3456, 80),
                mapTypeId: 'roadmap'
            },
            infowindow: new google.maps.InfoWindow(),
        };

        google.maps.event.addDomListener(window, 'load', myApp.geo);
        
    },
    geo: function(){
       myApp.config.map = new google.maps.Map(document.getElementById('map_canvas'), myApp.config.mapOptions);
    },
    codeLatLng: function(lat, lng){ 
        var latlng = new google.maps.LatLng(lat, lng);
        myApp.config.geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    myApp.config.map.setZoom(15);
                    myApp.config.marker = new google.maps.Marker({
                        position: latlng,
                        map: myApp.config.map
                    });
                    myApp.config.infowindow.setContent(results[1].formatted_address);
                    myApp.config.infowindow.open(myApp.config.map, myApp.config.marker);
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
};
        $( document ).ready( myApp.init );
    /*************************
      Image Loaded by Default
    **************************/
(function (){
    
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
                });
        };
        $scope.locate = function(val){
            console.log(val);
            console.log(val.latitude);
            console.log(val.longitude);
            myApp.codeLatLng(val.latitude, val.longitude)
        };
        $http({method: 'jsonp', url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6bf279c5f9d9e36bea5b3fb83f7a44f6&tags='+ findPix +'&has_geo=1&extras=geo&format=json&jsoncallback=JSON_CALLBACK'})
            .success(function(data, config){
                
                 pics.results = data.photos.photo;
                });
            
    }]);

})();
