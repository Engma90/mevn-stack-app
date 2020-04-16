require('dotenv/config');
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


router.get('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.findOne({ _id: new mongodb.ObjectID(req.params.id) }));
});


// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});


async function loadPostsCollection() {
    console.log(`Connection: ${process.env.DB}`);
    const client = await mongodb.MongoClient.connect(
        process.env.DB,
        { useNewUrlParser: true });
    return client.db('vue_express_db').collection('posts');
}

module.exports = router;