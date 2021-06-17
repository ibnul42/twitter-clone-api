const express = require('express')
const app = express()
const port = 3000
const Twitter = require('./api/helpers/twitter');
const twitter = new Twitter();
require('dotenv').config()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });
    
app.get('/tweets', (req, res) => {
    const query = req.query.q;
    const count = req.query.count;
    const maxId = req.query.max_Id;
    twitter.get(query, count, maxId).then((response) => {
        res.status(200).send(response.data)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))