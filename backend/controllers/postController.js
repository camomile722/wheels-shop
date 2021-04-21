import asyncHandler from 'express-async-handler'

import Post from '../models/postModel.js'

// @desc Fetch all posts
// @route GET /api/posts
// @access Public

const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Post.countDocuments({ ...keyword })
  const posts = await Post.find({ ...keyword })
    .populate('user', 'id name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ posts, page, pages: Math.ceil(count / pageSize) })
}) //   posts in json format 

const getPostsByLikes = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('likes', 'id likes')
    .sort({ 'likes.likes': 'desc' })
    .limit(5)

  res.json(posts)
})

// @desc Fetch a single post
// @route GET /api/posts/:id
// @access Public

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  // vivedi naidennii post po id v json, esli on esti
  if (post) {
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post not Found')
  }
})

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private/Admin

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  // if post exists remove it from database
  if (post) {
    await post.remove()
    res.json({ message: 'Beitrag wurde entfernt' })
  } else {
    res.status(404)
    throw new Error('Beitrag existiert nicht')
  }
})
// @desc Create a post
// @route POST /api/posts
// @access Private/Admin

const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    name: 'Name',
    content: 'Text',
    user: req.user._id,
    image: '/images/sample.png',
    category: 'Kategorie',
  })
  // save new post in database
  const createdPost = await post.save()
  // 201 - smth was created
  res.status(201).json(createdPost)
})

// @desc Update a post
// @route PUT /api/posts/:id
// @access Private/Admin

const updatePost = asyncHandler(async (req, res) => {
  // details from body
  const { name, content, image, category } = req.body

  const post = await Post.findById(req.params.id)
  if (post) {
    post.name = name
    post.content = content
    post.image = image
    post.category = category

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post wurde nicht gefunden')
  }
})

// @desc Like a POST
// @route PUT /api/posts/like/:id
// @access Private

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    // if we have this product, we check if user has already liked
    // find a like form this user
    const alreadyLiked = post.likes.find(
      (l) => l.user.toString() === req.user._id.toString()
    )

    if (alreadyLiked) {
      res.status(400)
      throw new Error('Post wurde schon geliked')
    }
    const likes = {
      user: req.user._id,
      likes: post.likes.length,
    }

    post.likes.push(likes)
    await post.save()
    res.status(201).json(post.likes)
  } else {
    res.status(404)
    throw new Error('Post existiert nicht')
  }
})

// @desc Create a Comment on Post
// @route POST /api/posts/:id/comment
// @access Private

const createPostComment = asyncHandler(async (req, res) => {
  // details from body
  const { text, avatar } = req.body

  const post = await Post.findById(req.params.id)
  if (post) {
    /// comment object
    const comment = {
      name: req.user.name,
      text,
      avatar,
      user: req.user._id,
    }
    // add a new comment  to array
    post.comments.push(comment)

    // save in database
    await post.save()
    // was created
    res.status(201).json({ message: 'Kommentar wurde hinzugefügt!' })
  } else {
    res.status(404)
    throw new Error('Post wurde nicht gefunden')
  }
})

export {
  getPosts,
  getPostsByLikes,
  getPostById,
  deletePost,
  updatePost,
  createPost,
  likePost,
  createPostComment,
}
