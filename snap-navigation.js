var	snapNavigation = {
		init : function() {

		// SnapJS
		var snapper = new Snap({
			element: document.getElementById('main-content'),
			maxPosition: 265,
			minPosition: -265,
			tapToClose: true,
			touchToDrag: false
		});

		$(window).bind( 'orientationchange', function(e){
			snapper.close();
			$('html,body').animate({scrollTop:0},0);
		});

		// Toggle Sidebar
		$('#toggle-sidebar').on('click', function(e) {
			e.preventDefault();

			if($('body').hasClass('snapjs-left')) {
				snapper.close('left');
			} else {
				snapper.open('left');
			}
		});

		snapper.on('close', function(){
			$('.searchfield-snap').blur();
			$('#top-bar').show();
		});

		snapper.on('open', function(){
			$('#top-bar').hide();
		});

		// Toggles the plus/minus icons when opening and closing ul/li in the menu
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
			} else {
				$(e.target).addClass('focus');
			}
		});

		$('.mobile-navigation-list li.haschildren a').on('touchmove',function(e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.mobile-navigation-list li.haschildren a').on('touchend',function(e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.mobile-navigation-list li.haschildren a').on('touchleave',function(e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.mobile-navigation-list li.haschildren a').on('touchcancel',function(e) {
			$('.mobile-navigation-list a').removeClass('focus');
			$('.mobile-navigation-list i').removeClass('focus');
		});

		$('.snap-overlay').on('touchmove', function(e) {
			snapper.close();
			e.preventDefault();
		});

		$('.snap-overlay').on('touchend', function(e) {
			snapper.close();
			e.preventDefault();
		});

		$('.snap-overlay').on('touchleave', function(e) {
			snapper.close();
			e.preventDefault();
		});

		$('.snap-overlay').on('touchcancel', function(e) {
			snapper.close();
			e.preventDefault();
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
				$('html,body').animate({scrollTop:0},0);
			}
		});

		// Close Link
		$('.snap-drawer .close-menu').on('click', function(e) {
			e.preventDefault();
			snapper.close();
		});
}};
