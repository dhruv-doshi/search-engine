const path = require('path');
const fs = require('fs')

const PORT = process.env.PORT || 5000

// Initialise express
const express = require('express');
const app = express()

app.get('/search', (req, res) => {
    let keyword =  req.query.query;

    let searchResult = []
    let count = 0

    const filePath = path.join(__dirname, './data.json');

    let rawdata = fs.readFileSync(filePath);
    let searchData = JSON.parse(rawdata);

    for(let i =0; i<searchData.length ; i=i+1) {
        let check = searchData[i].text.toLowerCase();
        console.log(check)
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
        searchResult: searchResult
    })

})

app.post('/document', (req, res) => {
    const id = req.body.id
    const text = req.body.text

    // fs.writeFileSync('./data.json', jsonObj, function (err) {
    //     if (err) throw err;
    //     else console.log('Saved json!');
    //   });

    res.send({
        id: id,
        text: text
    })
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
