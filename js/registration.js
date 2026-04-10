/* ===============================================
   WalkMe - Registration Form JavaScript
   Form validations and data handling
   
   VALIDATIONS:
   1. Full Name - at least 2 words (JS)
   2. ID Number - exactly 9 digits
   3. Email - valid format with @ and domain (HTML5 + JS)
   4. Phone - Israeli phone format (JS)
   5. Date - must be future date (JS)
   6. Time - required selection (HTML5)
   7. Dog - required selection (HTML5)
   =============================================== */

$(document).ready(function() {

    // 
    // JS: Load selected dog from URL or localStorage
    // (Data transfer between pages)
    // ===============================================
    function getUrlParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    var dogId = getUrlParam('dog');
    var dogName = getUrlParam('name');
    
    // Try localStorage if not in URL
    if (!dogId) {
        dogId = localStorage.getItem('selectedDogId');
        dogName = localStorage.getItem('selectedDogName');
    }

    if (dogId && dogName) {
        // Show selected dog info
        $('#selectedDogInfo').addClass('show');
        $('#selectedDogName').text(decodeURIComponent(dogName));
        
        // Set hidden field and select
        $('#selectedDog').val(dogId);
        $('#dogSelect').val(dogId);
    }

    // ===============================================
    // JS VALIDATION 1: Full Name
    // Must contain at least 2 words, each at least 2 chars
    // ===============================================
    function validateFullName(name) {
        if (!name) return false;
        
        var words = name.trim().split(/\s+/);
        if (words.length < 2) return false;
        
        // Each word must be at least 2 characters
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

    // ===============================================
    // JS VALIDATION 2: Israeli ID Number
    // Must be 9 digits and pass Luhn algorithm check
    // ===============================================
    function validateIsraeliID(id) {
        // Remove any non-digit characters
        id = id.replace(/\D/g, '');
        
        // Must be exactly 9 digits
        if (id.length !== 9) return false;
        
        // Pad with leading zeros if needed
        id = id.padStart(9, '0');
        
        // Luhn check removed to allow testing IDs
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

    // Allow only digits
    $('#idNumber').on('input', function() {
        $(this).val($(this).val().replace(/\D/g, ''));
    });

    // ===============================================
    // JS VALIDATION 3: Email
    // Must contain @ and valid domain
    // ===============================================
    function validateEmail(email) {
        if (!email) return false;
        
        // Check for @ symbol
        if (email.indexOf('@') === -1) return false;
        
        // Check for valid format
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
            
            // Specific error message
            if (value.indexOf('@') === -1) {
                $('#emailError').text('כתובת אימייל חייבת לכלול @');
            } else if (!/^[a-zA-Z0-9._%+-]+@/.test(value)) {
                $('#emailError').text('כתובת אימייל חייבת להכיל רק אותיות אנגליות');
            } else {
                $('#emailError').text('נא להזין כתובת אימייל תקינה');
            }
        }
    });

    // ===============================================
    // JS VALIDATION 4: Phone Number
    // Israeli phone format: 05X-XXXXXXX or 05XXXXXXXX
    // ===============================================
    function validatePhone(phone) {
        // Remove dashes and spaces
        phone = phone.replace(/[-\s]/g, '');
        
        // Must be 10 digits starting with 05
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

    // Format phone number as user types
    $('#phone').on('input', function() {
        var value = $(this).val().replace(/\D/g, '');
        
        // Auto-format: 05X-XXXXXXX
        if (value.length > 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        
        $(this).val(value);
    });

    // ===============================================
    // JS VALIDATION 5: Date
    // Must be a future date
    // ===============================================
    function validateDate(dateStr) {
        if (!dateStr) return false;
        
        var selectedDate = new Date(dateStr);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return selectedDate > today;
    }

    // Set min date to tomorrow
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

    // ===============================================
    // Form Submission with All Validations
    // ===============================================
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        var isValid = true;
        var errors = [];

        // Validate Full Name (JS validation)
        var fullName = $('#fullName').val();
        if (!validateFullName(fullName)) {
            $('#fullName').closest('.form-group').addClass('error');
            errors.push('שם מלא');
            isValid = false;
        }

        // Validate ID Number (JS validation)
        var idNumber = $('#idNumber').val();
        if (!validateIsraeliID(idNumber)) {
            $('#idNumber').closest('.form-group').addClass('error');
            errors.push('תעודת זהות');
            isValid = false;
        }

        // Validate Email (JS validation)
        var email = $('#email').val();
        if (!validateEmail(email)) {
            $('#email').closest('.form-group').addClass('error');
            errors.push('אימייל');
            isValid = false;
        }

        // Validate Phone (JS validation)
        var phone = $('#phone').val();
        if (!validatePhone(phone)) {
            $('#phone').closest('.form-group').addClass('error');
            errors.push('טלפון');
            isValid = false;
        }

        // Validate Date (JS validation)
        var preferredDate = $('#preferredDate').val();
        if (!validateDate(preferredDate)) {
            $('#preferredDate').closest('.form-group').addClass('error');
            errors.push('תאריך');
            isValid = false;
        }

        // Validate Time (HTML5 required)
        var preferredTime = $('#preferredTime').val();
        if (!preferredTime) {
            $('#preferredTime').closest('.form-group').addClass('error');
            errors.push('שעה');
            isValid = false;
        }

        // Validate Dog Selection (HTML5 required)
        var dogSelect = $('#dogSelect').val();
        if (!dogSelect) {
            $('#dogSelect').closest('.form-group').addClass('error');
            errors.push('בחירת כלב');
            isValid = false;
        }

        if (!isValid) {
            // Show error alert
            alert('נא לתקן את השדות הבאים: ' + errors.join(', '));
            
            // Scroll to first error
            var $firstError = $('.form-group.error').first();
            if ($firstError.length) {
                $('html, body').animate({
                    scrollTop: $firstError.offset().top - 120
                }, 400);
            }
            
            return false;
        }

        // ===============================================
        // AJAX Submission to PHP
        // ===============================================
        var formData = $(this).serialize(); // Collect all form data

        $.ajax({
            type: 'POST',
            url: 'save_volunteer.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Get dog name from select for the summary
                    var selectedDogName = $('#dogSelect option:selected').text();
                    
                    // Hide form and show success message
                    $('#registrationForm').fadeOut(400, function() {
                        // Update summary
                        var summaryText = 'נרשמת להתנדבות עם ' + selectedDogName + 
                                          ' בתאריך ' + preferredDate + 
                                          ' בשעה ' + preferredTime;
                        $('#summaryText').text(summaryText);
                        
                        // Show success
                        $('#successMessage').addClass('show').hide().fadeIn(400);
                    });

                    // Clear localStorage
                    localStorage.removeItem('selectedDogId');
                    localStorage.removeItem('selectedDogName');
                } else {
                    // Show server errors
                    alert('שגיאה בשמירת הנתונים: \n' + response.errors.join('\n'));
                }
            },
            error: function() {
                alert('אירעה שגיאה בתקשורת עם השרת. אנא נסה שנית מאוחר יותר.');
            }
        });
    });

    // ===============================================
    // Reset Form
    // ===============================================
    $('#resetBtn').on('click', function() {
        // Remove all error/success states
        $('.form-group').removeClass('error success');
        
        // Clear selected dog display
        $('#selectedDogInfo').removeClass('show');
    });

    // ===============================================
    // Real-time Input Feedback (Dynamic Styling)
    // ===============================================
    $('input, select').on('input change', function() {
        var $group = $(this).closest('.form-group');
        
        // Remove error state when user starts typing
        if ($(this).val()) {
            $group.removeClass('error');
        }
    });

    // ===============================================
    // JQUERY: Animated form labels
    // ===============================================
    $('input, select, textarea').on('focus', function() {
        $(this).closest('.form-group').find('label').css('color', '#0f4c75');
    }).on('blur', function() {
        $(this).closest('.form-group').find('label').css('color', '');
    });

});
