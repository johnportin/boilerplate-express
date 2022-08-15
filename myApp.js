let express = require('express');
let app = express();
const bodyParse = require('body-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const absolutePath = __dirname + "/views/index.html";

// app.use((req, res, next) => {
//     console.log(req.method + " " + req.path + " - " + req.ip)
//     next();
//     });

// app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
    // console.log("Hello World");
    res.sendFile(absolutePath);
});

app.get('/payment', (req, res) => {
    res.json({method: req.query.method});
})

app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word});
})

app.get('/name', (req, res) => {
    res.json({
        name: `${req.query.first} ${req.query.last}`
    });
});

app.get('/now', (req, res, next) => {
        req.time = new Date().toString();
        console.log(req.time);
        next();
    }, 
    (req, res) => {
        res.send({
            time: req.time
        });

    });

app.get('/json', (req, res) => {
    let payload = "Hello json";
    // if (process.env.MESSAGE_STYLE === "uppercase") {
    //     payload = payload.toUpperCase();
    // }
    res.json({ message: payload});
});

app.post('/name', (req, res) => {
    
    res.json({
        name: req.body.first + " " + req.body.last
    });
});

 module.exports = app;
