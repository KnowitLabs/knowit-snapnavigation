var	snapQuicksearch = {
		init : function() {
			$('.quicksearch-button').on('click', function(event) {
				event.preventDefault();
				$('.snap-drawer-right .loading').show();
				kriminalvarden.helpers.log('Click quicksearch button');
				kriminalvarden.quicksearch.doQuickSearch($('.snap-drawer-right .searchfield-snap').val());
			});
			$('.snap-drawer-right .searchfield-snap').keydown(function( event ) {
				if (event.which === 13) {
					$('.snap-drawer-right .loading').show();
					kriminalvarden.quicksearch.doQuickSearch($(this).val());
					$(this).blur();
				}
			});
		},
		doQuickSearch: function(query) {
			$href = $('.quicksearchbar').data('searchurl') + '&q='+query;
			kriminalvarden.helpers.log($href);

			$('#quicksearch-button').attr('href', $href);

			kriminalvarden.helpers.log('start quicksearch');
			$jsonurl = $('.quicksearchbar').data('json');
			$ajaxCall = $.ajax({
				url : $jsonurl + '&query='+query,
				dataType : 'json'
			});

			// Ajax success
			$ajaxCall.done(function(response) {
				kriminalvarden.helpers.log('quicksearch response');
				// Found products
				kriminalvarden.helpers.log(response.Pages);

				$foundResults = response.Pages[0].Items.length;

				// Check if any products found
				if($foundResults > 0) {
					kriminalvarden.helpers.log('quicksearch results > 0');
					$html = '<ul>';
					// Loop
					$.each(response.Pages[0].Items, function(i, d) {
						kriminalvarden.helpers.log(d);
						$html += '<li>';
						$html += '<a href="' + d.FriendlyUrl + '">' + d.Header + '<i class="fa fa-angle-right"></i>';
						if (d.Type === 'Document') {
							$html += '<i class="sprite external-document"></i>';
						}
						$html += '</a>';
						$html += '</li>';
					});
					$html += '</ul>';
				} else {
					$html = '<div class="error">';
					$html += '<p>Inga träffar.</p>';
					$html += '</div>';
				}

				// Render html
				$('#quicksearch-results .search-number').html($foundResults);
				$('#quicksearch-results .search-term').html(query);
				$('#quicksearch-results-list').html($html);
				$('.snap-drawer-right .loading').hide();
				$('#quicksearch-results').show();
			});

			// Ajax error
			$ajaxCall.fail(function() {

				// Render error message ***** Should we get the error message from response.error? *****
				// If so, include jqXHR and response in the fail function
				$html += '<div class="error">';
				$html += '<p>Something went wrong, please refresh the page and try again.</p>';
				$html += '</div>';

				// Render html
				$('#quicksearch-results').html($html);
			});
		}};
