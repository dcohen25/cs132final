function formatString(str) {
	return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} 

$(window).load(function() {

	function fixHeights() {
		$('.benefit').css('height', 'auto');

		var maxHeight = Math.max.apply(null, $(".benefit").map(function() {
			return $(this).height();
		}).get());

		$('.benefit').height(maxHeight);
	}

	$('#wasteForm').submit(function(e) {
		e.preventDefault();
		var trash = $('#trash').val().split(',').join('');

		if ($.isNumeric(trash) && trash > 0 && trash <= 1000000000) {
			$('#powerResult').show();
			$('#powerError').hide();
			$('#converter').css('background-position', '0 -312px');
		
			$('#tons').html(formatString(trash));
			$('#kwh').html(formatString(trash * 350));	
		} else {
			$('#powerResult').hide();
			$('#powerError').show();
			$('#converter').css('background-position', '0 -624px');
		}
		
	});

	fixHeights();
	$(window).resize(fixHeights);

});
