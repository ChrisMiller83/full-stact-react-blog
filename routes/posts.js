var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const models = require('../models');


/* GET post */ // The include: part of the function selects info you want to display instead of displaying everything in models.User
router.get('/', async (req, res) => {
  const posts = await models.Post.findAll({
    include: [
      {
        model: models.User, 
        attributes: ['username', 'id']
      }
    ],
  });

  res.json(posts);
});

// created checkAuth in auth/checkAuth.js and called it instead of rewriting the isLoggedin function over and over.

router.post('/', checkAuth, async (req, res) => {
  // check for all fields
    // if some fields missing 
    // send 400 error
  if (!req.body.title || !req.body.content) {
    return req.status(400).json({
      error: 'Please include all title and content'
    });
  }
    
  // create new post 
  const post = await models.Post.create({
    title: req.body.title,
    content: req.body.content,
    UserId: req.session.user.id,    
  })

    // send back new post data  
  res.status(201).json(post);
});

// add comments to post
router.post('/:id/comments', checkAuth, async (req, res) => {
  const post = await models.Post.findByPk(req.params.id)
  if (!post) {
    res.status(404).json({
      error: 'Could not find post with that id'
    })
  }

  if (!req.body.text) {
    res.status(404).json({
      error: 'please include all required fields'
    })
  }

  const comment = await post.createComment({
    text: req.body.text,
    PostId: req.params.id,
    UserId: req.session.user.id,
  })
  res.status(201).json(comment);
})

router.get('/:id/comments', async (req, res) => {
  const post = await models.Post.findByPk(req.params.id)
  if (!post) {
    res.status(404).json({
      error: 'Could not find post with that id'
    })
  }

  const comments = await post.getComments({
    include: [{ model: models.User, attributes: ['username', 'id']}],
  });
    res.json(comments);
  })



module.exports = router;
