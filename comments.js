// Create web server
// Create a comments array
// Create a function to add new comments
// Create a function to delete comments
// Create a function to list all comments
// Create a function to list a specific comment
// Create a function to update a specific comment
// Create a function to list all comments by a specific user
// Create a function to list all comments by a specific post

const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON

const comments = [];

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.send(comment);
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentIndex = comments.findIndex(comment => comment.id === id);
    if (commentIndex === -1) {
        res.send('Comment not found');
    } else {
        comments.splice(commentIndex, 1);
        res.send('Comment deleted');
    }
});

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === id);
    if (!comment) {
        res.send('Comment not found');
    } else {
        res.send(comment);
    }
});

app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body;
    const commentIndex = comments.findIndex(comment => comment.id === id);
    if (commentIndex === -1) {
        res.send('Comment not found');
    } else {
        comments[commentIndex] = newComment;
        res.send('Comment updated');
    }
});

app.get('/comments/user/:user', (req, res) => {
    const { user } = req.params;
    const userComments = comments.filter(comment => comment.user === user);
    res.send(userComments);
});

app.get('/comments/post/:post', (req, res) => {
    const { post } = req.params;
    const postComments = comments.filter(comment => comment.post === post);
    res.send(postComments);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});