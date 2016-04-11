// Function to access room name
function meta(name) {
    var tag = document.querySelector('meta[name=' + name + ']');
    if (tag != null) {
        return tag.content;
    }
    return '';
}

$(window).load(function() {
	
	
});
