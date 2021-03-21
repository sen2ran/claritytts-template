const express = require('express');
const axios = require('axios')
const path = require('path');
const fs = require('fs')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', async function (req, response) {
    const lang = req.path.split("/")[1]
    const res = await axios.get(`https://m-city-7c464.firebaseio.com/metatest/${req.path.split("/")[2]}.json`)
    const filePath = path.resolve(__dirname, 'build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return 
        }
        // data = data.replace(/\$OG_NAME/g, res.data.name);
        // data = data.replace(/\$OG_TITLE/g, res.data.metaTag.image);
        // data = data.replace(/\$OG_DESCRIPTION/g, lang === 'en' ? res.data.metaTag.shortDescription : res.data.metaTag.shortDescriptionRu);
        // result = data.replace(/\$OG_IMAGE/g, res.data.metaTag.image);

        data = data.replace(/\$OG_NAME/g, 'OTP-React-Frontend');
        data = data.replace(/\$OG_TITLE/g, 'OTP-React-Frontend');
        data = data.replace(/\$OG_DESCRIPTION/g, 'OTP-React-Frontend');
        result = data.replace(/\$OG_IMAGE/g, 'OTP-React-Frontend');

        response.send(result);
    });
});
app.listen(port);