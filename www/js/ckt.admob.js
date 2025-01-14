if (this._cordovaNative) {

    var admobOptions = {};
    var adMobConfigured = false;

    if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
	    admobOptions = {
		    appId: "ca-app-pub-7124522495709382~5720702136",
		    bannerAdId: 'ca-app-pub-3940256099942544/6300978111',
		    interstitialAdId: 'ca-app-pub-7124522495709382/3512522955', //'ca-app-pub-7124522495709382/6899853210',
		    appOpenAdId: "",
		    isTesting: true,
		    adExtras: {},
		    autoShowInterstitial: true,
		    autoShowRewarded: false
	    }
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  // for ios
	    admobOptions = {
		    appId: "",
		    bannerAdId: 'ca-app-pub-3940256099942544/2934735716',
		    interstitialAdId: 'ca-app-pub-3940256099942544/4411468910', //'ca-app-pub-7124522495709382/7143395794',
		    appOpenAdId: "",
		    isTesting: true,
		    adExtras: {},
		    autoShowInterstitial: true,
		    autoShowRewarded: false
	    }
    }


    thisSucceeded = function(t, s) {
	    console.log(t+' succeeded');
	    window.admob.adStatus = s;
    }

    thisFailed = function(t) {
	    console.log(t+' failed');
    	window.admob.adStatus = 'failed:'+t;
    }

    configAdMob = function() {
	    adMobConfigured = true;
    	console.log('configing admob');
    	window.admob.adStatus = 'initialized';
    	admob.setOptions(admobOptions, function() {thisSucceeded('setOptions', 'initialized')}, function(e) {thisFailed(e+' setOptions')});
    	window.admob.lastRequestTime = 0;
    	window.admob.lastReceivedTime = 0;
    	window.admob.lastShownTime = 0;
    	window.admob.lastClosedTime = 0;

    	window.admob.GetAnAdReady = function() {
            if (window.admob.adStatus != 'requested' && window.admob.adStatus != 'requesting' && window.admob.adStatus != 'loaded') {
				console.log('Ad requested');
				window.admob.lastRequestTime = new Date();
				window.admob.adStatus = 'requesting';
				admob.requestInterstitialAd(admobOptions, function() {thisSucceeded('Request', 'loaded')}, function(e) {thisFailed(e+' Request')});
			}
	    };

    	window.admob.ShowAnAd = function() {
	    	if (window.admob.adStatus == 'loaded') {
				window.admob.adStatus = 'shown';
		    	admob.showInterstitialAd(function() {thisSucceeded('Show', 'shown')}, function(e) {thisFailed(e+' Show')});
			    window.admob.lastShownTime = new Date();
		    }
	    };

    	window.admob.readyToShow = function() {
		    result = (window.admob.adStatus == 'loaded' && ((new Date() - window.admob.lastShownTime) / (1000 * 60) > 5));
			return result;
	    }

	    document.addEventListener(window.admob.events.onAdFailedToLoad, function(event) {
		    console.log(event)
    	});

    	document.addEventListener(window.admob.events.onAdLoaded, function(event) {
	    	console.log(event);
		    window.admob.adStatus = 'loaded';
    		window.admob.lastReceivedTime = new Date();
	    	console.log('Request Took ',Math.round(window.admob.lastReceivedTime - window.admob.lastRequestTime) / (1000),' seconds');
	    });

    	document.addEventListener(window.admob.events.onAdOpened, function(event) {
	    	console.log(event)
	    });

    	document.addEventListener(window.admob.events.onAdStarted, function(event) {
	    	console.log(event)
    	});

    	document.addEventListener(window.admob.events.onAdClosed, function(event) {
	    	console.log(event);
		    window.admob.lastClosedTime = new Date();
    		window.admob.adStatus = 'closed';
	    	window.admob.GetAnAdReady();
	    });

    };

    window.onload = function() {
	    if (!adMobConfigured) {
		    configAdMob();
	    }
    };

}