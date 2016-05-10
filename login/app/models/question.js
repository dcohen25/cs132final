var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title	     : String,
    type             : String,
    category         : String,
    sliderData          : [{
	    			name: String,
				cfpVal: Number
    			}],
    suggestion       : String,
    answer	     : Number,
    cfpImpact        : Number
});

module.exports = mongoose.model('Question', questionSchema);
