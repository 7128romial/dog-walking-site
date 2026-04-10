// קובץ ראשי - פונקציות משותפות לכל הדפים

$(document).ready(function() {

    // אפקט fade in בגלילה
    function checkFadeIn() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > elementTop + 50) {
                $(this).addClass('visible');
            }
        });
    }

    checkFadeIn();

    $(window).on('scroll', function() {
        checkFadeIn();
    });

    // התאמה מהירה - שמירה ב-localStorage ומעבר לדף הכלבים
    $('.match-btn').on('click', function() {
        var size = $(this).data('size');

        $('.match-btn').removeClass('selected');
        $(this).addClass('selected');

        localStorage.setItem('preferredDogSize', size);

        var sizeNames = { small: 'קטן', medium: 'בינוני', large: 'גדול' };
        $('#matchFeedback').text('בחרת כלב ' + sizeNames[size] + '! עוברים לרשימת הכלבים...');

        setTimeout(function() {
            window.location.href = 'includes/dogs.html';
        }, 1000);
    });

    // אפקט צל לכותרת בגלילה
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.site-header').css('box-shadow', '0 4px 20px rgba(0,0,0,0.4)');
        } else {
            $('.site-header').css('box-shadow', '0 4px 10px rgba(0,0,0,0.3)');
        }
    });

    // גלילה חלקה לעוגנים
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

    // אפקט hover על הכרטיסים
    $('.dog-card, .quick-card, .step-card, .tip-card').hover(
        function() {
            $(this).css('transform', 'translateY(-6px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // סימון הדף הנוכחי בתפריט
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-link').each(function() {
        var href = $(this).attr('href');
        if (href === currentPage) {
            $(this).addClass('active');
        }
    });

    // אפקט לחיצה על כפתורים
    $('.btn').on('mousedown', function() {
        $(this).css('transform', 'scale(0.95)');
    }).on('mouseup mouseleave', function() {
        $(this).css('transform', '');
    });
});
