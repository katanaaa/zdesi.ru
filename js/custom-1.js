function menu(el){
	$('.mob').click(function(e){
		e.preventDefault();
		$('body').toggleClass('menu-sidebar');
	});
	// $('#site-cache').click(function(e){
	// 	$('body').removeClass('menu-sidebar');
	// });
}
function headerScroll(){

	var nav = $('body > nav');
	var ww = $(window).width();

	$("document").ready(function($){
		$(window).scroll(function () {
			if ($(this).scrollTop() > ($( 'body > header' ).outerHeight()) ) {
				$( 'body > header' ).css( { "margin-bottom" : $( 'body > nav' ).outerHeight() +"px" } );
				nav.addClass("container-fluid menu-fixed");
				//  alert($( 'body > nav' ).position().top);
			} else {
				$( 'body > header' ).css( { "margin-bottom" : "0px" } );
				nav.removeClass("menu-fixed");
			}
		});
	});
}
function fbPage(){
	var iframe = document.createElement("iframe");
	var width = 260;
	var height = 154;

	iframe.src = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwww.zdesi.ru&tabs=time&width='+width+'&height='+height+'&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
	iframe.scrolling = 'no';
	iframe.frameBorder = '0';
	iframe.className = 'fb-page';
	iframe.setAttribute('allowtransparency', 'true');
	iframe.setAttribute('width', width);
	iframe.setAttribute('height', height);
	document.getElementById("fb-page").appendChild(iframe);
}
function articleSuggestions(){
	if (typeof gsPage !== 'undefined' && typeof gsID !== 'undefined')
		$.ajax({
			url: '/ajax/',
			type: 'post',
			dataType: 'json',
			data: {by: gsPage, id:gsID, action: 'GET_ARTICLE_POSTS'},
			beforeSend: function(){
				$( '#article-suggestions' ).before( "<div id='loading-artsu' class='loading'><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>" );
				// Handle the beforeSend event
			},
			complete: function (data) {
				console.log(data);
				$( '#loading-artsu' ).remove();
				//$( 'ul.pag' ).append( data.responseText );
				$( '#article-suggestions' ).before( data.responseText );
			}
		});
}
function suggestionsRight(){
	if (typeof gsPage !== 'undefined')
		$.ajax({
			url: '/ajax/',
			type: 'post',
			dataType: 'json',
			data: {by: gsPage, id:(typeof gsID == "undefined") ? '' : gsID, action: 'GET_SUGESTIONS'},
			beforeSend: function(){
				$( '#suggestions' ).before( "<div id='loading-suggestions' class='loading'><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>" );
				// Handle the beforeSend event
			},
			complete: function (data) {
				console.log(data);
				$( '#loading-suggestions' ).remove();
				//$( 'ul.pag' ).append( data.responseText );
				$( '#suggestions' ).before( data.responseText );
			}
		});
}
var timeLineArticlesWait = false;
if(timeLineArticlesCount === undefined)
	var timeLineArticlesCount = 3;
function getArticles(){
	if(typeof lastId !== 'undefined'){
		if(timeLineArticlesWait == false && timeLineArticlesCount > 0) {
			$.ajax({
				url: '/ajax/',
				type: 'post',
				dataType: 'json',
				data: {lastItem: lastId, action: 'GET_LAST_POSTS', count: timeLineArticlesCount},
				beforeSend: function(){
					timeLineArticlesWait = true;
					timeLineArticlesCount--;
					$( '#more-articles' ).before( "<div id='loading-news' class='loading'><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>" );
					// Handle the beforeSend event
				},
				complete: function (data) {
					if(timeLineArticlesCount < 1){
						$( '#pag' ).css('display', 'block');
						$( '#more-articles' ).css('display', 'none');
					} else
						$( '#pag' ).css('display', 'none');
					console.log(data);
					$( '#loading-news' ).remove();
					//$( 'ul.pag' ).append( data.responseText );
					$( '#more-articles' ).before( data.responseText );
					timeLineArticlesWait = false;
				}
			});
		}
	}
}
function timeLineArticles(){
//	alert(lastId);
	if(typeof lastId !== 'undefined'){
		$("document").ready(function($){
			$(window).scroll(function () {
				//alert(timeLineArticlesWait + ' ' + timeLineArticlesCount + '---');

				var wh = $(window).height();
				if(timeLineArticlesWait == false && timeLineArticlesCount > 0) {
					if(($(window).scrollTop() + wh - 100) > ($( '.big-col' ).outerHeight() + $( '.big-col' ).offset().top )){
						//alert(lastId + '--s-');
						getArticles();
					}
				}
			});
		});
	}
}

function sendFrontEndErrors(data){

	$.ajax({
		url: '/ajax/',
		type: 'post',
		dataType: 'json',
		data: {url: data.url, type:data.type, message:data.message, description:data.description, action:'REGISTER_ERROR'},
		beforeSend: function(){
		},
		complete: function (data) {
		}
	});
}
/*
$(document).ajaxError(function(e, request, settings) {
	console.log(e)
	var data = {
		message: settings.url,
		description: e.result + ' ',
		url: window.location.href,
		type: "Ajax Error"
	};
	sendFrontEndErrors(data);
});
*/
/*
*/


