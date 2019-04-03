(function(){

    // Launches

    function countdown(nextLaunchObj) {
        var launchDate = moment(nextLaunchObj.launch_date_local);
        var intervalId = setInterval(function() {
            var duration = moment.duration(launchDate.diff(moment()));
            const formatted = moment(duration._data).format("DD:HH:mm:ss");
            $('#launch-time').text(formatted);
        }, 1000);
    }

    function reqNextLaunch() {
        var urlQuery = 'https://api.spacexdata.com/v3/launches/next';
        $.ajax({
            url: urlQuery,
            method: 'GET'
        }).then(function(response) {
            countdown(response);
        });
    }

    reqNextLaunch();

    function renderUpcomingLaunches(arr) {

        arr.forEach(function(launch) {
            var tr = $('<tr>');

            var name = $('<td>');
            var date = $('<td>');
            var rocket = $('<td>');
            var payload = $('<td>');

            name.attr('data-label', 'Name');
            date.attr('data-label', 'Date');
            rocket.attr('data-label', 'Rocket');
            payload.attr('data-label', 'Total payload');

            name.text(launch.mission_name);
            date.text(launch.launch_date_local)
            rocket.text(launch.rocket.rocket_name);

            var payloadKg = 0;
            
            launch.rocket.second_stage.payloads.forEach(function(payload) {
                payloadKg += payload.payload_mass_kg === 'null' ?  0 : payload.payload_mass_kg;
            });

            payloadKg = payloadKg === 0 ? 'N/A' : payloadKg;
            
            payload.text(payloadKg);

            tr.append(name, date, rocket, payload);

            $('#upcoming-launches').append(tr);
        });
    }

    function reqUpcomingLaunches() {
        $.ajax({
            url: 'https://api.spacexdata.com/v3/launches/upcoming',
            method: 'GET',
            timeout: 0,
            }).then(function (response) {
            renderUpcomingLaunches(response);
            });
    }

    reqUpcomingLaunches();

    // Missions

    function renderMissions(arr) {
        
        arr.forEach(function(mission) {

            var div = $('<div>');
            var missionName = $('<h3>');
            var wikiLink = $('<p>');
            var link = $('<span>');
            var description = $('<p>');

            div.addClass('py-4');
            wikiLink.addClass('small');

            missionName.text(mission.mission_name);
            link.text(mission.wikipedia);
            description.text(mission.description);

            wikiLink.append(link);
            div.append(missionName , wikiLink, description);

            $('#missions').append(div);

        });
    }

    function reqMissions() {

        $.ajax({
            url: 'https://api.spacexdata.com/v3/missions',
            method: 'GET'
        }).then(function(response) {
            renderMissions(response);
        });
    }

    reqMissions();

    // Rockets

    function renderRockets(arr) {

        arr.forEach(function(rocket) {

            var tr = $('<tr>');

            var name = $('<td>').attr('data-label', 'Name');
            var height = $('<td>').attr('data-label', 'Height');
            var diameter = $('<td>').attr('data-label', 'Diameter');
            var mass = $('<td>').attr('data-label', 'Mass');
            var successRate = $('<td>').attr('data-label', 'Success Rate');
            var costPerLaunch = $('<td>').attr('data-label', 'Cost Per Launch');
            var active = $('<td>').attr('data-label', 'Active');

            name.text(rocket.rocket_name);
            height.text(rocket.height.meters + ' m');
            diameter.text(rocket.diameter.meters + ' m');
            mass.text(rocket.mass.kg + ' kg');
            successRate.text(rocket.success_rate_pct + '%');
            costPerLaunch.text('$' + rocket.cost_per_launch);
            active.text(rocket.active);

            tr.append(name, height, diameter, mass, successRate, costPerLaunch, active);

            $('#rockets').append(tr);
        });
    }

    function reqRockets() {

        $.ajax({
            url: 'https://api.spacexdata.com/v3/rockets',
            method: 'GET'
        }).then(function(response) {
            renderRockets(response);
        });
    }

    reqRockets();
}())