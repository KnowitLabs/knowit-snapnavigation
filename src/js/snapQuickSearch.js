var snapQuicksearch = {
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

	},

	doQuickSearch: function (query) {
		kitUtils.log('doQuickSearch');
		$('div.errormsg p.error').hide();
		$('div.errormsg').hide();

		$jsonurl = $('.quicksearchbar').data('searchurl');
		$ajaxCall = $.ajax({
			url: $jsonurl + '&q=' + query,
			dataType: 'json'
		});

		// Ajax success
		$ajaxCall.done(function (response) {
			var output = '';
			$foundResults = response.Items.length;

			// Check if any products found
			if ($foundResults > 0) {
				// Set search query session cookie
				$.cookie('searchQuery', query, {path: '/'});

				// Build result output
				output += '<ul>';
				for (var i in response.Items) {
					if (response.Items[i].Type === 'Page') {
						output += '<li><a class="icon angle-right" href="' + response.Items[i].LinkUrl + '"><span>' + response.Items[i].Header + '</span></a></li>';
					} else {
						output += '<li><a class="icon file" href="' + response.Items[i].LinkUrl + '"><span>' + response.Items[i].Header + '</span></a></li>';
					}
				}
				output += '</ul>';
			} else {
				$.removeCookie('searchQuery');
				$('div.errormsg p span').html(query);
				$('div.errormsg').show();
			}

			// Render html
			$('.searchhits span.search-number').html($foundResults);
			$('.searchhits span.search-term').html(query);
			$('#quicksearch-results-list').html(output);
			$('.snap-drawer-right .loading').hide();
			$('#quicksearch-results').show();
		});

		// Ajax error
		$ajaxCall.fail(function () {
			// Render error message ***** Should we get the error message from response.error? *****
			// If so, include jqXHR and response in the fail function
			$('div.errormsg p.error').show();
			$('div.errormsg').show();
		});
	}
};
