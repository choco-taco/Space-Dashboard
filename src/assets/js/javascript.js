// NASA

// MY KEY 2f8aJAjNNh8BekW6ZgjWpdqXBhrtZoQCX12mfhla

// - APOD https://api.nasa.gov/planetary/apod 
// - Asteroids 
//   - Feed: https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE
//   - Lookup: https://api.nasa.gov/neo/rest/v1/neo/ 
//   - Browse: https://api.nasa.gov/neo/rest/v1/neo/browse/
// - Mars Rovers
// 
//   Abbr 	    Camera 	                    Curiousity Opportunity Spirit
//   FHAZ 	    Front Hazard Avoidance Camera 	✔ 	    ✔ 	        ✔
//   RHAZ 	    Rear Hazard Avoidance Camera 	✔ 	    ✔ 	        ✔
//   MAST 	    Mast Camera 	                ✔
//   CHEMCAM    Chemistry and Camera Complex    ✔ 	
//   MAHLI 	    Mars Hand Lens Imager 	        ✔
//   MARDI 	    Mars Descent Imager 	        ✔
//   NAVCAM 	Navigation Camera 	            ✔ 	    ✔ 	        ✔ 
//   PANCAM 	Panoramic Camera 		                 ✔ 	         ✔
//   MINITES 	Miniature Thermal  		                 ✔ 	         ✔
//              Emission Spectrometer (Mini-TES)

//   - By sol: https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&                     camera=fhaz&api_key=DEMO_KEY
//   - By date: https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?                              earth_date=2015-6-3&api_key=DEMO_KEY
//   - Manifest: /manifests/rover_name


$('.ui.radio.checkbox')
  .checkbox()
;

(function(){

    function reqRoverImages(rover, sol) {
        
        var urlQuery = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=2f8aJAjNNh8BekW6ZgjWpdqXBhrtZoQCX12mfhla`;

        $.ajax({
            url: urlQuery,
            method: 'GET',
        }).then(function(response) {

        })
    }

    // function renderRoverImages();

}())

(function(){

    $(document).ready(function() {

        var date = new Date();

        var year = date.getUTCFullYear().toString();
        var utcMonth = date.getUTCMonth() + 1;
        var month = utcMonth < 10 ? '0' + (utcMonth).toString() : (utcMonth).toString();
        var day = date.getUTCDate().toString();

        date = year + '-' + month + '-' + day;

        $('#date-input').val(date);
        reqAsteroids(date);
    });

    function reqAsteroids(startDate) {

        var urlQuery = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=2f8aJAjNNh8BekW6ZgjWpdqXBhrtZoQCX12mfhla`;

        $.ajax({
            url: urlQuery,
            method: 'GET',
        }).then(function(response) {
            if(response) {
                renderAsteroids(response);
            } else {
                console.log('a');
            }
        });
    }

    function reqPrevOrNextAsteroids(urlQuery) {
        $.ajax({
            url: urlQuery,
            method: 'GET',
        }).then(function(response) {
            if(response) {
                renderAsteroids(response);
            } else {
                console.log('a');
            }
        });
    }

    function renderAsteroids(Obj) {

        $('#prev-button').data('prev-link', Obj.links.prev);
        $('#next-button').data('next-link', Obj.links.next);

        $('#asteroids-table-body').empty();

        var nearEarthObjects = Obj.near_earth_objects;

        Object.values(nearEarthObjects)[0].forEach(function(asteroid) {
                
            var name = asteroid.name;
            var estimatedDiameter = asteroid.estimated_diameter.meters.estimated_diameter_max;
            var approachDate = asteroid.close_approach_data[0].close_approach_date;
            var relativeVelocity = asteroid.close_approach_data[0]                       .relative_velocity.kilometers_per_hour;
            var missDistance = asteroid.close_approach_data[0].miss_distance.kilometers;

            var date = new Date(Date.parse(approachDate));
            
            // Here we make the dynamic asteroid table rows
            // <tr>
            //     <td class="name" data-label="Name"></td>
            //     <td class="estimated-diameter" data-label="Estimated Diameter"></td>
            //     <td class="approach-date" data-label="Closest Approach Date"></td>
            //     <td class="relvative-velocity" data-label="Relative Velocity"></td>
            //     <td class="miss-distance" data-label="Miss Distance"></td>
            // </tr>

            var tr = $('<tr>');

            var nameTd = $('<td>');
            var estimatedDiameterTd = $('<td>');
            var approachDateTd = $('<td>');
            var relativeVelocityTd = $('<td>');
            var missDistanceTd = $('<td>');

            nameTd.addClass('name');
            nameTd.attr('data-label','Name');
            estimatedDiameterTd.addClass('name');
            estimatedDiameterTd.attr('data-label','Name');
            approachDateTd.addClass('name');
            approachDateTd.attr('data-label','Name');
            relativeVelocityTd.addClass('name');
            relativeVelocityTd.attr('data-label','Name');
            missDistanceTd.addClass('name');
            missDistanceTd.attr('data-label','Name');

            nameTd.text(name);
            estimatedDiameterTd.text(estimatedDiameter + ' m');
            approachDateTd.text(approachDate);
            relativeVelocityTd.text(relativeVelocity + ' k/h');
            missDistanceTd.text(missDistance + ' km');

            tr.append(nameTd);
            tr.append(estimatedDiameterTd);
            tr.append(approachDateTd);
            tr.append(relativeVelocityTd);
            tr.append(missDistanceTd);

            $('#asteroids-table-body').append(tr);

            $('#date-input').val(Object.keys(nearEarthObjects)[0]);
        });
    }

    $('#date-button').on('click', function() {
        var dateValue = $('#date-input').val();      
        reqAsteroids(dateValue);
    });

    $('#prev-button').on('click', function() {
        reqPrevOrNextAsteroids($(this).data('prev-link'));
    });

    $('#next-button').on('click', function() {
        reqPrevOrNextAsteroids($(this).data('next-link'));
    });


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

}())