// טופס הרשמה - ולידציות ושליחה

$(document).ready(function() {

    // טעינת הכלב שנבחר מה-URL או מה-localStorage
    function getUrlParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    var dogId = getUrlParam('dog');
    var dogName = getUrlParam('name');

    if (!dogId) {
        dogId = localStorage.getItem('selectedDogId');
        dogName = localStorage.getItem('selectedDogName');
    }

    if (dogId && dogName) {
        $('#selectedDogInfo').addClass('show');
        $('#selectedDogName').text(decodeURIComponent(dogName));

        $('#selectedDog').val(dogId);
        $('#dogSelect').val(dogId);
    }

    // ולידציה 1 - שם מלא (לפחות שתי מילים)
    function validateFullName(name) {
        if (!name) return false;

        var words = name.trim().split(/\s+/);
        if (words.length < 2) return false;

        for (var i = 0; i < words.length; i++) {
            if (words[i].length < 2) return false;
        }

        return true;
    }

    $('#fullName').on('blur', function() {
        var value = $(this).val();
        var $group = $(this).closest('.form-group');

        if (validateFullName(value)) {
            $group.removeClass('error').addClass('success');
        } else if (value) {
            $group.addClass('error').removeClass('success');
        }
    });

    // ולידציה 2 - תעודת זהות (9 ספרות)
    function validateIsraeliID(id) {
        id = id.replace(/\D/g, '');

        if (id.length !== 9) return false;

        id = id.padStart(9, '0');

        return true;
    }

    $('#idNumber').on('blur', function() {
        var value = $(this).val();
        var $group = $(this).closest('.form-group');

        if (validateIsraeliID(value)) {
            $group.removeClass('error').addClass('success');
        } else if (value) {
            $group.addClass('error').removeClass('success');
        }
    });

    // מאפשר רק ספרות
    $('#idNumber').on('input', function() {
        $(this).val($(this).val().replace(/\D/g, ''));
    });

    // ולידציה 3 - אימייל
    function validateEmail(email) {
        if (!email) return false;

        if (email.indexOf('@') === -1) return false;

        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    $('#email').on('blur', function() {
        var value = $(this).val();
        var $group = $(this).closest('.form-group');

        if (validateEmail(value)) {
            $group.removeClass('error').addClass('success');
        } else if (value) {
            $group.addClass('error').removeClass('success');

            if (value.indexOf('@') === -1) {
                $('#emailError').text('כתובת אימייל חייבת לכלול @');
            } else if (!/^[a-zA-Z0-9._%+-]+@/.test(value)) {
                $('#emailError').text('כתובת אימייל חייבת להכיל רק אותיות אנגליות');
            } else {
                $('#emailError').text('נא להזין כתובת אימייל תקינה');
            }
        }
    });

    // ולידציה 4 - טלפון (פורמט ישראלי 05X-XXXXXXX)
    function validatePhone(phone) {
        phone = phone.replace(/[-\s]/g, '');

        if (!/^05\d{8}$/.test(phone)) return false;

        return true;
    }

    $('#phone').on('blur', function() {
        var value = $(this).val();
        var $group = $(this).closest('.form-group');

        if (validatePhone(value)) {
            $group.removeClass('error').addClass('success');
        } else if (value) {
            $group.addClass('error').removeClass('success');
        }
    });

    // פורמט אוטומטי למספר הטלפון
    $('#phone').on('input', function() {
        var value = $(this).val().replace(/\D/g, '');

        if (value.length > 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }

        $(this).val(value);
    });

    // ולידציה 5 - תאריך (חייב להיות בעתיד)
    function validateDate(dateStr) {
        if (!dateStr) return false;

        var selectedDate = new Date(dateStr);
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate > today;
    }

    // קביעת תאריך מינימלי למחר
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowStr = tomorrow.toISOString().split('T')[0];
    $('#preferredDate').attr('min', tomorrowStr);

    $('#preferredDate').on('blur', function() {
        var value = $(this).val();
        var $group = $(this).closest('.form-group');

        if (validateDate(value)) {
            $group.removeClass('error').addClass('success');
        } else if (value) {
            $group.addClass('error').removeClass('success');
        }
    });

    // שליחת הטופס
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();

        var isValid = true;
        var errors = [];

        var fullName = $('#fullName').val();
        if (!validateFullName(fullName)) {
            $('#fullName').closest('.form-group').addClass('error');
            errors.push('שם מלא');
            isValid = false;
        }

        var idNumber = $('#idNumber').val();
        if (!validateIsraeliID(idNumber)) {
            $('#idNumber').closest('.form-group').addClass('error');
            errors.push('תעודת זהות');
            isValid = false;
        }

        var email = $('#email').val();
        if (!validateEmail(email)) {
            $('#email').closest('.form-group').addClass('error');
            errors.push('אימייל');
            isValid = false;
        }

        var phone = $('#phone').val();
        if (!validatePhone(phone)) {
            $('#phone').closest('.form-group').addClass('error');
            errors.push('טלפון');
            isValid = false;
        }

        var preferredDate = $('#preferredDate').val();
        if (!validateDate(preferredDate)) {
            $('#preferredDate').closest('.form-group').addClass('error');
            errors.push('תאריך');
            isValid = false;
        }

        var preferredTime = $('#preferredTime').val();
        if (!preferredTime) {
            $('#preferredTime').closest('.form-group').addClass('error');
            errors.push('שעה');
            isValid = false;
        }

        var dogSelect = $('#dogSelect').val();
        if (!dogSelect) {
            $('#dogSelect').closest('.form-group').addClass('error');
            errors.push('בחירת כלב');
            isValid = false;
        }

        if (!isValid) {
            alert('נא לתקן את השדות הבאים: ' + errors.join(', '));

            var $firstError = $('.form-group.error').first();
            if ($firstError.length) {
                $('html, body').animate({
                    scrollTop: $firstError.offset().top - 120
                }, 400);
            }

            return false;
        }

        // שליחה עם AJAX ל-PHP
        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: 'save_volunteer.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    var selectedDogName = $('#dogSelect option:selected').text();

                    $('#registrationForm').fadeOut(400, function() {
                        var summaryText = 'נרשמת להתנדבות עם ' + selectedDogName +
                                          ' בתאריך ' + preferredDate +
                                          ' בשעה ' + preferredTime;
                        $('#summaryText').text(summaryText);

                        $('#successMessage').addClass('show').hide().fadeIn(400);
                    });

                    localStorage.removeItem('selectedDogId');
                    localStorage.removeItem('selectedDogName');
                } else {
                    alert('שגיאה בשמירת הנתונים: \n' + response.errors.join('\n'));
                }
            },
            error: function() {
                alert('אירעה שגיאה בתקשורת עם השרת. אנא נסה שנית מאוחר יותר.');
            }
        });
    });

    // איפוס הטופס
    $('#resetBtn').on('click', function() {
        $('.form-group').removeClass('error success');
        $('#selectedDogInfo').removeClass('show');
    });

    // הסרת שגיאות תוך כדי הקלדה
    $('input, select').on('input change', function() {
        var $group = $(this).closest('.form-group');

        if ($(this).val()) {
            $group.removeClass('error');
        }
    });

    // שינוי צבע של label בפוקוס
    $('input, select, textarea').on('focus', function() {
        $(this).closest('.form-group').find('label').css('color', '#0f4c75');
    }).on('blur', function() {
        $(this).closest('.form-group').find('label').css('color', '');
    });

});
