var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dpSchema = new Schema({
    userId           : Schema.Types.ObjectId,
    category         : String,
    date             : Date,
    cfp              : Number
});

module.exports = mongoose.model('DP', dpSchema);
