/**
 * Filename:     custom.js
 * Version:      1.0.0 (2019-09-20)
 * Website:      https://www.zymphonies.com
 * Description:  Global script
 * Author:        Development team
 info@zymphonies.com
 **/

jQuery(document).ready(function ($) {
  $("#search-block-form .form-item").hide();

  //manage language
  var urlElements = (location.pathname).split("/");
  /*if ("en" == urlElements[2] || urlElements[1] == "en") {
    $('#language-select').val("en");
  } else {
    $('#language-select').val("fr");
  }*/
  if ($(window).width() > 600) {
    $(".slider-caption a").text(Drupal.t("Découvrir"));
    $(".slider-caption a").addClass("more-link");
  }
  $("#donate-link").animate({width: 'toggle'}, 350);
  $("#presse-link").animate({width: 'toggle'}, 350);

  // Managing redirection onclick on taxonomy terms in page 'nos réseaux et partenaires'
  $("#views-bootstrap-liste-type-partenaires-block-1 .views-field a").on("click", function (e) {
    e.preventDefault();
    window.location.href = baseUrl + "/liste-partenaires?f%5B0%5D=type_de_partenaire%3A" + this.href.substring(this.href.lastIndexOf('/') + 1);
  });

  $("#donate-key").on("click", function (e) {
    $("#donate-link").animate({width: 'toggle'}, 350);
  });
  $("#presse-key").on("click", function (e) {
    $("#presse-link").animate({width: 'toggle'}, 350);
  });
  $("#block-views-block-block-nos-partenaires-block-1 .content div").eq(1).addClass("row");
  var pays = ["maroc", "bresil", "france", "senegal", "guinee-bissau", "malaisie", "cambodge", "laos", "vietnam", "chine",
    "mayotte", "maurice", "madagascar", "rd-congo", "seychelles", "Indonesie", "mozambique", "gabon", "sao-tome",
    "niger-2", "benin", "cote-ivoire", "haiti", "inde"];
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  $.each(pays, function (index, value) {
    $("#" + value).attr('title', $("#" + value).attr('inkscape:label'));
    $("#" + value).tooltip();

    $("#" + value).on("click", function (e) {
      index = index + 1;
      window.location.href = baseUrl + "/liste-actions?field_pays=" + index + "#block-actions";
    });
  });

  //manage language change
 /* $('#language-select').on('change', function () {
    var getUrl = window.location;
    window.location.href = baseUrl + "/" + this.value;
  });*/

  //Managing search button
  $("#edit-submit").on("click", function (e) {
    if ($("#search-block-form .form-item").css("display") == "none") {
      e.preventDefault();
      $("#search-block-form .form-item").css("display", "inline");
      $("#search-block-form .form-item").show();
    }
  });
  var listPages = ["#views-bootstrap-nos-actualites-view-page-1 .field--name-body", "#views-bootstrap-liste-actions-page-1 .field--name-body"];
  var caractersCount = 175;
  if ($(window).width() < 992 || $(window).width() < 600) {
    $.each(listPages, function (index, value) {
      if (index == 1 || $(window).width() < 600) {
        caractersCount = 82;
      }
      if ( $(window).width() < 580) {
        caractersCount = 0;
      }
      $(value).each(function () {
        var lastElements = $(this).find(".more-link").eq(0).html();
        console.log(lastElements);
        $(this).text($(this).text().substring(0, caractersCount));
        $(this).html($(this).html() + lastElements);
      });
    });
  }


});
