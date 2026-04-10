/* ===============================================
   WalkMe - Dogs Page JavaScript
   Filtering, welcome message, data transfer
   =============================================== */

$(document).ready(function() {

    // ===============================================
    // JS: Read dog size preference from localStorage
    // (Data transfer between pages using localStorage)
    // ===============================================
    var preferredSize = localStorage.getItem('preferredDogSize');
    if (preferredSize) {
        // Set the filter dropdown to match the saved preference
        $('#sizeFilter').val(preferredSize);

        // Show message to user (writing to element)
        var sizeNames = { small: 'קטן', medium: 'בינוני', large: 'גדול' };
        var $msg = $('<div class="auto-filter-msg">בחרת העדפה לכלבים בגודל ' + sizeNames[preferredSize] + ' (הסינון יהיה זמין בקרוב)</div>');
        $('.filter-section').before($msg);

        // Clear the preference
        localStorage.removeItem('preferredDogSize');
    }

    // ===============================================
    // JS: Filter dogs functionality - NOT IMPLEMENTED
    // (Shows "לא מומש" tooltip)
    // ===============================================
    $('#filterBtn').on('click', function(e) {
        e.preventDefault();
        // Show "not implemented" message
        alert('הסינון יהיה זמין בקרוב!');
    });

    // Add tooltip to filter button
    $('#filterBtn').attr('title', 'לא מומש - בקרוב');
    $('#resetFilter').attr('title', 'לא מומש - בקרוב');

    // ===============================================
    // JS: Reset filter - NOT IMPLEMENTED
    // ===============================================
    $('#resetFilter').on('click', function(e) {
        e.preventDefault();
        // Show "not implemented" message
        alert('הסינון יהיה זמין בקרוב!');
    });

    // ===============================================
    // JS: Click on dog card to navigate
    // (Data transfer between pages)
    // Only Chomi (dog 1) is clickable - others show "בקרוב"
    // ===============================================
    $('.dog-card').on('click', function(e) {
        if ($(e.target).hasClass('btn') || $(e.target).closest('.btn').length) {
            return;
        }

        var dogId = $(this).data('id');
        var dogName = $(this).data('name');

        // Only allow Chomi (dog 1) to be clicked
        if (dogId == 1) {
            // Save to localStorage for data transfer
            localStorage.setItem('selectedDogId', dogId);
            localStorage.setItem('selectedDogName', dogName);

            window.location.href = 'dog-details.html?id=' + dogId;
        } else {
            // Show "coming soon" for other dogs
            alert('פרטי ' + dogName + ' יהיו זמינים בקרוב!');
        }
    });

    // ===============================================
    // JQUERY: Hover effect with dynamic class
    // (Dynamic styling using class - JS requirement)
    // Only Chomi gets hover effect, others show "בקרוב" tooltip
    // ===============================================
    $('.dog-card').hover(
        function() {
            var dogId = $(this).data('id');
            if (dogId == 1) {
                $(this).addClass('dog-card-hover');
            } else {
                // Add "coming soon" visual indicator
                $(this).addClass('coming-soon-hover');
                $(this).css('cursor', 'pointer');
            }
        },
        function() {
            $(this).removeClass('dog-card-hover coming-soon-hover');
            $(this).css('cursor', '');
        }
    );

    // Add tooltip to "coming soon" cards
    $('.coming-soon-card').attr('title', 'בקרוב - יהיה זמין להתנדבות');

});
