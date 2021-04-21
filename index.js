const path = require('path');
const fs = require('fs')

const PORT = process.env.PORT || 5000

// Initialise express
const express = require('express');
const app = express()

// Use body-parser to enable requests to come in the body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const filePath = path.join(__dirname, './data.json'); 

app.get('/search', (req, res) => {
    let keyword = req.query.query.toLowerCase();
    keyword = keyword.replace(/"/g, '') //we have to remove the double quotes as node.js identifies "wall" and wall differently 

    let searchResult = []
    let count = 0

    let searchData = JSON.parse(fs.readFileSync(filePath)); 

    for(let i = 0; i<searchData.length ; i=i+1) {
        
        let check = []
        check = searchData[i].text.toLowerCase()
        check = check.split(' ');
        
        if(check.includes(keyword)) {

            count = count + 1
            searchResult.push({
                id: searchData[i].id,
                text: searchData[i].text
            })
        }
    }

    res.json({
        count: count,
        documents: searchResult
    })

})

app.post('/document', (req, res) => {
    const id = req.body.id
    const text = req.body.text

    let rawdata = fs.readFileSync(filePath);
    let dataToSave = JSON.parse(rawdata);

    dataToSave.push({
        id: id,
        text: text
    })

    fs.writeFile(filePath, JSON.stringify(dataToSave), (err) => {
        if (err) throw err;
        res.status(200).send("Data Saved!")
    })

    
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
