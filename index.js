const express = require("express");
const bodyParser = require('body-parser');
xmlparser = require('express-xml-bodyparser');

var xmldoc = require('xmldoc');





const xml2js = require('xml2js');
var parser       = new xml2js.Parser();


const app = express();



app.use(xmlparser());



app.get('/', function (req, res) {
    res.send('Saludos desde express');
  });

 /*  app.post('/success', customParser, function(req, res){
    console.log(JSON.stringify(req.body));
    res.send(req.body);
}); */

app.post('/X',function(req, res){
     res.contentType('application/xml'); 
     req.setEncoding('utf8');
    var obj = req.body;
    
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    var document = new xmldoc.XmlDocument(xml);

 console.log(document.childNamed('album').attr);

 
    var album="";
    parser.parseString(xml, function (err, result) {
         album = result['albums']['album'];
       console.log( album);
    });
    

    

  res.send(album);

});


app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto http://localhost:3000/");
});