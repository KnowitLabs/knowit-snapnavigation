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
				directive = {
					"li": {
						"pageItems <- Items": {
							"a span": "pageItems.Header",
							"a@href": "pageItems.LinkUrl",
						}
					}
				};
				$('div#quicksearch-results-list').render(response, directive);
			} else {
				$html = '<div class="error">';
				$html += '<p>Inga träffar.</p>';
				$html += '</div>';
			}

			// Render html
			$('#quicksearch-results .search-number').html($foundResults);
			$('#quicksearch-results .search-term').html(query);
			$('.snap-drawer-right .loading').hide();
			$('#quicksearch-results').show();
		});

		// Ajax error
		$ajaxCall.fail(function () {

			// Render error message ***** Should we get the error message from response.error? *****
			// If so, include jqXHR and response in the fail function
			$html += '<div class="error">';
			$html += '<p>Something went wrong, please refresh the page and try again.</p>';
			$html += '</div>';

			// Render html
			$('#quicksearch-results').html($html);
		});
	}
};
