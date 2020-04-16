const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

//Middle-ware
app.use(bodyParser.json());
app.use(cors());



const posts = require('./routes/api/v1/posts');

app.use('/api/v1/posts', posts);


//Handle production
if (process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(path.join(__dirname, 'public')));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
    //app.all()
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));