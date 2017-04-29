var banner = document.getElementById('f-bann')

// liveinternet
if(banner){
	var LiveInternet = "<img src='//counter.yadro.ru/hit?t12.6;r ";
	LiveInternet += "" + escape(document.referrer)
	LiveInternet += ((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth));
	LiveInternet += ";u"+escape(document.URL)+";"+Math.random()+"' alt='' ";
	LiveInternet += "title='24 часа и сегодня' border='0' width='88' height='31' />";
	banner.innerHTML += LiveInternet
}

// google analytics
if (typeof glAnalytics !== 'undefined')
{
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', glAnalytics, 'auto');
	ga('send', 'pageview');
}

// Yandex.Metrika counter
if(banner){
	(function (d, w, c) {
		(w[c] = w[c] || []).push(function() {
			try {
				w.yaCounter44154914 = new Ya.Metrika({
					id:44154914,
					clickmap:true,
					trackLinks:true,
					accurateTrackBounce:true
				});
			} catch(e) { }
		});
		var n = d.getElementsByTagName("script")[0],
			s = d.createElement("script"),
			f = function () { n.parentNode.insertBefore(s, n); };
		s.type = "text/javascript";
		s.async = true;
		s.src = "https://mc.yandex.ru/metrika/watch.js";
		if (w.opera == "[object Opera]") {
			d.addEventListener("DOMContentLoaded", f, false);
		} else { f(); }
	})(document, window, "yandex_metrika_callbacks");

	var YandexMetrika = '<img src="https://mc.yandex.ru/watch/44154914" style="position:absolute; left:-9999px;" alt="" />';
	YandexMetrika += '<a href="https://metrika.yandex.com/stat/?id=44154914&amp;from=informer" target="_blank" rel="nofollow">';
	YandexMetrika += '<img src="https://informer.yandex.ru/informer/44154914/3_1_FFFFFFFF_EFEFEFFF_0_pageviews" ';
	YandexMetrika += '  style="width:88px; height:31px; border:0;" alt="Yandex.Metrica" ';
	YandexMetrika += '  title="Yandex.Metrica: data for today (page views, visits and unique users)"';
	YandexMetrika += '  class="ym-advanced-informer" data-cid="44154914" data-lang="en" />';
	YandexMetrika += '</a>';

	banner.innerHTML += YandexMetrika;
}
if(banner)
	banner.style.display = 'none';
