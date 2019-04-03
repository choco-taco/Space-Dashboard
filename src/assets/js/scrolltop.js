(function(){
    $('#back-to-top-button').on('click', function(){ 
        $("html, body").animate({ 
            scrollTop: 0 
        }, 600); 
        return false; 
    });

    var btn = $('#top-button');
$(window).scroll(function() {
  if ($(window).scrollTop() > 200) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:300}, '200');
});

    
}())