// NASA

// MY KEY 2f8aJAjNNh8BekW6ZgjWpdqXBhrtZoQCX12mfhla

// - APOD https://api.nasa.gov/planetary/apod 
// - Asteroids 
//   - Feed: https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE
//   - Lookup: https://api.nasa.gov/neo/rest/v1/neo/ 
//   - Browse: https://api.nasa.gov/neo/rest/v1/neo/browse/



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

}())