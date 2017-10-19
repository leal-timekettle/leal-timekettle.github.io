/* 
   CounterUp
   ========================================================================== */
jQuery(document).ready(function ($) {
    $('.counter').counterUp({
        time: 500
    });
});

/* 
   MixitUp
   ========================================================================== */
$(function () {
    $('#portfolio').mixItUp();
});

/* 
   Touch Owl Carousel
   ========================================================================== */
$(".touch-slider").owlCarousel({
    navigation: false,
    pagination: true,
    slideSpeed: 1000,
    stopOnHover: true,
    autoPlay: true,
    items: 1,
    itemsDesktopSmall: [1024, 1],
    itemsTablet: [600, 1],
    itemsMobile: [479, 1]
});
$('.touch-slider').find('.owl-prev').html('<i class="fa fa-chevron-left"></i>');
$('.touch-slider').find('.owl-next').html('<i class="fa fa-chevron-right"></i>');

/* 
   Sticky Nav
   ========================================================================== */
$(window).on('scroll', function () {
    if ($(window).scrollTop() > 200) {
        $('.header-top-area').addClass('menu-bg');
    } else {
        $('.header-top-area').removeClass('menu-bg');
    }
});

/* 
    Counterdown
    ========================================================================== */
$(function () {

    var note = $('#note'),
        ts = new Date(Date.UTC(2017, 08, 19, 17, 0));

        newYear = true;

    if ((new Date()) > ts) {
        // The new year is here! Count towards something else.
        // Notice the *1000 at the end - time must be in milliseconds
        ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
        newYear = false;
    }

    $('#countdown').countdown({
        timestamp: ts,
        callback: function (days, hours, minutes, seconds) {

            var message = "";

            message += days + " day" + (days == 1 ? '' : 's') + ", ";
            message += hours + " hour" + (hours == 1 ? '' : 's') + ", ";
            message += minutes + " minute" + (minutes == 1 ? '' : 's') + " and ";
            message += seconds + " second" + (seconds == 1 ? '' : 's') + " <br />";

            if (newYear) {
                message += "Kickstarter is live!";
            }
            else {
                message += "left to 10 days from now!";
            }

            // note.html(message);
        }
    });

});
/* 
   VIDEO POP-UP
   ========================================================================== */
$('.video-popup').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
});

/* 
   Back Top Link
   ========================================================================== */
var offset = 200;
var duration = 500;
$(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
        $('.side-action-bar').fadeIn(400);
    } else {
        $('.side-action-bar').fadeOut(400);
    }
});
$('.back-to-top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 600);
    return false;
})

/* 
   One Page Navigation & wow js
   ========================================================================== */
jQuery(function ($) {
    //Initiat WOW JS
    new WOW().init();

    // one page navigation 
    $('.main-navigation').onePageNav({
        currentClass: 'active'
    });
});

jQuery(document).ready(function () {

    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 195
    });

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.fixed-top').addClass('menu-bg');
        } else {
            $('.fixed-top').removeClass('menu-bg');
        }
    });

});

/* Nivo Lightbox
========================================================*/
jQuery(document).ready(function ($) {
    $('.lightbox').nivoLightbox({
        effect: 'fadeScale',
        keyboardNav: true,
    });

});

/* stellar js
========================================================*/
$(function () {
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 40,
        responsive: true
    });
});

/* 
   Page Loader
   ========================================================================== */
$(window).load(function () {
    "use strict";
    $('#loader').fadeOut();
});