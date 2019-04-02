// Picture of the day

function reqAPOD() {
    var urlQuery = 'https://api.nasa.gov/planetary/apod?api_key=2f8aJAjNNh8BekW6ZgjWpdqXBhrtZoQCX12mfhla';

    $.ajax({
        url: urlQuery,
        method: 'GET'
    }).then(function(response) {
        renderPhoto(response);
    })
}

function renderPhoto(photoObj) {

    var photo = $('<img>', {
        'attr': {
            'src': photoObj.url
        },
        'class': 'img-fluid rounded mx-auto d-block'
    });
    var title = $('<h1>').text(photoObj.title);
    var explanation = $('<p>').text(photoObj.explanation);

    $('#apod').append(photo, title, explanation);
}

reqAPOD();