/**
 * Filename:     custom.js
 * Version:      1.0.0 (2019-09-20)
 * Website:      https://www.zymphonies.com
 * Description:  Global script
 * Author:        Development team
 info@zymphonies.com
 **/

jQuery(document).ready(function ($) {
    $(".slider-caption a").text("Découvrir");
    $(".slider-caption a").addClass("more-link");
    $("#donate-link").animate({width:'toggle'},350);
    $("#presse-link").animate({width:'toggle'},350);

  $("#donate-key").on("click", function (e) {
      $("#donate-link").animate({width:'toggle'},350);
      /*$(this).slideToggle( "slow", function() {
      });*/
    });
  $("#presse-key").on("click", function (e) {
    $("#presse-link").animate({width:'toggle'},350);
    /*$(this).slideToggle( "slow", function() {
    });*/
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
            window.location.href = baseUrl + "/liste-actions?5B05D=pays%3A#block-actions";
        });
    });
});
