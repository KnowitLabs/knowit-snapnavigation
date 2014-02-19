var	snapNavigation = {
		init : function() {

		// SnapJS
		var snapper = new Snap({
			element: document.getElementById('main-content'),
			maxPosition: 265,
			minPosition: -265,
			touchToDrag: false
		});

		// Toggle Sidebar
		$('#toggle-sidebar').on('click', function(e) {

			// Prevent default
			e.preventDefault();

			if($('body').hasClass('snapjs-left')) {

				// Close sidebar
				snapper.close('left');
			} else {

				// Open sidebar
				snapper.open('left');
			}
		});

		$('.mobile-navigation-list li.haschildren a').click(function(e) {
			kriminalvarden.helpers.log(e.target);
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

		$('.mobile-navigation-list li.haschildren a').on('touchstart',function(e) {
			if (!$(e.target).is('i')) {
				$(this).addClass('focus');
			}
		});

		$('.mobile-navigation-list li.haschildren a').on('touchend',function(e) {
			if (!$(e.target).is('i')) {
				$(this).removeClass('focus');
			}
		});

		// Toggle Sidebar
		$('#toggle-searchbar').on('click', function(e) {

			// Prevent default
			e.preventDefault();

			if($('body').hasClass('snapjs-right')) {

				// Close sidebar
				snapper.close('right');
			} else {

				// Open sidebar
				snapper.open('right');
				$('.searchfield-snap').focus();
			}
		});

		// Close Link
		$('.snap-drawer .close-menu').on('click', function(e) {
			e.preventDefault();
			snapper.close();
		});
}};
