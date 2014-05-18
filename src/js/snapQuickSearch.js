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