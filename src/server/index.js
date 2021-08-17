
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require ('cors')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require("node-fetch");

const dotenv = require('dotenv');
dotenv.config();

//https://api.meaningcloud.com/sentiment-2.1?key=YOUR_KEY&url=https://css-tricks.com/css-logical-properties-and-values/&lang=auto
const APIURL = 'https://api.meaningcloud.com/sentiment-2.1?'

const APIKey= `key=${process.env.application_key}&url=`
const APILang = '&lang=auto'

const PORT = 8081

const app = express()
app.use(cors())


app.use(bodyParser.urlencoded( {extended:false}));
app.use(bodyParser.json())

app.use(express.static('dist'))
app.get('/', function (req, res) {    
    res.sendFile(path.resolve('index.html'))
})
app.post('/addurl',parseArticle)

async function parseArticle(req,res){
    console.log('parse article : ',req.body.url);

    const url = req.body.url
    const APIPath = APIURL +APIKey+ url +APILang
    //console.log(`APIPath`, APIPath)

    const response = await fetch (APIPath)
    const rslt = await response.json()
    const data= {        
       agreement :  rslt.agreement,
       subjectivity :  rslt.subjectivity,
       confidence :  rslt.confidence,
       irony :  rslt.irony,
       score_tag  : rslt.score_tag,
       status : rslt.status,
    }
    //console.log(`response`, data)
    res.send(data)
}



app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('*', function (req, res) {
    res.sendFile(path.resolve('dist/error.html'));
})

app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

