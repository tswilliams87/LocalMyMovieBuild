var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');
var mongojs = require('mongojs')
var db = mongojs('customerapp', ['users','movies1'])
var expressValidator = require('express-validator')
//Global vars 

const { body } = require('express-validator/check');
var app = express();

var logger = function(req, res, next){
	console.log('Logging...')
	next();



}


app.use(logger)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


//body parser middle ware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')))

//array to stuff people or movies into
/*
var people = [{


	name:'Wes', 
	age: 30
},
{

	name:'Todd',
	age: 31
}


]
*/

/*

could be later used to validate different users
var users = [
	{
		id: 1,
		first_name: 'Wes',
		last_name: 'Curtis',
		email: 'wcurt@things.com',

	},
	{
		id: 2,
		first_name: 'Todd',
		last_name: 'W',
		email: 'tswilliams87@gmail.com',

	}

]
*/
//global vars. need middleware
app.use(function(req,res,next){
	res.locals.errors = null
	res.locals.users = null
	next();



});


app.get('/',function(req,res){
	 
//reaching into database and rendering docs as well. 
//you can look up collections which have to be set up top in the variables.
//show collections in mongoDB shows you all the collections
	db.movies1.find(function(err, docs){
	 	//console.log(docs);
		res.render('index', {
		//passing variables into the index.ejs file
			title :'Movies Recently matched',
		//when using uses you will have to un comment the array above for users
			users : docs

	});
	 	// areays
	 });
});

const { check, validationResult } = require('express-validator/check');
app.post('/users/add',function(req,res){
	
 	//req.checkBody('movie','Required').exists
	console.log(check('email').isEmail())
	//check('myMovie').isLength({ min:1})


	//var errors = validationResult(req)
	//req.expressValidator.
	//console.log('errors: '+ errors)
	
	//NEEDS FURTHER WORK
	if (req.body.errors) {
		res.render('index', {
			title: 'Movies',
			myMovie : 'error',
			users: 'errors'
		})


		



		console.log('Failed less than 1 charecter')



	}else {
		// build the JSON object from the request form
		//will push to mongo
	var newUser = {
		myMovie: req.body.myMovie,
		zipCode: req.body.zipCode,
		email: req.body.email


	}
	// pushing data from request form into mongo, Defined objects above
	db.movies1.insert(newUser, function(err,res){
		if (err) {

			console.log(err + ' Database error ')
		} 
		
	});
	//res.redirect did not work inside the database object.  moved it out one layer 

	res.redirect('/');
	
	console.log('success database written')

	}



	

	console.log(newUser)
});
// set stiatci path



app.listen(3000 , function(){
	console.log('Server started on 3000....')
});

/*


First build.  keeping original
const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000

fs.readFile('index.html', (err, html) => {

	if(err){

		throw err;

	}
	const server = http.createServer((req, res) =>{
		res.statusCode = 200
		res.setHeader('Content-type' , 'text/html');
		res.write(html)
		res.end()

});

server.listen(port, hostname, () => {
	console.log('Server Started on port: ' + port)



});


});


*/
