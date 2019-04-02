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

(function (){

    const db = firebase.firestore();
    const fbImages = db.collection('liked_images');

    var rover;
    var sol;
    var page;
    var morePhotos;

    $('#sol-input').val('');

    function createLightGallery() {
        $('#animated-thumbnails').lightGallery();
    }

    function reqRoverImages(rover, sol, pg) {

        var urlQuery = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${pg}&api_key=2f8aJAjNNh8BekW6ZgjWpdqXBhrtZoQCX12mfhla`;
        console.log(urlQuery);

        $.ajax({
            url: urlQuery,
            method: 'GET',
        }).then(function(response) {
            renderRoverImages(response);
        });
    }

    function renderRoverImages(imagesObj) {

        if (page === 1) {
            $('#animated-thumbnails').empty();
        }

        if ($('#animated-thumbnails').data('lightGallery')) {
            $('#animated-thumbnails').data('lightGallery').destroy(true);
        }

        var imagesArr = imagesObj.photos;

        if (imagesArr.length) {

            // Get firebase likes
            fbImages.get().then(function(snapshot) {
                // Loop through snapshot
                // And store image ids and likes in an object
                var existingLikedImages = {};
                snapshot.forEach(function(doc) {
                    existingLikedImages[doc.id] = doc.data().likes;
                });
        
                $('#no-images-alert').addClass('d-none');
                $('#animated-thumbnails').removeClass('h-auto');

                imagesArr.forEach(function(imageObj) {
        
                    var imageId = imageObj.id;

                    var fb_likes = Object.getOwnPropertyNames(existingLikedImages)
                                    .includes(imageId.toString()) ? existingLikedImages[imageId] : 0;
        
                    var div = $('<div>');
                    var camera = $('<h4>');
                    var date = $('<p>');
                    var like = $('<a>', {
                        'class': 'like',
                        'html': '<i class="thumbs up outline icon"></i>',
                        'data-id': imageId,
                    });
                    var likesSpan = $('<span>', {
                        'class': 'likes',
                        'text': fb_likes,
                    });
                    var likes = $('<p>', {
                        'text': 'Likes: ',
                        'attr': {
                            'href': '#',
                            'onclick': 'return false;',
                            'data-id': imageId,
                        }
                    });

                    div.attr('id', imageId);
                    div.addClass('d-none');
                    camera.text(imageObj.camera.full_name);
                    date.text(imageObj.earth_date);
                    likes.append(likesSpan);
                    div.append(camera, date, like, likes);
        
                    $('#captions').append(div);
                    
                    var anchor = $('<a>');
                    var img = $('<img>');

                    anchor.attr('href', imageObj.img_src);
                    anchor.attr('data-sub-html', '#' + imageId);
                    img.attr('src', imageObj.img_src);
        
                    anchor.append(img);
                    $('#animated-thumbnails').append(anchor);

                });

                createLightGallery();
                $(".mygallery").justifiedGallery();
                
                if (imagesArr.length === 25) {

                    $('#rover-load-more-button').removeClass('d-none');
                    $('#back-to-top-button').removeClass('d-none');
                    morePhotos = true;

                } else {

                    $('#rover-load-more-button').addClass('d-none');
                    morePhotos = false;

                }
            });

        } else {

            $('#rover').text(rover);
            $('#no-images-alert').removeClass('d-none');
            $('#animated-thumbnails').addClass('h-auto');
            $('#rover-load-more-button').addClass('d-none');
            $('#back-to-top-button').addClass('d-none');

        }
    }

    function topPhoto() {
        fbImages.get().then(function(snapshot) {
            var topPhoto = {
                id: '',
                likes: 0
            };
            snapshot.forEach(function(doc) {
                if (doc.data().likes > topPhoto.likes) {
                    topPhoto.id = doc.id;
                    topPhoto.likes = doc.data().likes;
                }
            });
            console.log(topPhoto.likes);
        });
    }

    topPhoto();

    $('#rover-button').on('click', function() {

        rover = $('input[name=rover]:checked').val();
        sol = $('#sol-input').val();
        page = 1;
        reqRoverImages(rover, sol, page);

    });

    $('#rover-load-more-button').on('click', function() {

        if (morePhotos) {
            page++;
            console.log(page);
            reqRoverImages(rover, sol, page);
        }
        
    });
    
}())