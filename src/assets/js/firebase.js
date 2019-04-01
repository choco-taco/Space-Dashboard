(function(){

    const config = {
        apiKey: "AIzaSyCDN32mT8qBqa0luHO7yesQ8vvD6cyrj34",
        authDomain: "first-e29ce.firebaseapp.com",
        databaseURL: "https://first-e29ce.firebaseio.com",
        projectId: "first-e29ce",
        storageBucket: "first-e29ce.appspot.com",
        messagingSenderId: "979115073345"
    };
      
    firebase.initializeApp(config);

    const database = firebase.firestore();

    const myImages = database.collection('liked_images');

    $(document).ready(function() {
        
        myImages.get().then(function(snapshot) {
            snapshot.forEach(function(doc) {
                console.log(doc.id, doc.data().likes);
            });
        });
    });

    $('.like').on('click', function() {
        var currentImage =  myImages.doc('first_image');
        // $(this).attr('data-id')
        console.log('a');
        if (currentImage.exists()) {
        console.log('b');
            currentImage.set({
                likes: 3,
            });
        } else {

        }
    });

}())