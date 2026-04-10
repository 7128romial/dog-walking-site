// דף רשימת הכלבים - סינון והודעות

$(document).ready(function() {

    // קריאת העדפת גודל מה-localStorage (מגיע מדף הבית)
    var preferredSize = localStorage.getItem('preferredDogSize');
    if (preferredSize) {
        $('#sizeFilter').val(preferredSize);

        var sizeNames = { small: 'קטן', medium: 'בינוני', large: 'גדול' };
        var $msg = $('<div class="auto-filter-msg">בחרת העדפה לכלבים בגודל ' + sizeNames[preferredSize] + ' (הסינון יהיה זמין בקרוב)</div>');
        $('.filter-section').before($msg);

        localStorage.removeItem('preferredDogSize');
    }

    // סינון כלבים - עדיין לא ממומש
    $('#filterBtn').on('click', function(e) {
        e.preventDefault();
        alert('הסינון יהיה זמין בקרוב!');
    });

    $('#filterBtn').attr('title', 'לא מומש - בקרוב');
    $('#resetFilter').attr('title', 'לא מומש - בקרוב');

    // איפוס סינון - עדיין לא ממומש
    $('#resetFilter').on('click', function(e) {
        e.preventDefault();
        alert('הסינון יהיה זמין בקרוב!');
    });

    // לחיצה על כרטיס כלב - רק חומי זמין
    $('.dog-card').on('click', function(e) {
        if ($(e.target).hasClass('btn') || $(e.target).closest('.btn').length) {
            return;
        }

        var dogId = $(this).data('id');
        var dogName = $(this).data('name');

        if (dogId == 1) {
            localStorage.setItem('selectedDogId', dogId);
            localStorage.setItem('selectedDogName', dogName);

            window.location.href = 'dog-details.html?id=' + dogId;
        } else {
            alert('פרטי ' + dogName + ' יהיו זמינים בקרוב!');
        }
    });

    // אפקט hover על הכרטיסים
    $('.dog-card').hover(
        function() {
            var dogId = $(this).data('id');
            if (dogId == 1) {
                $(this).addClass('dog-card-hover');
            } else {
                $(this).addClass('coming-soon-hover');
                $(this).css('cursor', 'pointer');
            }
        },
        function() {
            $(this).removeClass('dog-card-hover coming-soon-hover');
            $(this).css('cursor', '');
        }
    );

    $('.coming-soon-card').attr('title', 'בקרוב - יהיה זמין להתנדבות');

});
