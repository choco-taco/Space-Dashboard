// Access token
// pk.eyJ1IjoieXVrZXp0ZXIiLCJhIjoiY2p0dGp1NTF5MDRmcTQ0bzV5eWRoYmplYSJ9.h7kSaY8_0O3OCzc0oRpBtQ

(function(){
    var map = L.map('map').setView([51.505, -0.09], 13).setZoom(2);

    var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
        attribution: '',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    }).addTo(map);

    var issIcon = L.icon({
        iconUrl: 'assets/images/icon-iss.png',

        iconSize:     [77, 60], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var iss = L.marker([51.5, -0.09], {icon: issIcon}).addTo(map);

    function moveISS () {
        $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
            var lat = data['iss_position']['latitude'];
            var lon = data['iss_position']['longitude'];
            
            iss.setLatLng([lat, lon]);
            map.panTo([lat, lon]);
        });
        setTimeout(moveISS, 5000); 
    }

    moveISS();

    $('.tabular a[data-tab="first"]').on('click', function() {
        map.invalidateSize();
    });
}());