var express = require('express')
var app = express()
const URL= require('./urlshortner');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var makeid = require('./helper')
var cors = require('cors')
var path = require('path')

const port= 3000;
require('dotenv').config()

mongoose
 .connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then((db) => console.log("db is connected"))
 .catch((err) => console.log(err));

 app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())



app.get('/api/url/:url', function(req, res) {
    try{
        const {url} = req.params;
        
        URL.findOne({slug:url}).then(function(data){
            res.status(200).json({data});
        })
    }catch(error){
        res.status(500).json({error})
    }
    
})
app.post('/api/createURL', function(req, res) {
    try{
        const {url} = req.body;
        const slug = makeid(5);
        const urlObj = new URL({url,slug})
        urlObj.save().then(function(data){
            res.status(200).json({data});
        })
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }
    
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})