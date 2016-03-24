var scene = document.getElementById('scene');
var parallax = new Parallax(scene);
parallax.enable();
parallax.disable();
parallax.updateLayers(); // Useful for reparsing the layers in your scene if you change their data-depth value
parallax.calibrate(false, true);
parallax.invert(false, true);
parallax.limit(false, 10);
parallax.scalar(2, 8);
parallax.friction(0.2, 0.8);
parallax.origin(0.0, 1.0);

function drawSVG(svgId) {
    $('.carousel-inner svg').css('opacity', '0');
    $(svgId).css('opacity', '1');
    var svg = new Walkway({
        selector: svgId,
        duration: 2500,
        easing: 'easeInOutCubic'
    }).draw(function () {
            console.dir('Finished project!');
        });
}


$(document).ready(function () {

    $('#section-3').on('slid.bs.carousel', function () {
        var activeSlide = $('#js-carousel').find('.active');
        var currentSvg = activeSlide.find('svg');
        console.log(currentSvg.attr('id'));
        drawSVG('#' + currentSvg.attr('id'));
    });
    if ($(window).width() > 769) {
        var frameLeft = document.getElementById('js-animate-logo-left');
        var frameRight = document.getElementById('js-animate-logo-right');
        var windowWidthHalf = ($(window).width() / 2) + 85;
        var windowHeightHalf = ($(window).height() / 2) - 150 + 85;

        $(frameLeft).css({
            'left': '-' + windowWidthHalf + 'px',
            'top': windowHeightHalf + 'px'
        });

        $(frameRight).css({
            'right': '-' + windowWidthHalf + 'px',
            'top': windowHeightHalf + 'px'
        });
        //var elem = document;
        //if (elem.addEventListener) {
        //    if ('onwheel' in document) {
        //        elem.addEventListener("wheel", onWheel);
        //    }
        //}

        function mainAnimation() {

            $('.b-header__slogan').animate({
                'margin-top': '0px'
            }, 700);

            var motioLeft = new Motio(frameLeft, {
                fps: 10,
                frames: 22
            });
            var motioRight = new Motio(frameRight, {
                fps: 10,
                frames: 22
            });

            $(frameRight).animate({
                'right': '-4px',
                'top': '0px'
            }, 2000);

            $(frameLeft).animate({
                'left': '-4px',
                'top': '0px'
            }, 2000, function () {
                $('.b-animate-name__h1').animate({'opacity': 1}, 300, function() {
                    $('html, body').css('overflow', 'auto');

                    $('#fullpage').fullpage({
                        afterLoad: function (anchorLink, index) {
                            var loadedSection = $(this);
                            if (index == 3) {
                                drawSVG('#social');
                            } else {
                                $('.carousel-inner svg').css('opacity', '0');
                            }
                        }
                    });
                });
            });

            motioLeft.toEnd();
            motioRight.toEnd();
        }

        mainAnimation();
    }
})
;