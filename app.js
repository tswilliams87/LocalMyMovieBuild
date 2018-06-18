var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');
//var mongojs = require('mongojs')
//var databaseUrl = "MONGODB_USER:MONGODB_PASSWORD@MONGODB_URL/mongodb"
//var collections = ['users', 'movies1']
//var db = require("mongojs").connect(databaseUrl, collections);
//var db = mongojs('10.129.0.67', ['users','movies1'])
var expressValidator = require('express-validator')
//Global vars 

const { body } = require('express-validator/check');
var app = express();

var logger = function(req, res, next){
	console.log('Logging...')
	next();

//test2

}


app.use(logger)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


//body parser middle ware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')))

/*.0 start
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";
if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];
  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}
/*2.0 stop
/*NEW DB HEAD sdfmsdv
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";
if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];
  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}
var db = null,
    dbDetails = new Object();
var initDb = function(callback) {
  if (mongoURL == null) return;
  var mongodb = require('mongodb');
  if (mongodb == null) return;
  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }
    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';
    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};
app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      if (err) {
        console.log('Error running count. Message:\n'+err);
      }
      res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
    });
  } else {
    res.render('index.html', { pageCountMessage : null});
  }
});
app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});
// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});
initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
/*NEW DB FOOTER
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
	//NEEDS FURTHER WORK
	if (req.body.errors) {
		res.render('index', {
			title: 'Movies',
			myMovie : 'error'
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
