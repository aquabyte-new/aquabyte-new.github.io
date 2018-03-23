var host = 'www.aquabyte.no';
if ((host == window.location.host) && (window.location.protocol != 'https:'))
    window.location.protocol = 'https';

// Catch verticle scroll
$(document).ready(function() {
    $(window).on("scroll", function() {
        var fromTop = $(window).scrollTop();
        $(".header-search").toggleClass("down", (fromTop > 1380));
    });
});
// Nav menu for mobile
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav-item") {
        x.className += " responsive";
    } else {
        x.className = "nav-item";
    }
}

// function sendEmail(subject, html) {
//   var from = 'no-reply@aquabyte.ai';
//   var recipients = [ 
//     { address: 'info@aquabyte.ai' }
//   ];

//   var sparkpostData = {
//     content: {
//       from: from,
//       subject: subject,
//       html: '<html><body>' + html + '</body></html>'
//     },
//     recipients: recipients
//   };


// }

// add class to another class on click or hover
$(document).ready(function(){
    $(".tab-team-control").click(function(){
      $(this).addClass("active");
      $('.tab-team').addClass("active");
      $('.tab-advisors').removeClass("active");
      $('.tab-investors').removeClass("active");
      $('.tab-partners').removeClass("active");
      $('.tab-advisors-control').removeClass("active");
      $('.tab-investors-control').removeClass("active");
      $('.tab-partners-control').removeClass("active");
    });
    $(".tab-advisors-control").click(function(){
      $(this).addClass("active");
      $('.tab-advisors').addClass("active");
      $('.tab-team').removeClass("active");
      $('.tab-investors').removeClass("active");
      $('.tab-partners').removeClass("active");
      $('.tab-team-control').removeClass("active");
      $('.tab-investors-control').removeClass("active");
      $('.tab-partners-control').removeClass("active");
    });
    $(".tab-investors-control").click(function(){
      $(this).addClass("active");
      $('.tab-investors').addClass("active");
      $('.tab-team').removeClass("active");
      $('.tab-advisors').removeClass("active");
      $('.tab-partners').removeClass("active");
      $('.tab-team-control').removeClass("active");
      $('.tab-advisors-control').removeClass("active");
      $('.tab-partners-control').removeClass("active");
    });
    $(".tab-partners-control").click(function(){
      $(this).addClass("active");
      $('.tab-partners').addClass("active");
      $('.tab-team').removeClass("active");
      $('.tab-advisors').removeClass("active");
      $('.tab-investors').removeClass("active");
      $('.tab-team-control').removeClass("active");
      $('.tab-advisors-control').removeClass("active");
      $('.tab-investors-control').removeClass("active");
    });
});

// owl carousel
$(document).ready(function() {
  $('.class-slider').owlCarousel({
    items: 1,
    loop: false,
    center: true,
    margin: 0,
    nav:true,
    callbacks: true,
    autoHeight:false,
    URLhashListener: true,
    autoplayHoverPause: false,
    startPosition: 'URLHash',
    autoplay:false,
    autoplayTimeout:6000,
    autoplaySpeed:1500,
    autoplayHoverPause:false,
    smartSpeed:800,
  });
})
// search bar category expand
$(function() {
  $(".tags").on("click", function(e) {
    $(".category, .tags").addClass("open");
    e.stopPropagation()
  });
  $(document).on("click", function(e) {
    if ($(e.target).is(".category") === false) {
      $(".category, .tags").removeClass("open");
    }
  });
});


// Content slide open
$(document).ready(function () {
  $('.menu-button').click(function(){
      $(this).siblings('.nav-item').slideToggle(700, 'easeOutSine');
  });
})

// duplicate element on click

$(document).ready(function () {
document.getElementById('duplicate-button').onclick = duplicate;


var i = 0;
var original = document.getElementById('duplicate-content');

function duplicate() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicate-content" + ++i; // there can only be one element with an ID
    original.parentNode.appendChild(clone);
}
} );  

// Change text
$(document).ready(function () {
  $(".showMore").click(function () {
        $(".showMore-label").ready(function () {
            $(".showMore-label").text(($(".showMore-label").text() == 'More filter options') ? 'Less filter options' : 'More filter options');
        })
    })
} );                  

// catch element width
$(document).ready(function () {
  var bookingAnchor = $('#class-booking-anchor');
  $('.mini').css({ width: bookingAnchor.width() });
});

// smooth scroll
$(document).ready(function() {
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
});


// tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// file-upload
$(document).ready(function() {
$('#file-upload').change(function() {
  var i = $(this).prev('label').clone();
  var file = $('#file-upload')[0].files[0].name;
  $(this).prev('label').text(file);
});
});

//trigger the scroll
$(window).scroll();//ensure if you're in current position when page is refreshed

//editable content
$(document).ready(function() {
  $('.clause-editor-textarea').each(function(){
      this.contentEditable = true;
  });
});

//disable scroll on other area
$(document).ready(function(){
$( '.clause-editor-textarea' ).on( 'mousewheel DOMMouseScroll', function ( e ) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
    e.preventDefault();
});
});

//popup modal
  function openPopup(el) {
   $('.popup').hide();
   $('#' + el).fadeIn(200);   
  }

  function closePopup() {
    $('.popup').fadeOut(300);
  }
//send emails
$(document).ready(function() {
  $('.landing-contact :submit').on('click', function(e) {
    e.preventDefault();

    var cf_name = $('input[name=cf_name]').val();
    var cf_email = $('input[name=cf_email]').val();
    var cf_subject = $('input[name=cf_subject]').val();
    var cf_message = $('textarea[name=cf_message]').val();
    var cf_newsletter = $('input[name=cf_newsletter]').is(':checked');

    var body = {
      cf_name: cf_name,
      cf_email: cf_email,
      cf_subject: cf_subject,
      cf_message: cf_message,
      cf_newsletter: cf_newsletter
    };

    if (cf_email.indexOf('@') < 0) {
      if (window.location.pathname.indexOf('hjem') > -1) {
        return alert('Vennligst fyll inn en gyldig epostadresse.');
      }

      return alert('Please enter a valid email address.');
    }

    $.post('https://api.aquabyte.ai/send_email', body, function() {
      if (window.location.pathname.indexOf('hjem') > -1) {
        alert('Takk for meldingen. Du hører snart fra oss.');
        window.location = '/hjem';
      } else {
        alert('Thank you for the message. We will be in touch shortly.');
        window.location = '/';
      }
    })
    .fail(function() {
      if (window.location.pathname.indexOf('hjem') > -1) {
        alert('Melding ble ikke sendt. Vennligst send en epost til info@aquabyte.no');
        window.location = '/hjem';
      } else {
        alert('Message failed. Please, send an email to info@aquabyte.ai');
        window.location = '/';
      }
    });

    // var subject = 'Message from ' + cf_name;
    // var html = '<div>'
    //   + '<p>From: ' + cf_name
    //   + '</p><p>E-mail: ' + cf_email
    //   + '</p><p>Subject: ' + cf_subject
    //   + '</p><p>Message: ' + cf_message
    //   + '</p>';
    
    // console.log('clicked');

    // sendEmail(subject, html);
  });
});