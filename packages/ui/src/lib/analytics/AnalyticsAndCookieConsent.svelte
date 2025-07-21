<script context="module">
	/*
		The majority of this Civic config is replicated across london.gov.uk.
		Please check any needed changes with the Digital team before applying
		them.
	
		If the Digital team informs the City Data team of config changes make
		sure to remove any '\r\n' characters from text fields and use only
		the apps.london.gov.uk API key (different subdomains have different
		keys).
	
		If the page is embedded within another london.gov.uk page then cookie
		consent is disabled. It will be enabled everywhere else including
		other domains containing or managed by GLA teams,
		e.g. registertovote.london.
	
		Docs: https://www.civicuk.com/cookie-control/documentation/getting-started

		If this page is embedded within a london.gov.uk webpage and a cookie
		consent has yet to be set then a periodic script will run that cancels
		itself and reloads this page once the cookie is finally set. This
		ensures analytics is disabled or enabled based on the users preference
		set in the parent page.
	*/
</script>

<svelte:head>
	<script
		src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
		type="text/javascript"
	></script>

	<script>
		var ldnVizCivic = {
			appName: window.ldnVizCivicAppName || 'Embedded app',
			intervalId: null,
			initialIntervalId: null,
			config: {
				apiKey: window.ldnVizCivicApiKey,
				product: 'PRO_MULTISITE',
				logConsent: false,
				consentCookieExpiry: 90,
				encodeCookie: false,
				subDomains: true,
				notifyOnce: false,
				rejectButton: true,
				toggleType: 'slider',
				closeStyle: 'button',
				settingsStyle: 'link',
				initialState: 'NOTIFY',
				layout: 'SLIDEOUT',
				position: 'LEFT',
				theme: 'LIGHT',
				necessaryCookies: [
					'CONSENT',
					'CookieConsent',
					'crisis_communication_modal',
					'googtrans',
					'test_cookie',
					'what-intent'
				],
				optionalCookies: [
					{
						name: 'Marketing',
						label: 'Marketing',
						description:
							'<p>Marketing cookies are used to track visitors across websites. These cookies are used to try to display ads (or track the success of adverts on other sites) that are relevant to our visitors. Often these are not used by london.gov.uk, but by services like YouTube or other third parties that we use on our website.</p>',
						cookies: ['_gcl_au', 'pagead/landing', 'YSC', 'VISITOR_INFO1_LIVE'],
						onAccept: 'function(){}',
						onRevoke: 'function(){}',
						recommendedState: false,
						lawfulBasis: 'consent'
					},
					{
						name: 'Statistics',
						label: 'Statistics',
						description:
							"<p>We use services such as Google Analytics and Hotjar to measure how visitors use our website so we can improve it. Google Analytics and Hotjar set cookies that store anonymised information about how you got to the site, the pages you visit, how long you spend on each page and what you click on while you're visiting the site.</p>",
						cookies: ['_ga', '_gid', '_ga_#', '_ga*'],
						onAccept: 'function(){}',
						onRevoke: 'function(){}',
						recommendedState: false,
						lawfulBasis: 'consent'
					}
				],
				excludedCountries: [],
				debug: false,
				setInnerHTML: true,
				mode: 'GDPR',
				acceptBehaviour: 'all',
				closeOnGlobalChange: false,
				notifyDismissButton: false,
				sameSiteCookie: true,
				sameSiteValue: 'Strict',
				iabCMP: false,
				statement: {
					description: 'Before deciding ',
					name: 'read more about our cookies',
					updated: '28/07/2021'
				},
				ccpaConfig: [],
				accessibility: {
					accessKey: 'C',
					overlay: true,
					outline: true,
					disableSiteScrolling: false
				},
				text: {
					title: 'Cookies on london.gov.uk',
					intro:
						'<p>We use some essential cookies to make this website work.</p><p>We’d like to set additional cookies to understand how you use london.gov.uk, remember your settings and improve our services.</p><p>We also use cookies set by other sites to help us deliver content from their services.</p>',
					acceptRecommended: 'Accept Recommended Settings',
					acceptSettings: 'Accept additional cookies',
					rejectSettings: 'Reject additional cookies',
					necessaryTitle: 'Necessary Cookies',
					necessaryDescription: '<p>We use some essential cookies to make this website work.</p>',
					thirdPartyTitle: 'Third party cookies.',
					thirdPartyDescription:
						'<p>We also use cookies set by other sites to help us deliver content from their services.</p>',
					on: 'Yes',
					off: 'No',
					notifyTitle: 'Your choice regarding cookies on this site',
					notifyDescription:
						'<p>We use some essential cookies to make this website work.</p><p>We’d like to set additional cookies to understand how you use london.gov.uk, remember your settings and improve government services.</p><p>We also use cookies set by other sites to help us deliver content from their services.</p>',
					accept: 'I Accept',
					reject: 'I Reject',
					settings: 'View cookies',
					closeLabel: 'Hide this message',
					cornerButton: 'Set cookie preferences.',
					landmark: 'Cookie preferences.',
					showVendors: 'Show vendors within this category',
					thirdPartyCookies: 'This vendor may set third party cookies.',
					readMore: 'Read more'
				},
				branding: {
					fontSizeTitle: 'em',
					fontSize: 'em',
					toggleText: '#ffffff',
					toggleColor: '#ffffff',
					toggleBackground: '#e7135d',
					buttonIconWidth: 'px',
					buttonIconHeight: 'px',
					removeIcon: true,
					removeAbout: true,
					rejectText: null,
					rejectBackground: '',
					closeText: '',
					closeBackground: '#e7135d',
					notifyFontColor: '',
					notifyBackgroundColor: ''
				},
				locales: []
			}
		};

		ldnVizCivic.isCookieControlManagedByParent = function () {
			if (window.location === window.parent.location) {
				return false;
			}

			try {
				const londonGovDomains = ['.london.gov.uk'];
				const url = document.referrer;
				const hostname = new URL(url).hostname;

				for (const domain of londonGovDomains) {
					if (hostname.endsWith(domain)) {
						return true;
					}
				}

				return false;
			} catch (err) {
				return false;
			}
		};

		ldnVizCivic.hasCookieControl = function () {
			return !!document.cookie
				.split('; ') //
				.find((c) => c.startsWith('CookieControl'));
		};

		ldnVizCivic.reloadWhenCookieControlAdded = function () {
			if (ldnVizCivic.hasCookieControl()) {
				clearInterval(ldnVizCivic.intervalId);
				console.warn(`[${ldnVizCivic.appName}] CookieControl detected, reloading myself`);
				window.location.reload();
			}
		};

		ldnVizCivic.init = function () {
			if (CookieControl) {
				clearInterval(ldnVizCivic.initialIntervalId);
			} else {
				return;
			}

			if (!ldnVizCivic.isCookieControlManagedByParent()) {
				CookieControl.load(ldnVizCivic.config);
				return;
			}

			if (!ldnVizCivic.hasCookieControl()) {
				/* Only required on user's first visit. */
				ldnVizCivic.intervalId = setInterval(ldnVizCivic.reloadWhenCookieControlAdded, 1000);
			}
		};

		ldnVizCivic.initialIntervalId = setInterval(ldnVizCivic.init, 500);
	</script>

	<script>
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-KXBTQP');
	</script>