/////////////////////////////////////////////////////////////////////////
//	https://habrahabr.ru/post/156185/
var Share = {
	vk: function(purl, ptitle, pimg, text) {
		var data = this.getData(purl, ptitle, pimg, text);
		url  = 'http://vkontakte.ru/share.php?';
		url += 'url='		  + encodeURIComponent(data.url);
		url += '&title='	   + encodeURIComponent(data.title);
		url += '&description=' + encodeURIComponent(data.text);
		url += '&image='	   + encodeURIComponent(data.img);
		url += '&noparse=true';
		return Share.popup(url);
	},
	ok: function(purl, text) {
		var data = this.getData(purl, undefined, undefined, text);
		url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		url += '&st.comments=' + encodeURIComponent(data.text);
		url += '&st._surl='	+ encodeURIComponent(data.url);
		return Share.popup(url);
	},
	fb: function(purl, ptitle, pimg, text) {
		var data = this.getData(purl, ptitle, pimg, text);
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='	 + encodeURIComponent(data.title);
		url += '&p[summary]='   + encodeURIComponent(data.text);
		url += '&p[url]='	   + encodeURIComponent(data.url);
		url += '&p[images][0]=' + encodeURIComponent(data.img);
		return Share.popup(url);
	},
	tw: function(purl, ptitle) {
		var data = this.getData(purl, ptitle);
		url  = 'http://twitter.com/share?';
		url += 'text='	  + encodeURIComponent(data.title);
		url += '&url='	  + encodeURIComponent(data.url);
		url += '&counturl=' + encodeURIComponent(data.url);
		return Share.popup(url);
	},
	mr: function(purl, ptitle, pimg, text) {
		var data = this.getData(purl, ptitle, pimg, text);
		url  = 'http://connect.mail.ru/share?';
		url += 'url='		  + encodeURIComponent(data.url);
		url += '&title='	   + encodeURIComponent(data.title);
		url += '&description=' + encodeURIComponent(data.text);
		url += '&imageurl='	+ encodeURIComponent(data.img);
		return Share.popup(url);
	},
	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
		return false;
	},
	getData: function(purl, ptitle, pimg, text) {
		if(purl === undefined)
			purl = snURL;
		if(ptitle === undefined)
			ptitle = snTitle;
		if(text === undefined)
			text = snDesc;
		if(text.length < 7)
			text = ptitle;
		if(pimg === undefined)
			pimg = snImage;
		return {url: purl, title: ptitle, text: text, img: pimg}
	}
};

var jQueryScriptOutputted = false;
function initJQuery(first, cb) {
	//if the jQuery object isn't available
	if (typeof(jQuery) == 'undefined') {
		if (! jQueryScriptOutputted && first == false) {
			//only output the script once..
			jQueryScriptOutputted = true;
			var jq = document.createElement("script");
			jq.type = "text/javascript";
			jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
			document.getElementsByTagName("head")[0].appendChild(jq);
			console.log("Added jQuery!");
		}
		setTimeout("initJQuery(false, " + cb + ")", (first ? 500 : 50));
	} else{
		window.addEventListener('error', function(e) {
			var data = {
				message: e.message,
				description: e.filename + ':  ' + e.lineno,
				url: window.location.href,
				type: 'js'
			};
			sendFrontEndErrors(data);
		});
		menu();
		suggestionsRight();
		articleSuggestions();
		// remove #id from location
		//if (typeof window.history.replaceState == 'function') {
		//	var loc = window.location.toString().split('#');
		//	history.replaceState({}, '', loc[0]);
		//}
		headerScroll();
		fbPage();
		if(typeof lastId !== 'undefined') timeLineArticles();

		// if (!$.cookie('device')) {
		// 	var coo = {expires: 180, path: '/'};
		// 	if (/Android/i.test(navigator.userAgent)) {
		// 		$.cookie('device', 'android', coo);
		// 		$.cookie('mobile', '1', coo);
		// 	} else if (/iPhone/i.test(navigator.userAgent)) {
		// 		$.cookie('device', 'iphone', coo);
		// 		$.cookie('mobile', '1', coo);
		// 	} else if (/iPad/i.test(navigator.userAgent)) {
		// 		$.cookie('device', 'ipad', coo);
		// 		$.cookie('mobile', '1', coo);
		// 	} else if (/iPod/i.test(navigator.userAgent)) {
		// 		$.cookie('device', 'ipod', coo);
		// 		$.cookie('mobile', '1', coo);
		// 	} else {
		// 		$.cookie('device', 'other', coo);
		// 		$.cookie('mobile', '0', coo);
		// 	}
		// }
	}
}

window.onload = initJQuery(true, function() {});
