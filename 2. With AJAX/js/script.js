/*
jQuery(document).ready(function($)
{
	// Set the Options for "Bloodhound" suggestion engine
	var engine = new Bloodhound({
			remote: {
					url: '/find?search_param=%QUERY%',
					wildcard: '%QUERY%'
			},
			datumTokenizer: Bloodhound.tokenizers.whitespace('search_param'),
			queryTokenizer: Bloodhound.tokenizers.whitespace
	});

	$('#typehead_example').typeahead({
				hint: true,
				highlight: true,
				minLength: 1
			},
	{
		source: engine.ttAdapter(),

		// This will be appended to "tt-dataset-" to form the class name of the suggestion menu.
		name: 'usersList',

		// the key from the array we want to display (name,id,email,etc...)
		templates: {
					empty: [
							'<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
						],
					header: [
							'<div class="list-group search-results-dropdown">'
						],
					suggestion: function (data)
						{
							return '<a href="' + data.profile.username + '" class="list-group-item">' + data.name + '- @' + data.profile.username + '</a>'
						}
				}
	})
	.on('typeahead:asyncrequest', function()
	{
		alert("AJAX Start");
	})
	.on('typeahead:asynccancel typeahead:asyncreceive', function()
	{
		alert("AJAX End");
	});
});
*/

$(document).ready(function()
{
	$.support.cors = true;

	var engine = new Bloodhound({
		identify:	function(o)
					{
						return o.id_str;
					},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'screen_name'),
		dupDetector:	function(a, b)
						{
							return a.id_str === b.id_str;
						},

		prefetch: 'https://typeahead-js-twitter-api-proxy.herokuapp.com' + '/demo/prefetch',

		remote: {
			url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com' + '/demo/search?q=%QUERY',
			wildcard: '%QUERY'
		}
	});

	// ensure default users are read on initialization
	//engine.get('1090217586', '58502284', '10273252', '24477185')

	function engineWithDefaults(query_string, sync, async)
	{
		if (query_string === '')
		{
			sync(engine.get('1090217586', '58502284', '10273252', '24477185'));
			async([]);
		}

		else
		{
			engine.search(query_string, sync, async);
		}
	}

	$('#typehead_example').typeahead({
				hint:		true,
				highlight:	true,
				minLength: 0
			},
			{
				source: engineWithDefaults,
				displayKey:	'screen_name',
				templates:	{
							empty: [
									'<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
								],
							header: [
									'<div class="list-group search-results-dropdown">'
								],
							suggestion: function (data)
								{
									return '<a href="' + data.created_at + '" class="list-group-item">' + data.name + '- @' + data.status.created_at + '</a>'
								}
						}
			})
			.on('typeahead:asyncrequest', function()
			{
				$('.typeahead-spinner').show();
			})
			.on('typeahead:asynccancel typeahead:asyncreceive', function()
			{
				$('.typeahead-spinner').hide();
			});
});