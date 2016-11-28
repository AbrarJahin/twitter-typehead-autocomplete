$(document).ready(function()
{
	var engine = new Bloodhound({
		identify	:	function(options)
						{
							return options.id_str;
						},
		queryTokenizer	:	Bloodhound.tokenizers.whitespace,
		datumTokenizer	:	Bloodhound.tokenizers.obj.whitespace('name', 'screen_name'),
		dupDetector		:	function(a, b)
							{
								return a.id_str === b.id_str;
							},

		//prefetch		:	'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/prefetch',

		remote: {
			/*
			url			:	'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=%QUERY',
			wildcard	:	'%QUERY'
			*/
			url			:	'data.php'+'#%QUERY',
			wildcard	:	'%QUERY',
			transport: function (opts, onSuccess, onError)
			{
				$.ajax({
					url: opts.url.split("#")[0],
					data:
						{
							search_string	:	opts.url.split("#")[1],
							other_data		:	"demo data"
						},
					type: "POST",
					dataType: "json",
					success: onSuccess,
					error: onError
				})
			}
		}
	});

	// ensure default users are read on initialization
	//engine.get('1090217586', '58502284', '10273252', '24477185')

	function engineWithDefaults(query_string, sync, async)
	{
		if (query_string === '')
		{
			//sync(engine.get('1090217586', '58502284', '10273252', '24477185'));
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
				displayKey:	'name',
				templates:	{
								empty: [
										'<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
									],
								header: [
										'<div class="list-group search-results-dropdown">'
									]/*,
								suggestion: function (data)
									{
										return '<a href="#" class="list-group-item">' + data.name + '- @' + data.price + '</a>';
									}*/
							}
			})
			.on('typeahead:asyncrequest', function()
			{
				//$('#typehead_example').addClass('typeahead-spinner');
				$(this).addClass('typeahead-spinner');
			})
			.on('typeahead:asynccancel typeahead:asyncreceive', function()
			{
				//$('#typehead_example').removeClass('typeahead-spinner');
				$(this).removeClass('typeahead-spinner');
			})
			.bind('typeahead:select', function (event, suggestion)
			{
				console.log(suggestion);
			});
});
