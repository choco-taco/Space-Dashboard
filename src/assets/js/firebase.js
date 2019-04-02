(function(){

    var config = {
        apiKey: "AIzaSyCDN32mT8qBqa0luHO7yesQ8vvD6cyrj34",
        authDomain: "first-e29ce.firebaseapp.com",
        databaseURL: "https://first-e29ce.firebaseio.com",
        projectId: "first-e29ce",
        storageBucket: "first-e29ce.appspot.com",
        messagingSenderId: "979115073345"
    };
      
    firebase.initializeApp(config);

    const db = firebase.firestore();
    const fbImages = db.collection('liked_images');

    $(document.body).on('click', '.like', function() {
        var parsedImages = JSON.parse(window.localStorage.getItem('likedImages'))
        var likedImages = parsedImages != null ? parsedImages : [];
        var id = $(this).attr('data-id');

        if (!likedImages.includes(id)) {
            likedImages.push(id);
            fbImages.doc(id).get().then(function(snapshot) {
                if (snapshot.exists) {
                    var increment = snapshot.data().likes + 1;
                    fbImages.doc(id).update({
                        likes: increment
                    });
                } else {
                    fbImages.doc(id).set({
                        likes: 1
                    })
                }
            });
        } else {
            fbImages.doc(id).get().then(function(snapshot) {
                if (snapshot.exists) {
                    var increment = snapshot.data().likes - 1;
                    fbImages.doc(id).update({
                        likes: increment
                    });
                }
            });
            var index = likedImages.indexOf(id);
            likedImages.splice(index, 1);
        }
        window.localStorage.setItem('likedImages', JSON.stringify(likedImages));
    });

    fbImages.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            $(`a[data-id=${change.doc.id}] .likes`).text(change.doc.data().likes);
        });
    });

}())