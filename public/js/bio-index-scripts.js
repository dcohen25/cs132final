$(window).load(function() {
	
	// Function to access meta tag
	function meta(name) {	
	    var tag = document.querySelector('meta[name=' + name + ']');
	    if (tag != null) {
	        return tag.content;
	    }
	    return '';
	}

	var error = meta('error');

	if (error == "true") {
		$('#error').show();
	} 
	if (error == "false") {
		$('#error').hide();
	}
	
});