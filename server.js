var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 
var mongoose = require('mongoose'); 

var dataController = require('./controllers/data-controller');



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var config = require('./config/config.js');
config.setConfig(); 

mongoose.connect(process.env.MONGOOSE_CONNECT); 


var dummyData = [];

app.get('/api/get-data', dataController.getData); 

app.post('/api/post-data', dataController.postData);

app.post('/api/post-data/find', dataController.findData);

app.post('/api/post-data/delete', dataController.deleteData);






app.listen(process.env.PORT || 9000, function () {
	console.log('server is up');
})