</svelte:head>

<noscript>
	<iframe
		title="Google Tag Manager"
		src="https://www.googletagmanager.com/ns.html?id=GTM-KXBTQP"
		height="0"
		width="0"
		style="display:none;visibility:hidden"
	></iframe>
</noscript>

<style global>
	/*
		Sorry for the verbosity but pure CSS is needed so this can
		easily be ported to older services and other teams.
	*/

	#ccc #ccc-module.ccc-module--slideout {
		max-width: 530px !important;
	}

	#ccc button.ccc-notify-button {
		font-weight: bold !important;
	}

	#ccc button.ccc-notify-button:focus-within,
	#ccc #ccc-content .checkbox-toggle:focus-within {
		outline-color: #e7135d !important;
		outline-style: solid !important;
		outline-width: medium !important;
		outline-offset: 2px !important;
	}

	#ccc #ccc-notify button#ccc-notify-accept,
	#ccc #ccc-notify button#ccc-notify-reject,
	#ccc #ccc-content button#ccc-recommended-settings,
	#ccc #ccc-content button#ccc-reject-settings,
	#ccc #ccc-content button#ccc-dismiss-button {
		border-color: #e7135d !important;
	}

	#ccc #ccc-notify button#ccc-notify-accept:hover,
	#ccc #ccc-notify button#ccc-notify-reject:hover,
	#ccc #ccc-content button#ccc-recommended-settings:hover,
	#ccc #ccc-content button#ccc-reject-settings:hover,
	#ccc #ccc-content button#ccc-dismiss-button:hover {
		background-color: #e7135d !important;
	}

	#ccc #ccc-notify button#ccc-notify-accept:hover span,
	#ccc #ccc-notify button#ccc-notify-reject:hover span,
	#ccc #ccc-content button#ccc-recommended-settings:hover span,
	#ccc #ccc-content button#ccc-reject-settings:hover span,
	#ccc #ccc-content button#ccc-dismiss-button:hover span {
		color: white !important;
	}

	#ccc #ccc-content button#ccc-dismiss-button:hover {
		border-color: #9e0059 !important;
		background-color: #9e0059 !important;
	}

	#ccc #ccc-content button#ccc-dismiss-button:hover span {
		background-color: #9e0059 !important;
		text-decoration: underline !important;
	}
</style>
