var map, infoWindow;
var orig
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10.75,
    center: { lat: 40.7128, lng: -74.006 } // location of NYC
  });

  window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          orig = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        
        }, function(error) {
            alert('Error occurred. Error code: ' + error.code);         
        },{timeout:5000});
    }else{
        alert('no geolocation support');
    }
};

  fetch("https://s3.amazonaws.com/litter-basket/data.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Work with JSON data here
      /*
      navigator.geolocation.getCurrentPosition(function(position) {
        orig = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      */
      for (let i = 0; i < data.features.length; i++) {
        var latlng = {
          lat: data.features[i].geometry.coordinates[1],
          lng: data.features[i].geometry.coordinates[0]
        };
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: "Litter Basket",
          url: ""
        }) 
        /*
        let markerLink = "https://www.google.com/maps/dir/?api=1" + "&origin=" + orig[lat] + "," + orig[lng] +
                            "&destination=" + latlng[lat] + "," + latlng[lng]
        marker.url = markerLink
        */
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        google.maps.event.addListener(marker, "click", function() {
          markerLink = "https://www.google.com/maps/dir/?api=1" + "&origin=" + orig.lat + "," + orig.lng +
                            "&destination=" + data.features[i].geometry.coordinates[1] + "," + data.features[i].geometry.coordinates[0]
          directionsDisplay.setMap(map);
          prompt('xd')
          //console.log(href.match(/([^\/]*)\/*$/)[1]);
          window.open(markerLink);

          
          console.log(
            data.features[i].geometry.coordinates[1],
            data.features[i].geometry.coordinates[0]
          );
          var dest = new google.maps.LatLng(
            data.features[i].geometry.coordinates[1],
            data.features[i].geometry.coordinates[0]
          );
          var request = {
            origin: orig,
            destination: dest,
            travelMode: "WALKING"
          };
          directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK)
              directionsDisplay.setDirections(result);
          });
        });
      }
    })
    .catch(err => {
      console.log("Error failed to get data", err);
    });

  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
        map.setZoom(17);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
