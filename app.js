var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');

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

app.use(function(req,res,next){
	res.locals.errors = null
	next();



});


app.get('/',function(req,res){
	 

	res.render('index', {
		//passing variables into the index.ejs file
		title :'customers',
		//when using uses you will have to un comment the array above for users
		//users: users
	});
});

const { check } = require('express-validator/check');
app.post('/users/add',function(req,res){
	
 	//req.checkBody('movie','Required').exists
	
	var errors = check('myMovie','required').isEmpty()
	//console.log(errors.exists)
	if (errors.exists >-1) {
		res.render('index', {
			title: 'Movies',
			myMovie : myMovie,
			



		})



		console.log('Failed less than 1 charecter')



	}else {

	var newUser = {
		myMovie: req.body.myMovie,
		zipCode: req.body.zipCode,
		email: req.body.email


	}
	console.log('success')

	}



	

	console.log(newUser)
})
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