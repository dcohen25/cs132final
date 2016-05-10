var mongoose = require('mongoose');
var configDB = require('../../config/database.js');
// connect to database
mongoose.connect(configDB.url);
var User = require('./user');
var DP = require('./dp');
// create question schemas
var Schema = mongoose.Schema;
// slider question
var sliderQuestionSchema = new Schema({
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
// input question
var inputQuestionSchema = new Schema({
    title	     : String,
    type             : String,
    category         : String,
    suggestion       : String,
    answer	     : Number,
    cfpImpact        : Number,
    unit	     : String,
    cfpFactor        : Number
});
// radio question
var radioQuestionSchema = new Schema({
    title	     : String,
    type             : String,
    category         : String,
    radioData          : [{
	    			name: String,
				cfpVal: Number
    			}],
    suggestion       : String,
    answer	     : Number,
    cfpImpact        : Number
});
// create models
SliderQuestion = mongoose.model('SliderQuestion', sliderQuestionSchema, 'questions');
InputQuestion = mongoose.model('InputQuestion', inputQuestionSchema, 'questions');
RadioQuestion = mongoose.model('RadioQuestion', radioQuestionSchema, 'questions');
// reset database
SliderQuestion.remove({}, function(err){});
InputQuestion.remove({}, function(err){});
RadioQuestion.remove({}, function(err){});
User.remove({}, function(err){});
DP.remove({}, function(err){});
// create questions
SliderQuestion.create({
	title : "How frequently do you consume pork?",
	type : "slider",
	category : "food",
	sliderData : [{
		name : "Never",
		cfpVal : 1.5
	},
	{
		name : "Infrequently (once every few weeks)",
		cfpVal : 1.7
	},
	{
		name : "Occasionally (once or twice a week)",
		cfpVal : 1.9
	},
	{
		name : "Often (nearly every day)",
		cfpVal : 2.5
	},
	{
		name : "Very often (nearly every meal)",
		cfpVal : 3.3
	}],
	suggestion: "Reduce the amount of pork you consume",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How frequently do you consume Beef/Lamb?",
	type : "slider",
	category : "food",
	sliderData : [{
		name : "Never",
		cfpVal : 1.5
	},
	{
		name : "Infrequently (once every few weeks)",
		cfpVal : 1.7
	},
	{
		name : "Occasionally (once or twice a week)",
		cfpVal : 1.9
	},
	{
		name : "Often (nearly every day)",
		cfpVal : 2.5
	},
	{
		name : "Very often (nearly every meal)",
		cfpVal : 3.3
	}],
	suggestion: "Reduce the amount of beef/lamb you consume",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How frequently do you consume fish?",
	type : "slider",
	category : "food",
	sliderData : [{
		name : "Never",
		cfpVal : 1.5
	},
	{
		name : "Infrequently (once every few weeks)",
		cfpVal : 1.7
	},
	{
		name : "Occasionally (once or twice a week)",
		cfpVal : 1.9
	},
	{
		name : "Often (nearly every day)",
		cfpVal : 2.5
	},
	{
		name : "Very often (nearly every meal)",
		cfpVal : 3.3
	}],
	suggestion: "Reduce the amount of fish you consume",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How frequently do you consume poultry?",
	type : "slider",
	category : "food",
	sliderData : [{
		name : "Never",
		cfpVal : 1.5
	},
	{
		name : "Infrequently (once every few weeks)",
		cfpVal : 1.7
	},
	{
		name : "Occasionally (once or twice a week)",
		cfpVal : 1.9
	},
	{
		name : "Often (nearly every day)",
		cfpVal : 2.5
	},
	{
		name : "Very often (nearly every meal)",
		cfpVal : 3.3
	}],
	suggestion: "Reduce the amount of poultry you consume",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How frequently do you consume Eggs/Milk/Dairy?",
	type : "slider",
	category : "food",
	sliderData : [{
		name : "Never",
		cfpVal : 1.5
	},
	{
		name : "Infrequently (once every few weeks)",
		cfpVal : 1.7
	},
	{
		name : "Occasionally (once or twice a week)",
		cfpVal : 1.9
	},
	{
		name : "Often (nearly every day)",
		cfpVal : 2.5
	},
	{
		name : "Very often (nearly every meal)",
		cfpVal : 3.3
	}],
	suggestion: "Reduce the amount of eggs/milk/dairy you consume",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How much of the food that you eat is processed, packaged, and not locally grown?",
	type : "slider",
	category : "food",
	sliderData : [{
		name : "About one quarter",
		cfpVal : 1.5
	},
	{
		name : "About one half",
		cfpVal : 1.7
	},
	{
		name : "About three quarters",
		cfpVal : 1.9
	},
	{
		name : "Most of it",
		cfpVal : 2.5
	}],
	suggestion: "Reduce the amount of processed food that you eat.  Eat more organic, locally grown foods.",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "Compared to the typical American, how much trash do you think you generate?",	
	type : "slider",
	category : "home",
	sliderData : [{
		name : "Much less",
		cfpVal : 1.5
	},
	{
		name : "Somewhat less",
		cfpVal : 1.7
	},
	{
		name : "About the same",
		cfpVal : 1.9
	},
	{
		name : "Much more",
		cfpVal : 2.5
	}],
	suggestion: "Reduce the amount of trash that you generate.  Recycle your trash if possible.",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "Which housing style best describes your home?",	
	type : "slider",
	category : "home",
	sliderData : [{
		name : "Free-standing house without running water",
		cfpVal : 1.0
	},
	{
		name : "Free-standing house with running water",
		cfpVal : 1.5
	},
	{
		name : "Multi-story apartment building",
		cfpVal : 1.7
	},
	{
		name : "Duplex or building with 2-4 housing units",
		cfpVal : 1.9
	},
	{
		name : "Luxury condominium",
		cfpVal : 2.3
	},
	{
		name : "Green-design residence",
		cfpVal : 1.2
	}],
	suggestion: "Try to reduce the use of utilities such as water, electricity and gas.",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
RadioQuestion.create({
	title : "Do you have electricity in your home?",	
	type : "radio",
	category : "home",
	radioData : [{
		name : "Yes",
		cfpVal : 1.5
	},
	{
		name : "No",
		cfpVal : .5
	}],
	suggestion: "Try to reduce the use of utilities such as water, electricity and gas.",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
InputQuestion.create({
	title : "How many people live in your household?",	
	type : "input",
	category : "home",
	unit     : "people",
	suggestion: "Living with many people can increase your carbon footprint.  Try to share resources to reduce your carbon footprint.",
	cfpFactor : 1.5,
	answer: null,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "What is the size of your home?",	
	type : "slider",
	category : "home",
	sliderData : [{
		name : "550 sq feet or smaller",
		cfpVal : 1.0
	},
	{
		name : "550 - 1050 sq ft",
		cfpVal : 1.5
	},
	{
		name : "1050 - 1600 sq ft",
		cfpVal : 1.7
	},
	{
		name : "1600 - 2200 sq ft",
		cfpVal : 1.9
	},
	{
		name : "2200 - 2700 sq ft",
		cfpVal : 2.3
	},
	{
		name : "2700 sq ft or larger",
		cfpVal : 2.8
	}],
	suggestion: "The larger your house is, the greater the impact on your carbon footprint.",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How far do you travel by car each week (as a driver or passenger)?",	
	type : "slider",
	category : "transportation",
	sliderData : [{
		name : "0 miles or I never ride in a car",
		cfpVal : 1.0
	},
	{
		name : "1 - 50 miles",
		cfpVal : 1.5
	},
	{
		name : "50 - 150 miles",
		cfpVal : 1.7
	},
	{
		name : "150 - 200 miles",
		cfpVal : 1.9
	},
	{
		name : "200 - 300 miles",
		cfpVal : 2.3
	},
	{
		name : "300+ miles",
		cfpVal : 2.8
	}],
	suggestion: "Reduce the amount of miles you travel by car each week",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How far do you travel by motorbike each week (as a driver or passenger)?",	
	type : "slider",
	category : "transportation",
	sliderData : [{
		name : "0 miles or I never ride on a motorbike",
		cfpVal : 1.0
	},
	{
		name : "1 - 2 miles",
		cfpVal : 1.5
	},
	{
		name : "2 - 10 miles",
		cfpVal : 1.7
	},
	{
		name : "10 - 30 miles",
		cfpVal : 1.9
	},
	{
		name : "30 - 70 miles",
		cfpVal : 2.3
	},
	{
		name : "70+ miles",
		cfpVal : 2.8
	}],
	suggestion: "Reduce the amount of miles you travel by motorbike each week",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "What is the gas mileage of the car you travel in most often?",	
	type : "slider",
	category : "transportation",
	sliderData : [{
		name : "Fewer than 5 miles per gallon",
		cfpVal : 2.3
	},
	{
		name : "5 - 15 miles per gallon",
		cfpVal : 1.9
	},
	{
		name : "15 - 30 miles per gallon",
		cfpVal : 1.7
	},
	{
		name : "30 - 40 miles per gallon",
		cfpVal : 1.5
	},
	{
		name : "More than 40 miles per gallon",
		cfpVal : 1.3
	},
	{
		name : "I don't know",
		cfpVal : 0
	}],
	suggestion: "Use a car that consumes less gas per gallon",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "What is the gas mileage of your motorbike?",	
	type : "slider",
	category : "transportation",
	sliderData : [{
		name : "15 - 30 miles per gallon",
		cfpVal : 2.3
	},
	{
		name : "30 - 40 miles per gallon",
		cfpVal : 1.9
	},
	{
		name : "40 - 50 miles per gallon",
		cfpVal : 1.7
	},
	{
		name : "50 - 60 miles per gallon",
		cfpVal : 1.5
	},
	{
		name : "More than 60 miles per gallon",
		cfpVal : 1.3
	},
	{
		name : "I don't know",
		cfpVal : 0
	}],
	suggestion: "Use a motorbike that consumes less gas per gallon",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How often do you drive in a car with someone else?",	
	type : "slider",
	category : "transportation",
	sliderData : [{
		name : "Almost never",
		cfpVal : 1.3
	},
	{
		name : "Occasionally",
		cfpVal : 1.5
	},
	{
		name : "Often",
		cfpVal : 1.7
	},
	{
		name : "Very often",
		cfpVal : 1.9
	},
	{
		name : "Almost always",
		cfpVal : 2.3
	}],
	suggestion: "Reduce the amount of driving you do with other people",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How far do you travel on public transportation each week (bus, train, etc.)?",
	type : "slider",
	category : "transportation",
	sliderData : [{
		name : "0 miles",
		cfpVal : 1.3
	},
	{
		name : "1 - 5 miles",
		cfpVal : 1.5
	},
	{
		name : "5 - 25 miles",
		cfpVal : 1.7
	},
	{
		name : "25 - 50 miles",
		cfpVal : 1.9
	},
	{
		name : "50+ miles",
		cfpVal : 2.3
	}],
	suggestion: "Reduce the amount of travel on public transportation each week",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
SliderQuestion.create({
	title : "How many hours do you fly each year?",
	type : "slider",
	category : "transportation",
	sliderData : [{
		name : "I never fly",
		cfpVal : 0
	},
	{
		name : "0 - 4 hours",
		cfpVal : 1.0
	},
	{
		name : "4 - 10 hours",
		cfpVal : 1.3
	},
	{
		name : "10 - 25 hours",
		cfpVal : 1.5
	},
	{
		name : "25 - 100 hours",
		cfpVal : 1.8
	},
	{
		name : "100+ hours",
		cfpVal : 2.3
	}],
	suggestion: "Reduce the amount of time you spend flying each year",
	answer: 0,
	cfpImpact: 0
},
	function(err, question){
		// if an error occured
		if (err){
			console.log(err);
		}
		console.log("added question");
	}
);
