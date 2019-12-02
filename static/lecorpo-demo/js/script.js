var zoom = 16;
var latitude = 41.040585;
var longitude = 28.970257;

(function($) {
    "use strict";


$(window).bind("load", function() {
  $('#status').fadeOut(); // will first fade out the loading animation
			$('#preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website.
			$('body').delay(1000).css({'overflow-x':'hidden'}).css({'overflow-y':'auto'});
     checkContactForm();
});




    $(document).ready(function() {
      $('.switcher-colors a').click(function(e){
e.preventDefault();
var title=$(this).attr('title');

chooseStyle(title,60);
});

        function getImgSize(el, imgSrc) {
            var newImg = new Image();

            newImg.onload = function() {
                var height = newImg.height;
                var width = newImg.width;


                el.css('height', height);

            };

            newImg.src = imgSrc;
        }


     

        if ($('*').find("[data-background-image]").length > 0) {
            $('*').find("[data-background-image]").each(function() {
                var el = $(this);
               var sz= getImgSize(el, el.attr("data-background-image"));

                el.css('background-position', 'center').css('background-image', "url('" + el.attr("data-background-image") + "')").css('background-size', 'cover').css('background-repeat', 'no-repeat');

            });
        }
        
        
    


        if ($('*').find("[data-bg-color]").length > 0) {
            $('*').find("[data-bg-color]").each(function() {
                var el = $(this);
                el.css('background-color', el.attr("data-bg-color"));
            });
        }


   if ($('.portfolio-item').length > 0) {

            var $container = $('#portfolio-grid');

            $container.isotope({filter: '*',
              masonry: {
     columnWidth: 1
  }
            });
           

            $('.group-selectors a').click(function(e) {
                e.preventDefault();
                var selector = $(this).attr('data-filter');
                $container.isotope({filter: selector});


                $('.group-selectors a.active').removeClass('active');
                $(this).toggleClass('active');


                return false;

            });

            $('.group-selectors a').each(function() {
                var grup = $(this).attr('data-filter');
                if (grup === '*') {
                    //  console.log($('.section-portfolio .portfolio-item').length)
                    $(this).attr('data-original-title', $('#portfolio-grid .portfolio-item').length);
                } else {
                    var items = $(this).parent().parent().find('.portfolio-item' + grup);

                    $(this).attr('data-original-title', items.length);
                }
            });

            $('.group-selectors a').tooltip();
            
        }
setupCustomMap();

function setupCustomMap() {
    if ($('.map-holder').length > 0) {

        var styles = [
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#E6E6E6"
                    }
                ]
            }, {
                "featureType": "administrative",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": -100
                    }
                ]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#808080"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }, {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#CECECE"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }, {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#E5E5E5"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }, {}
        ];
      var lt = (latitude);
            var ld = (longitude);



        var options = {
            mapTypeControlOptions: {
                mapTypeIds: ['Styled']
            },
            center: new google.maps.LatLng(lt, ld),
            zoom: zoom,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: 'Styled'
        };
        var div = document.getElementById('map');




        var map = new google.maps.Map(div, options);

        var styledMapType = new google.maps.StyledMapType(styles, {
            name: 'Styled'
        });
        var image = 'images/marker.png';
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            icon: image
        });
        map.mapTypes.set('Styled', styledMapType);

      


    }

}


  $('.recommends-holder').carouFredSel({
                auto:false,
                responsive: true,
          
                          pagination: ".pagination-bullets"      
          
        
            });
     

          if ($('.homeslider.flexslider').length > 0) {
                var homeslider = $('.homeslider').flexslider({
                      animation:"slide",
                    prevText: "",
                    nextText: "",
                    touch: true,
                    smoothHeight: true,
                    directionNav: false,
                    controlNav: true,
                    slideshow: true,
                    start: function(slider) {
                        $('.homeslider').find('.preloader').removeClass('loading');
                        var cs = slider.find('.slide').eq(slider.currentSlide);




                    },
                    after: function(slider) {
                        $('.homeslider').find('.preloader').removeClass('loading');
                        var cs = slider.find('.slide').eq(slider.currentSlide);



                    },
                    before: function(slider) {
                        $('.homeslider').find('.preloader').addClass('loading');
                        var cs = slider.find('.slide').eq(slider.currentSlide);




                    }
                });
                $('.homeslider .btn-prev,.homeslider .btn-next').on('click', function(e) {
                    e.preventDefault();
                    var href = $(this).attr('href');

                    homeslider.flexslider(href);
                    return false;
                });
            }
            
            
            
               if ($('.services-slider.flexslider').length > 0) {
                      var sliderEl = $('.services-slider');
                var slider = $('.services-slider').flexslider({
                    animation:"slide",
                    prevText: "",
                    nextText: "",
                    smoothHeight: true,
                    directionNav: false,
                    controlNav: false,
                    slideshow: false,
                    start: function(slider) {
                     
                        var cs = sliderEl.find('.slide').eq(slider.currentSlide);




                    },
                    after: function(slider) {
                       
                        var cs = sliderEl.find('.slide').eq(slider.currentSlide);



                    },
                    before: function(slider) {
                        
                        var cs = sliderEl.find('.slide').eq(slider.currentSlide);




                    }
                });
                $('.services-slider .btn-prev,.services-slider .btn-next').on('click', function(e) {
                     e.preventDefault();
                    var href = $(this).attr('href');

                    slider.flexslider(href);
                    return false;
                });
            }



        $('[data-placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('data-placeholder')) {
                input.val('');

            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('data-placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('data-placeholder'));
            }
        }).blur();

        $('[data-placeholder]').parents('form').submit(function() {
            $(this).find('[data-placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('data-placeholder')) {
                    input.val('');
                }
            });
        });


    });


   //Contact form setup
 
  
    function checkContactForm() {
        if ($(".contact-form").length > 0) {

var formStatus = $(".contact-form").validate();
            //   ===================================================== 
            //sending contact form
            $(".contact-form").submit(function(e) {
                e.preventDefault();

            //  triggers contact form validation
           
                if (formStatus.errorList.length === 0)
                {
                    $(".contact-form .submit").fadeOut(function() {
                        $('#loading').css('visibility', 'visible');
                        $.post('submit.php', $(".contact-form").serialize(),
                                function(data) {
                                    $(".contact-form input,.contact-form textarea").not('.submit').val('');

                                    $('.message-box').html(data);


                                    $('#loading').css('visibility', 'hidden');
                                    $(".contact-form .submit").removeClass('disabled').css('display', 'block');
                                }

                        );
                    });


                }

            });
        }
    }
    
    
