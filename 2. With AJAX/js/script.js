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
	}).on('typeahead:asyncrequest', function()
				{
					alert("AJAX Start");
				})
				.on('typeahead:asynccancel typeahead:asyncreceive', function()
				{
					alert("AJAX End");
				});
});