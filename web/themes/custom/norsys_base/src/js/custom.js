/**
 * Filename:     custom.js
 * Version:      1.0.0 (2019-09-20)
 * Website:      https://www.zymphonies.com
 * Description:  Global script
 * Author:        Development team
 info@zymphonies.com
 **/

/*jQuery(document).on("scroll", function($) {
  console.log('rrr');
  $("#toTop").show();
});*/
/*jQuery(this).on("scroll", function($) {
  //alert(1);
  $("#toTop").hide();
});*/

function agrisudCarousel(id,activeElement) {
  jQuery(id).carousel('next').click(function () {
    jQuery('.active').removeClass('active');
    jQuery('.carousel-item:nth-child('+ activeElement +')').addClass('active');
    activeElement = activeElement + 6;
    if(activeElement > jQuery(id + ' .carousel-item').length){
      activeElement = activeElement - jQuery(id + ' .carousel-item').length;
    }
  });
}

jQuery(document).ready(function ($) {
  $("#search-block-form .form-item").hide();
  $("#toTop").hide();
  $("#toTop").on("click", function (e) {
    $("html, body").animate({scrollTop: 0}, 'slow');
  });

  //Custom carousel agrisud
  var activeElement = 6
  if($('.carousel .carousel-item').length <= 6){
    $(".carousel-control-prev").hide()
    $(".carousel-control-next").hide()
  }
  agrisudCarousel('#views-bootstrap-partenaires-block-1',activeElement);
  agrisudCarousel('#views-bootstrap-liste-reseau-block-1',activeElement);
  agrisudCarousel('#views-bootstrap-liste-partenaires-page-1',activeElement);

  //manage language
  var urlElements = (location.pathname).split("/");
  /*if ("en" == urlElements[2] || urlElements[1] == "en") {
    $('#language-select').val("en");
  } else {
    $('#language-select').val("fr");
  }*/
  if ($(window).width() > 600) {
    $(".slider-caption a").text(Drupal.t("En savoir plus"));
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
  var pays = {"maroc" : 1, "bresil" : 2 , "france" : 34, "senegal" : 35, "guinee-bissau" : 36, "malaisie" : 37, "cambodge" : 30, "laos" : 33, "vietnam" : 38, "chine" : 39,
    "mayotte" : 40, "maurice" : 41, "madagascar" : 42, "rd-congo" : 43, "seychelles" : 44, "Indonesie" : 45, "mozambique" : 46, "gabon" : 47, "sao-tome" : 48,
    "niger-2" : 11, "benin" : 49, "cote-ivoire" : 50, "haiti" : 32, "inde" : 51};

  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  $.each(pays, function (index, value) {
    $("#" + index).attr('title', $("#" + index).attr('inkscape:label'));
    $("#" + index).tooltip();

    $("#" + index).on("click", function (e) {
      window.location.href = baseUrl + "/liste-actions?field_pays=" + value + "#block-actions";
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
  var listPages = ["#views-bootstrap-nos-actualites-view-page-1 .field--name-body",
    "#views-bootstrap-liste-actions-page-1 .field--name-body",
    "#views-bootstrap-temoignage-block-1 .group-desc .custom-body"];
  var caractersCount = 175;
  if ($(window).width() < 992 || $(window).width() < 600) {
    $.each(listPages, function (index, value) {
      if (index == 0 || index == 1) {
        if (index == 1 || $(window).width() < 600) {
          caractersCount = 82;
        }
        if ( $(window).width() < 580) {
          caractersCount = 0;
        }
        $(value).each(function () {
          var lastElements = $(this).find(".more-link").eq(0).html();
          $(this).text($(this).text().substring(0, caractersCount));
          $(this).html($(this).html() + lastElements);
        });
      } else {
        $(value).each(function () {
          $(this).text($(this).text().substring(0, 260));
          console.log($(this).html());
          $(this).html($(this).html());
        });
      }
    });
  }

  $( "#navbarSupportedContent li div div" ).addClass("show sub-menu-agrid");
$(".path-nos-actualites .features .features-list div:first").addClass('row');
$("#views-bootstrap-equipe-block-5 div.row:first").addClass('justify-content-center');

//intégration des icones pour les RS
var $j = 0; // initialisation de deux compteurs

//partie direction générale
  $('#block-views-block-equipe-block-2 .views-field-field-linkedin').each(function(){
    $(this).addClass("dg-views-field-field-messagerie"+$j);
    $j++;
  });

  $j=0;
  $('#block-views-block-equipe-block-2 .views-field-field-messagerie').each(function(){
    $(this).addClass("dg-views-field-field-messagerie"+$j);
    $('.dg-views-field-field-messagerie'+$j).wrapAll('<div class="row px-3 mt-3"></div>');
    $j++;
  });

  //représentant pays
  $j=0;
  $('#block-views-block-equipe-block-3 .views-field-field-linkedin').each(function(){
    $(this).addClass("rp-views-field-field-messagerie"+$j);
    $j++;
  });

  $j=0;
  $('#block-views-block-equipe-block-3 .views-field-field-messagerie').each(function(){
    $(this).addClass("rp-views-field-field-messagerie"+$j);
    $('.rp-views-field-field-messagerie'+$j).wrapAll('<div class="row px-3 mt-3"></div>');
    $j++;
  });

  //ajout de class au lien pays
  $('#block-views-block-equipe-block-3 .views-field-field-pays a').addClass("text-danger");
  if ( $(window).width() <= 575) {
    $("#block-block1.block-externe-agir").addClass('row');
  }
  if ( $(window).width() < 1008) {
    $("#block-accederauxelementsfinanciers .block-content").addClass('d-contents');
    $("#block-accederauxelementsfinanciers").addClass('agrisud-y-scroll');
    $("#block-tousleschiffresetresultatsdactivite .block-content").addClass('d-contents');
    $("#block-tousleschiffresetresultatsdactivite").addClass('agrisud-y-scroll');
    $(".block-resultat-tpe-finance").addClass('row');
    $(".block-resultat-tpe-finance #block-tousleschiffresetresultatsdactivite").removeClass('mr-5');
  }
  $( ".block-actions-accueil .block1_title_action h3" ).addClass("title_d_content");
  $( ".block-actions-accueil .block1_title_action h3 a" ).addClass("title_d_content");
  $( "#views-bootstrap-liste-actions-page-1 .liste-actions" ).addClass("title_d_content");

  if ($(window).width() <= 767 ) {
  $( "#views-bootstrap-programmes-multi-pays-block-1 .row" ).addClass("d-block");
  $( "#views-bootstrap-diffuser-et-promouvoir-des-pratiques-durables-block-1 .row" ).addClass("d-block");
  }

  if ($(window).width() <= 520 ) {
  $("#views-bootstrap-equipe-block-1 .row .ligne-view" ).addClass("d-contents");
    $("#views-bootstrap-equipe-block-2 .row:first" ).addClass("d-contents");
    $("#views-bootstrap-equipe-block-2 .row .ligne-view" ).addClass("d-contents");
    $("#views-bootstrap-equipe-block-3 .row:first" ).addClass("d-contents");
    $("#views-bootstrap-equipe-block-3 .row .ligne-view" ).addClass("d-contents");
    $("#views-bootstrap-equipe-block-4 .row .ligne-view" ).addClass("d-contents");
    $("#views-bootstrap-equipe-block-4 .row .ligne-view .node--view-mode-conseil-d-orientation" ).addClass("w-100");
  $("#views-bootstrap-equipe-block-5 .row .ligne-view" ).addClass("d-contents");
  $("#views-bootstrap-equipe-block-5 .row " ).addClass("px-3");

  }
});

jQuery(window).scroll(function() {
  var $el = jQuery('#toTop');
  if (jQuery(this).scrollTop() >= 200) {
    $el.fadeIn();
  } else {
    $el.fadeOut();
  }
  /*if(jQuery(this).scrollTop() >= 200) $el.addClass('shown');
  else $el.removeClass('shown');*/
});