$('.goto-top').click(function(e){
e.preventDefault();
 $('html,body').animate({
          scrollTop: 0
        }, 2000);
});
    
  if($('a[data-rel="prettyphoto"]').length>0){
$('a[data-rel="prettyphoto"]').prettyPhoto();
}
  if($('a[data-rel="prettyPhoto"]').length>0){
$('a[data-rel="prettyPhoto"]').prettyPhoto();
}

//    $('body').scrollspy({ target: '.nav-menu' });
//hashtag navigation address setup (deeplink)


    $('.nav-menu a').address($(this).attr('href'));
   $('.top-drop-menu').change(function() {
            var loc = ($(this).find('option:selected').val());
         
$('.nav-menu a').address(loc);
// window.location = loc;
        });
    $.address.change(function(event) {

        var pageID = event.value.split('/')[1];

        if (pageID != '' && pageID.indexOf('.') === -1) {

            var el = $(".nav-menu [href=#" + pageID + "]");

            $('.nav-menu .active').removeClass('active');
            el.parent().addClass('active');
            $('select.nav option').each(function() {

                var val = $(this).val();

                if (val === "#" + pageID) {
                    $('select.nav option:selected').removeAttr('selected');
                    $(this).attr('selected', 'selected');
                }

            });


            scrollToSection("#" + pageID);
        } else {
            if (pageID.indexOf('.') > -1) {
                window.location = pageID;
            }
        }
    });

    $('select.nav').change(function() {
        var loc = ($(this).find('option:selected').val());

        scrollToSection(loc);
    });

    function scrollToSection(destSection) {


        $('html, body').stop().animate({
            scrollTop: $(destSection).offset().top -80
        }, 2000, 'easeInOutExpo');

    }

    $('.nav-menu a').bind('click', function(event) {


        event.preventDefault();
        var clickedMenu = $(this);
        $('.nav-menu .active').toggleClass('active');
        clickedMenu.parent().toggleClass('active');


        scrollToSection(clickedMenu.attr('href'));




    });




    
})(jQuery);



// Sticky Nav
$(window).scroll(function(e) {
  
    var nav_anchor = $("header");
     var gotop = $(document);

 if ($(this).scrollTop() >= 500) {
    $('.goto-top').css({'opacity':1});
 }else if ($(this).scrollTop() < 500)
 {
      $('.goto-top').css({'opacity':0});
 }
 
 
    if ($(this).scrollTop() >= 100 && !nav_anchor.hasClass('fixed')) 
    {    
      
        nav_anchor.addClass('narrow');
      
        
    } 
    else if ($(this).scrollTop() < 100  && !nav_anchor.hasClass('fixed')) 
    {   

     
 nav_anchor.removeClass('narrow');
   
    }
});



