function search(search_term) {

	let start_link = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
	let end_link = "&utf8=&format=json"
	let link = start_link + search_term + end_link;

	// Get value
	$.ajax({
		url: link,
		async: false,
		dataType: 'jsonp',
		success: function(data) {
			// console.log(data.query.search[0]);
			// Set Value
			for (let i = 0; i < 10; i++) {
				let container = $('<div></div>');
				let title = $('<p>' + data.query.search[i].title + '</p>');
				let content = $('<p>' + data.query.search[i].snippet + '</p>');
				$(container).append(title);
				$(container).on('click', function() {
					let tempLink = "https://en.wikipedia.org/?curid=" + data.query.search[i].pageid;
					window.open(tempLink, "_blank");
				})
				$(container).append(content);
				$('.generated').append(container);
			}
		},
	});
}

// Print the value of search to the console.
$('#search_icon').on('click', function() {
	search($('#search_text').val());
});

// Check if enter key is pressed. 
$('#search_text').on('keypress keydown', function(e) {
	if (e.which === 13) {
		search($('#search_text').val());
	}
	// if ($('#search_text').length) {
	// 	$('.generated > div').fadeOut();
	// 	let length = $('#search_text').val();
	// 	if (length > 2) {
	// 		console.log('hello');
	// 	}
	// }
	let length = $('#search_text').val();
	if (length.length <= 2) {
		$('.generated > div').fadeOut();
	}
})
	