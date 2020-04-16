var el = $('.secTwo');

$(window).scroll(function(){
    if ( $(this).scrollTop() > el.offset().top - 500 ) {
        el.find('img').addClass("show");
        el.find('li').delay(500).each(function(i) {
            $(this).delay(100 * i).queue(function() {
              $(this).addClass("show");
            })
        })
    }
});

var el2 = $('.secThree');

$(window).scroll(function(){
    if ( $(this).scrollTop() > el2.offset().top - 700 ) {
        el2.find('.container').addClass("show");
    }
});
