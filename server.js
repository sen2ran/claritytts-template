const express = require('express');
const axios = require('axios')
const path = require('path');
const fs = require('fs')
const port = process.env.PORT || 8080;
const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', async function (req, response) {
    const lang = req.path.split("/")[1]
    const res = await axios.get(`https://m-city-7c464.firebaseio.com/metatest/${req.path.split("/")[2]}.json`)
    const filePath = path.resolve(__dirname, 'build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_NAME/g, res.data.name);
        data = data.replace(/\$OG_TITLE/g, res.data.metaTag.image);
        data = data.replace(/\$OG_DESCRIPTION/g, lang === 'en' ? res.data.metaTag.shortDescription : res.data.metaTag.shortDescriptionRu);

        result = data.replace(/\$OG_IMAGE/g, res.data.metaTag.image);
        response.send(result);
    });
});
app.listen(port);