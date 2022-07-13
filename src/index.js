console.log("[Iniciando api rest para rimac]");

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


var enviromentJson={
  DEV:{
    ENVIROMENT:"DEV",
    APIURL:"http://devxxxxxxxnext-dev-rimac.s3-website-us-east-1.amazonaws.com/",
  },
  QA:{
    ENVIROMENT:"QA",
    APIURL:"http://qaxxxxxxxnext-qa-rimac.s3-website-us-east-1.amazonaws.com/",
  },
  PROD:{
    ENVIROMENT:"PROD",
    APIURL:"prodxxxxxxxxxxxxhttp://next-prod-rimac.s3-website-us-east-1.amazonaws.com/"
  },
};

 


// defining an endpoint to return all ads
app.get('/', (req, res) => {
  console.log("---------------------------");


  try {
    var enviromentReq={
      "next-dev-rimac.s3-website-us-east-1.amazonaws.com":"DEV",
      "next-qa-rimac.s3-website-us-east-1.amazonaws.com":"QA",      
      "next-prod-rimac.s3-website-us-east-1.amazonaws.com":"PROD",

      "localhost":"DEV",

    };
    console.log("req:",req.headers);
    console.log("req:",req.headers.enviroment);
    console.log("req:",enviromentJson[enviromentReq[req.headers.enviroment]]);

    if (enviromentJson[enviromentReq[req.headers.enviroment]] !==undefined){
      res.send(enviromentJson[enviromentReq[req.headers.enviroment]] );
    }else{
      res.send({message:"Don't returned value of enviroment!"});

    }
  } catch (error) {
    console.log('Catch error Get enviroment');
  }

});

// starting the server
app.listen(3001, () => {
  console.log('Escuchando en puerto 3001');
});
