/* ===============================================
   WalkMe - Main JavaScript
   jQuery and shared functionality
   =============================================== */

$(document).ready(function() {

    // ===============================================
    // JQUERY: Scroll animations - fade in elements
    // ===============================================
    function checkFadeIn() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > elementTop + 50) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Check on load
    checkFadeIn();
    
    // Check on scroll
    $(window).on('scroll', function() {
        checkFadeIn();
    });

    // ===============================================
    // JS: Homepage - Quick Match dog size preference
    // Saves preference to localStorage, transfers to dogs page
    // ===============================================
    $('.match-btn').on('click', function() {
        var size = $(this).data('size');
        
        // Dynamic styling: add/remove selected class
        $('.match-btn').removeClass('selected');
        $(this).addClass('selected');
        
        // Save preference to localStorage (data transfer between pages)
        localStorage.setItem('preferredDogSize', size);
        
        // Writing to element: show feedback message
        var sizeNames = { small: 'קטן', medium: 'בינוני', large: 'גדול' };
        $('#matchFeedback').text('בחרת כלב ' + sizeNames[size] + '! עוברים לרשימת הכלבים...');
        
        // Navigate to dogs page after short delay
        setTimeout(function() {
            window.location.href = 'includes/dogs.html';
        }, 1000);
    });

    // ===============================================
    // JS: Header scroll effect
    // ===============================================
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.site-header').css('box-shadow', '0 4px 20px rgba(0,0,0,0.4)');
        } else {
            $('.site-header').css('box-shadow', '0 4px 10px rgba(0,0,0,0.3)');
        }
    });

    // ===============================================
    // JS: Smooth scroll for anchor links
    // ===============================================
    $('a[href^="#"]').on('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = $(href);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 600);
        }
    });

    // ===============================================
    // JQUERY: Hover effects on cards
    // ===============================================
    $('.dog-card, .quick-card, .step-card, .tip-card').hover(
        function() {
            $(this).css('transform', 'translateY(-6px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // ===============================================
    // JS: Active nav link highlighting
    // ===============================================
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-link').each(function() {
        var href = $(this).attr('href');
        if (href === currentPage) {
            $(this).addClass('active');
        }
    });

    // ===============================================
    // JQUERY: Button click animation
    // ===============================================
    $('.btn').on('mousedown', function() {
        $(this).css('transform', 'scale(0.95)');
    }).on('mouseup mouseleave', function() {
        $(this).css('transform', '');
    });
});
