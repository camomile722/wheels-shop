import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPostDetails, updatePost } from '../actions/postActions'
import { POST_UPDATE_RESET } from '../constants/postConstants'

function PostEditScreen({ match, history }) {
  //post id from url
  const postId = match.params.id

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')

  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const postDetails = useSelector((state) => state.postDetails)
  const { loading, error, post } = postDetails

  const postUpdate = useSelector((state) => state.postUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET })
      history.push('/admin/postlist')
    } else {
      // post id = post id in url
      if (!post.name || post._id !== postId) {
        dispatch(listPostDetails(postId))
      } else {
        setName(post.name)
        setContent(post.content)
        setImage(post.image)
        setCategory(post.category)
      }
    }
  }, [dispatch, postId, post, history, successUpdate])
  // files array, we need the first one [0]
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    // Update Post
    dispatch(
      updatePost({
        _id: postId,
        name,
        content,
        image,
        category,
      })
    )
  }

  return (
    <>
      <Link to='/admin/postlist' className='btn btn-light my-3'>
        Zurück
      </Link>
      <FormContainer>
        <h1>Beitrag bearbeiten</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='category'>
              <Form.Label>Kategorie</Form.Label>
              <Form.Control
                type='text'
                placeholder='Kategorie'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control
                type='text'
                placeholder='Text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image' className='img-upload'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='image'
                placeholder='Image'
                src={image}
                valur={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Foto wählen'
                custom
                onChange={uploadFileHandler}
              >
                {uploading && <Loader />}
              </Form.File>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Ändern
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PostEditScreen
