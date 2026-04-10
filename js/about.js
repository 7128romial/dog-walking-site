$(document).ready(function () {

  // לחיצה או מקלדת על כרטיסי הצוות
  $(".team-card").on("click keypress", function (e) {

    // תמיכה במקלדת - רק Enter
    if (e.type === "keypress" && e.which !== 13) return;

    var $card = $(this);

    // לחיצה שנייה על אותו כרטיס סוגרת את הפאנל
    if ($card.hasClass("active")) {
      closeBioPanel();
      return;
    }

    // הסרה של active מכולם והוספה לכרטיס שנלחץ
    $(".team-card").removeClass("active");
    $card.addClass("active");

    // שליפת המידע מה-data attributes וכתיבה לפאנל
    var name = $card.data("name");
    var role = $card.data("role");
    var bio  = $card.data("bio");

    $("#bioText").html("<strong>" + name + "</strong> | " + role + "<br>" + bio);

    // הצגת הפאנל
    $("#teamBioPanel").slideDown(300);

    // גלילה לפאנל
    $("html, body").animate({
      scrollTop: $("#teamBioPanel").offset().top - 100
    }, 400);
  });

  // כפתור סגירה של הפאנל
  $("#closeBio").on("click", function () {
    closeBioPanel();
  });

  function closeBioPanel() {
    $("#teamBioPanel").slideUp(250, function () {
      $("#bioText").html("");
      $(".team-card").removeClass("active");
    });
  }

  // אפקט fade in בגלילה
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
