/*! SnapNavigation - v0.9.6 - 2014-05-18
* https://github.com/KnowitLabs/knowit-snapnavigation
* Copyright (c) 2014 Andreas Norman; Licensed MIT */
var snapQuicksearch = {
	searchResultTemplate: null,

	init: function () {
		$('.quicksearch-button').on('click', function (event) {
			event.preventDefault();
			$('.snap-drawer-right .loading').show();
			kitUtils.log('Click quicksearch button');
			snapQuicksearch.doQuickSearch($('.snap-drawer-right .searchfield-snap').val());
		});
		$('.snap-drawer-right .searchfield-snap').keydown(function (event) {
			if (event.which === 13) {
				$('.snap-drawer-right .loading').show();
				snapQuicksearch.doQuickSearch($(this).val());
				$(this).blur();
			}
		});

		directive = {
			'li': {
				'pageItems <- Items': {
					'i@class': function (arg) {
						kitUtils.log(arg.pageItems.item.Type);
						return (arg.pageItems.item.Type === 'Page') ? 'fa fa-angle-right' : 'fa fa-file-o';
					},
					'a span': 'pageItems.Header',
					'a@href': 'pageItems.LinkUrl',
				}
			}
		};

		searchResultTemplate = $p('#quicksearch-results-list').compile(directive);
	},
	doQuickSearch: function (query) {
		$href = $('.quicksearchbar').data('searchurl') + '&q=' + query;
		kitUtils.log($href);

		$('#quicksearch-button').attr('href', $href);

		kitUtils.log('start quicksearch');
		$jsonurl = $('.quicksearchbar').data('json');
		$ajaxCall = $.ajax({
			url: $jsonurl + '&query=' + query,
			dataType: 'json'
		});

		// Ajax success
		$ajaxCall.done(function (response) {
			kitUtils.log('quicksearch response');
			// Found products
			kitUtils.log(response);

			$foundResults = response.Items.length;

			// Check if any products found
			if ($foundResults > 0) {
				kitUtils.log('quicksearch results > 0');

				$('#quicksearch-results-list').html(searchResultTemplate(response));
			} else {
				$('div.errormsg p').html('Din sökning på "' + query + '" gav inga träffar.');
				$('div.errormsg').show();
			}

			// Render html
			$('#quicksearch-results .search-number').html($foundResults);
			$('#quicksearch-results .search-term').html(query);
			$('.snap-drawer-right .loading').hide();
			$('#quicksearch-results').show();

			// Set search query session cookie
			$.cookie('searchQuery', query);
		});

		// Ajax error
		$ajaxCall.fail(function () {

			// Render error message ***** Should we get the error message from response.error? *****
			// If so, include jqXHR and response in the fail function
			$('div.errormsg p').html('Something went wrong, please refresh the page and try again.');
			$('div.errormsg').show();

			// Render html
		});
	}
};
var snapNavigation = {
	init: function () {

		// SnapJS
		var snapper = new Snap({
			element: document.getElementById('main-content'),
			maxPosition: 265,
			minPosition: -265,
			tapToClose: true,
			touchToDrag: false
		});

		$(window).bind('orientationchange', function (e) {
			snapper.close();
			$('html,body').animate({
				scrollTop: 0
			}, 0);
		});

		function afterWindowResize() {
			if (kitUtils.isMobileBrowser() === false) {
				snapper.close();
				$('html,body').animate({
					scrollTop: 0
				}, 0);
			}
		}

		var resizeTimer;
		$(window).resize(function () {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(afterWindowResize, 100);
		});

		// Toggle Sidebar
		$('#toggle-sidebar').on('click', function (e) {
			e.preventDefault();

			if ($('body').hasClass('snapjs-left')) {
				snapper.close('left');
			} else {
				snapper.open('left');
			}
		});

		snapper.on('close', function () {
			$('.searchfield-snap').blur();
			$('#top-bar').show();
		});

		snapper.on('open', function () {
			$('#top-bar').hide();
		});

		// Toggles the plus/minus icons when opening and closing ul/li in the menu
		$('.mobile-navigation-list li.haschildren a').click(function (e) {
			kitUtils.log(e.target);
			if ($(e.target).is('i')) {
				$(this).parent().toggleClass('expanded');
				if ($(this).parent().hasClass('expanded')) {
					$(e.target).removeClass('fa-plus');
					$(e.target).addClass('fa-minus');
				} else {
					$(e.target).addClass('fa-plus');
					$(e.target).removeClass('fa-minus');
				}
				e.preventDefault();
			}
		});

		$('.mobile-navigation-list li.haschildren a').on('touchstart', function (e) {
			if (!$(e.target).is('i')) {
				$(this).addClass('focus');
			} else {
				$(e.target).addClass('focus');
			}
		});

		$('.mobile-navigation-list li.haschildren a').on('touchmove', function (e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.mobile-navigation-list li.haschildren a').on('touchend', function (e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.mobile-navigation-list li.haschildren a').on('touchleave', function (e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.mobile-navigation-list li.haschildren a').on('touchcancel', function (e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.snap-overlay').on('click', function (e) {
			snapper.close();
			e.preventDefault();
		});

		$('.snap-overlay').on('touchmove', function (e) {
			snapper.close();
			e.preventDefault();
		});

		$('.snap-overlay').on('touchend', function (e) {
			snapper.close();
			e.preventDefault();
		});

		$('.snap-overlay').on('touchleave', function (e) {
			snapper.close();
			e.preventDefault();
		});

		$('.snap-overlay').on('touchcancel', function (e) {
			snapper.close();
			e.preventDefault();
		});

		// Toggle Sidebar
		$('#toggle-searchbar').on('click', function (e) {
			kitUtils.log('open search');
			if ($.cookie('searchQuery')) {
				kitUtils.log($.cookie('searchQuery'));
				snapQuicksearch.doQuickSearch($.cookie('searchQuery'));
			}
			// Prevent default
			e.preventDefault();

			if ($('body').hasClass('snapjs-right')) {
				// Close sidebar
				snapper.close('right');
			} else {
				// Open sidebar
				snapper.open('right');
				$('html,body').animate({
					scrollTop: 0
				}, 0);
			}
		});

		// Close Link
		$('.snap-drawer .close-menu').on('click', function (e) {
			e.preventDefault();
			snapper.close();
		});
	}
};