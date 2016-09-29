$(document).ready(function() {
    Pace.on('done', function() {
        $('#loading').fadeOut(500);
        $('#index').css({ 'overflow': 'auto', 'height': 'auto' });
        $("html,body").niceScroll({
            scrollspeed: 60,
            mousescrollstep: 50,
        });
    });
    // refresh page on resize------------
    var ww = window.innerWidth;
    var limit = 992;

    function refresh() {
        ww = window.innerWidth;
        var w = ww < limit ? (location.reload(true)) : (ww > limit ? (location.reload(true)) : ww = limit);
    }

    var tOut;
    $(window).resize(function() {
        var resW = window.innerWidth;
        clearTimeout(tOut);
        if ((ww > limit && resW < limit) || (ww < limit && resW > limit)) {
            tOut = setTimeout(refresh, 100);
        }
    });


    // $('.footer-list li a').after('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    var classroom = new Swiper('.swiper-container-classroom', {
        pagination: '.swiper-pagination--classroom',
        direction: 'horizontal',
    });
    var classroomSelector = new Swiper('.swiper-container-classroom-selector', {
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        grabCursor: true
    });
    var teachers = new Swiper('.swiper-container-teacher', {
        direction: 'horizontal',
        grabCursor: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });
    var future = new Swiper('.swiper-container-future', {
        direction: 'horizontal',
        grabCursor: true,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    })

    $('.light-box1').on('click', function() {
        $('.lightbox-wrap1,.lightbox-wrap1 .exit').addClass('is-active');
        disableScrolling();
    });
    $('.exit').on('click', function() {
        $('.lightbox-wrap1,.lightbox-wrap1 .exit').removeClass('is-active');
        $('.lightbox-wrap2,.lightbox-wrap2 .exit').removeClass('is-active');
        $('.swiper-container-classroom-selector,.classroom-description').removeClass('is-active');
        $('.exit i').removeClass('is-active');
        $('.classroom-intros').fadeIn(500);
        enableScrolling();
    });


    $('.light-box2').on('click', function() {
        $('.lightbox-wrap2,.lightbox-wrap2 .exit').addClass('is-active');
        disableScrolling();
    });


    // classroom main select
    $('#classroom .swiper-slide.bg-blue-dark .container a').on({
        click: function(e) {
            e.preventDefault();
            $('.classroom-intros').fadeOut(500);
            var openDesc = ".classroom-" + $(this).data('classroom');
            var currDesc = $('.classroom-description').find(openDesc);
            $('.classroom-description figure').removeClass('is-active');
            $('.swiper-container-classroom-selector,.classroom-description').addClass('is-active');
            currDesc.addClass('is-active');
            $('.exit i').addClass('is-active');

        }
    });
    // 
    // classroom selector
    $('#classroom .swiper-container-classroom-selector a').on({
        click: function(e) {
            e.preventDefault();
            var openDesc = ".classroom-" + $(this).data('classroom');
            var currDesc = $('.classroom-description').find(openDesc);
            $('.classroom-description figure').removeClass('is-active');
            $('.swiper-container-classroom-selector,.classroom-description').addClass('is-active');
            currDesc.addClass('is-active');

        }
    })

    //smooth scroll to #id
    var $root = $('html, body');
    $('a.bookmark').click(function() {
        var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(href).offset().top
        }, 500, function() {
            window.location.hash = href;
        });
        return false;
    });

    if (window.innerWidth <= 991) {
        // navigation show
        var coverHeight = $('#cover').height();

        $(window).on({
            scroll: function() {
                if ($(window).scrollTop() >= coverHeight) {
                    $('#m-navigation').fadeIn(500);
                } else {
                    $('#m-navigation').fadeOut(500);
                }
            }
        })

        // classroom lightbox
        $('.swiper-container-classroom .swiper-slide').on({
            scroll: function() {
                if ($(this).scrollTop() > 50) {
                    $('.intro').fadeOut();
                } else {
                    $('.intro').fadeIn();
                }
            }
        })
    }
    if (window.innerWidth >= 992) {
        // navigation show
        var coverHeight = $('#cover').height();
        $(window).on({
            scroll: function() {
                if ($(window).scrollTop() >= coverHeight) {
                    $('#navigation').addClass('is-active');
                } else {
                    $('#navigation').removeClass('is-active');
                }
            }
        })
    }

    if (window.innerWidth >= 1200) {
        // skrollr
        var sss = skrollr.init();
    }

    $('#m-navigation').on({
        click: function() {
            $('#m-navigation').toggleClass('is-active');
        }
    });

    $('#m-navigation a').on({
        click: function() {
            setTimeout(function() {
                $('#m-navigation').toggleClass('is-active');
            }, 450);
        }
    });
    console.log("%cAuthor: Rex Tsou", "color:#fff;background:#000;font-size:1.4rem;padding:0.2rem 0.5rem;");
});
$(document).keyup(function(e) {
    if (e.keyCode == 27 && $('.lightbox-wrap1').is('.is-active')) {
        $('.lightbox-wrap1').toggleClass('is-active');
        enableScrolling();
    }
    if (e.keyCode == 27 && $('.lightbox-wrap2').is('.is-active')) {
        $('.lightbox-wrap2').toggleClass('is-active');
        enableScrolling();
    }
    if (e.keyCode == 37 && $('.lightbox-wrap2').is('.is-active')) {
        teachers.slidePrev(false, 500);
    }
    if (e.keyCode == 39 && $('.lightbox-wrap2').is('.is-active')) {
        teachers.slideNext(false, 500);
    }
    if (e.keyCode == 27 && $('.swiper-container-classroom-selector').is('.is-active')) {
        $('.swiper-container-classroom-selector,.classroom-description').removeClass('is-active');
        $('.exit i').removeClass('is-active');
        $('.classroom-intros').fadeIn(500);
    }
});

function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function() { window.scrollTo(x, y); };
}

function enableScrolling() {
    window.onscroll = function() {};
}
