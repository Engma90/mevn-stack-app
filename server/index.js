const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middle-ware
app.use(bodyParser.json());
app.use(cors());

//Handle production
if (process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname, '/public'));

    //Handle SPA
    app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
    //app.all()
}

const posts = require('./routes/api/v1/posts');

app.use('/api/v1/posts', posts);

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));