const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middle-ware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/v1/posts');

app.use('/api/v1/posts', posts);

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));