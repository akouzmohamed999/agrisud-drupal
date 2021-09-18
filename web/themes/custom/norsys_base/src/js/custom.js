/**
	* Filename:     custom.js
	* Version:      1.0.0 (2019-09-20)
	* Website:      https://www.zymphonies.com
	* Description:  Global script
	* Author:		Development team
					info@zymphonies.com
**/

function stickyBtnAnimation(){
	jQuery('#bouton-sticky').hide();
	jQuery('.main-content').mouseover(function(){
		jQuery('#bouton-sticky').show();
	});
}

jQuery(document).ready(function($){
	stickyBtnAnimation();
  $("#block-views-block-block-nos-partenaires-block-1 .content div").eq(1).addClass("row");
});
