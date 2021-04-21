import express from 'express'
const router = express.Router()
import {
  getPostById,
  getPosts,
  getPostsByLikes,
  updatePost,
  deletePost,
  createPost,
  likePost,
  createPostComment
} from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPosts).post(protect, admin, createPost)
router.route('/like/:id').put(protect, likePost)
router.route('/:id/comment').post(protect, createPostComment)
router.route('/topLikes').get(getPostsByLikes)
router
  .route('/:id')
  .get(getPostById)
  .delete(protect, admin, deletePost)
  .put(protect, admin, updatePost)

export default router
