/* ===============================================
   WalkMe - Dog Details Page JavaScript
   Load dog data from URL parameters
   =============================================== */

$(document).ready(function() {

    // ===============================================
    // Dogs Database (simulated)
    // ===============================================
    var dogsData = {
        1: {
            name: 'חומי',
            breed: 'גולדן רטריבר',
            age: '4 שנים',
            size: 'בינוני',
            energy: 'גבוהה',
            image: '../images/dog-homi.jpg',
            description: 'חומי הוא כלב גולדן רטריבר בן 4, חברותי ואוהב אנשים מאוד. הוא נהדר לטיולים ארוכים ואוהב משחקי אפורט. חומי מסתדר מצוין עם ילדים וכלבים אחרים, והוא תמיד שמח לפגוש פנים חדשות. הוא מאומן ויודע פקודות בסיסיות כמו "שב", "הישאר" ו"בוא".',
            traits: ['חברותי', 'אוהב ילדים', 'מאומן', 'אנרגטי', 'אוהב משחקים'],
            tipDuration: 'חומי אוהב טיולים ארוכים של 45-60 דקות. הוא צריך לפרוק אנרגיה!',
            tipTreats: 'חומי מת על חטיפי עוף ובקר. קחו איתכם כמה לתגמול.',
            tipWarning: 'חומי נוטה למשוך ברצועה כשהוא רואה חתולים. היו מוכנים!'
        },
        2: {
            name: 'לונה',
            breed: 'בורדר קולי',
            age: '2 שנים',
            size: 'קטן',
            energy: 'גבוהה',
            image: '../images/dog-luna.jpg',
            description: 'לונה היא כלבה אנרגטית וחכמה במיוחד. היא אוהבת לרוץ ולשחק משחקי חשיבה. לונה דורשת הרבה גירוי מנטלי ופיזי. היא מתאימה למתנדבים אקטיביים שאוהבים ריצות.',
            traits: ['חכמה', 'אנרגטית', 'מהירה', 'אוהבת לרוץ', 'צריכה גירוי'],
            tipDuration: 'לונה צריכה לפחות שעה של פעילות אינטנסיבית. ריצות ומשחקים!',
            tipTreats: 'לונה אוהבת חטיפים קטנים לאימון. היא עובדת טוב על אוכל.',
            tipWarning: 'לונה עלולה לנסות לרעות ילדים קטנים - זה בטבע שלה. היו ערניים!'
        },
        3: {
            name: 'מקס',
            breed: 'לברדור',
            age: '8 שנים',
            size: 'גדול',
            energy: 'נמוכה',
            image: '../images/dog-max.jpg',
            description: 'מקס הוא כלב לברדור מבוגר ורגוע. הוא נעים הליכות ומתאים לטיולים קצרים ונינוחים. מקס אוהב חיבוקים ופינוקים, והוא חבר נהדר לאנשים מכל הגילאים.',
            traits: ['רגוע', 'נעים הליכות', 'אוהב חיבוקים', 'מתאים לכולם', 'סבלני'],
            tipDuration: 'מקס מעדיף טיולים קצרים של 20-30 דקות. אל תאיצו בו.',
            tipTreats: 'מקס אוהב כל סוג של חטיף. הוא לא בררן!',
            tipWarning: 'מקס מתעייף מהר. שימו לב אם הוא רוצה לנוח.'
        },
        4: {
            name: 'בלה',
            breed: 'ביגל',
            age: '8 חודשים',
            size: 'קטן',
            energy: 'גבוהה',
            image: '../images/dog-bella.jpg',
            description: 'בלה היא גורה ביגל שובבה וסקרנית. היא אוהבת להריח ולחקור את הסביבה. בלה מלאה באנרגיה וזקוקה לסבלנות ואהבה. היא עדיין בתהליך אימון.',
            traits: ['שובבה', 'סקרנית', 'אנרגטית', 'חמודה', 'אוהבת להריח'],
            tipDuration: 'בלה צריכה טיולים קצרים אבל תכופים. 20 דקות מספיקות.',
            tipTreats: 'בלה אוהבת חטיפים רכים לגורים. קחו הרבה לאימון!',
            tipWarning: 'בלה נוטה לאכול דברים מהרצפה. היו ערניים ומנעו ממנה!'
        },
        5: {
            name: 'רוקי',
            breed: 'האסקי',
            age: '5 שנים',
            size: 'גדול',
            energy: 'בינונית',
            image: '../images/dog-rocky.jpg',
            description: 'רוקי הוא כלב האסקי יפהפה עם עיניים כחולות. הוא אוהב טיולים ומשפחות. רוקי ידידותי מאוד אך זקוק ליד יציבה כי הוא חזק. הוא אוהב חברה ומאוד חברותי.',
            traits: ['יפהפה', 'חברותי', 'חזק', 'אוהב טיולים', 'ידידותי'],
            tipDuration: 'רוקי אוהב טיולים של 40-50 דקות. הוא סובל חום פחות טוב.',
            tipTreats: 'רוקי אוהב חטיפי בשר מיובש. הוא מאוד מונע מאוכל!',
            tipWarning: 'רוקי חזק מאוד. החזיקו ברצועה חזק ובשתי ידיים!'
        },
        6: {
            name: "ג'קי",
            breed: 'תחש',
            age: '3 שנים',
            size: 'בינוני',
            energy: 'בינונית',
            image: '../images/dog-jackie.jpg',
            description: "ג'קי הוא כלב תחש מקסים עם אישיות גדולה בגוף קטן. הוא סקרן, נאמן מאוד לבעליו ואוהב להתפנק. ג'קי אוהב לרחרח ולחקור את הסביבה בטיולים.",
            traits: ['נאמן', 'סקרן', 'חכם', 'אוהב ליטופים', 'בעל אופי'],
            tipDuration: "ג'קי גמיש - טיולים של 30-45 דקות מתאימים לו מעולה.",
            tipTreats: "ג'קי לא בררן בכלל. כל חטיף יעשה את העבודה.",
            tipWarning: "ג'קי קצת פחדן מרעשים חזקים. הרגיעו אותו אם יש רעש."
        }
    };

    // ===============================================
    // JS: Get dog ID from URL parameters
    // ===============================================
    function getUrlParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    var dogId = getUrlParam('id');

    // If no ID in URL, try localStorage
    if (!dogId) {
        dogId = localStorage.getItem('selectedDogId');
    }

    // Only allow dog 1 (Chomi) - redirect others to dogs.html
    if (dogId != 1) {
        alert('פרטי כלב זה יהיו זמינים בקרוב!\nכרגע רק חומי זמין להתנדבות.');
        window.location.href = 'dogs.html';
        return;
    }

    // Default to dog 1 if no ID found
    if (!dogId || !dogsData[dogId]) {
        dogId = 1;
    }

    // ===============================================
    // JS: Load dog data and display
    // (Writing to elements)
    // ===============================================
    var dog = dogsData[dogId];

    if (dog) {
        // Update page title
        document.title = 'WalkMe - ' + dog.name;

        // Update dog info (writing to elements)
        $('#dogName').text(dog.name);
        $('#dogImage').attr('src', dog.image).attr('alt', dog.name);
        $('#dogBreed').text(dog.breed);
        $('#dogAge').text(dog.age);
        $('#dogSize').text(dog.size);
        $('#dogEnergy').text(dog.energy);
        $('#dogDescription').text(dog.description);

        // Update traits (writing to element)
        var traitsHtml = '';
        dog.traits.forEach(function(trait) {
            traitsHtml += '<span class="trait-tag">' + trait + '</span>';
        });
        $('#dogTraits').html(traitsHtml);

        // Update video section
        $('#dogNameVideo').text(dog.name);
        $('#dogNameCaption').text(dog.name);
        $('#dogNameTips').text(dog.name);

        // Update tips
        $('#tipDuration').text(dog.tipDuration);
        $('#tipTreats').text(dog.tipTreats);
        $('#tipWarning').text(dog.tipWarning);

        // Update registration button link
        $('#registerBtn').attr('href', 'registration.html?dog=' + dogId + '&name=' + encodeURIComponent(dog.name));

        // Save to localStorage for registration page
        localStorage.setItem('selectedDogId', dogId);
        localStorage.setItem('selectedDogName', dog.name);
    }

    // ===============================================
    // JQUERY: Add animation to elements
    // ===============================================
    $('.dog-gallery img').hide().fadeIn(800);
    $('.dog-info-card').hide().slideDown(600);

    // ===============================================
    // JQUERY: Dynamic styling on hover
    // ===============================================
    $('.trait-tag').hover(
        function() {
            $(this).addClass('trait-hover');
        },
        function() {
            $(this).removeClass('trait-hover');
        }
    );

});
