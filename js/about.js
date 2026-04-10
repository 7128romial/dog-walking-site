$(document).ready(function () {

  /* ============================================================
     1. אלמנט שמגיב לאירועים:
        לחיצה (click) ומקלדת (keypress) על כרטיסי חברי הצוות
     ============================================================ */
  $(".team-card").on("click keypress", function (e) {

    // תמיכה בניווט מקלדת - רק Enter
    if (e.type === "keypress" && e.which !== 13) return;

    var $card = $(this);

    // לחיצה שנייה על אותו כרטיס = סגירה
    if ($card.hasClass("active")) {
      closeBioPanel();
      return;
    }

    /* 2. שינוי עיצוב דינמי באמצעות מחלקה:
          הסרת active מכולם, הוספה לנבחר */
    $(".team-card").removeClass("active");
    $card.addClass("active");

    /* 3. כתיבה לתוך אלמנט בדף:
          שליפת הנתונים מה-data attributes וכתיבה ל-#bioText */
    var name = $card.data("name");
    var role = $card.data("role");
    var bio  = $card.data("bio");

    $("#bioText").html("<strong>" + name + "</strong> | " + role + "<br>" + bio);

    // הצגת הפאנל עם אנימציה
    $("#teamBioPanel").slideDown(300);

    // גלילה חלקה לפאנל
    $("html, body").animate({
      scrollTop: $("#teamBioPanel").offset().top - 100
    }, 400);
  });

  /* ============================================================
     סגירת פאנל הביו
     ============================================================ */
  $("#closeBio").on("click", function () {
    closeBioPanel();
  });

  function closeBioPanel() {
    $("#teamBioPanel").slideUp(250, function () {
      $("#bioText").html("");
      $(".team-card").removeClass("active");
    });
  }

  /* ============================================================
     Fade-in בגלילה (כמו בשאר הדפים בפרויקט)
     ============================================================ */
  function checkFadeIn() {
    $(".fade-in").each(function () {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      if (elementTop < viewportBottom - 60) {
        $(this).addClass("visible");
      }
    });
  }

  $(window).on("scroll", checkFadeIn);
  checkFadeIn();

});
