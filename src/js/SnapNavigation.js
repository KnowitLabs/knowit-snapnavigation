var snapNavigation = {
	breakpoint: 991,

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
				if( $('.snap-content').css('position') === 'absolute') {
					snapper.close();
					$('html,body').animate({
						scrollTop: 0
					}, 0);
				}
				if ($( window ).width() > snapNavigation.breakpoint) {
					$('.snap-content').attr('style', '');
				}
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
			kitUtils.log('toggle-sidebar');

			if ($('body').hasClass('snapjs-left')) {
				snapper.close('left');
			} else {
				kitUtils.log('open left');
				snapper.open('left');
			}
		});

		snapper.on('close', function () {
			$('.searchfield-snap').blur();
			$('.snap-overlay').hide();
			$('#top-bar').show();
		});

		snapper.on('open', function () {
			$('#top-bar').hide();
			$('.snap-overlay').show();
			$('.snap-overlay').height($('.supercontainer').height());
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
	},

	setBreakpoint: function (value) {
		var reg = new RegExp('[0-9]');
		if (value.toString().length <= 4 && reg.test(value)) {
			kitUtils.log('value is ok');
			snapNavigation.breakpoint = value;
		}
	}
};
