// People in space
$.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
    var number = data['number'];
    $('#spacepeeps').html(number);

    data['people'].forEach(function (d) {
         $('#astronames').append('<li>' + d['name'] + '</li>');
    });
});

// ISS pass times
$.getJSON('http://api.open-notify.org/iss-pass.json?lat=45.0&lon=-122.3&alt=20&n=5&callback=?', function(data) {
    data['response'].forEach(function (d) {
        var date = new Date(d['risetime']*1000);
         $('#isspass').append('<li>' + date.toString() + '</li>');
    });
});