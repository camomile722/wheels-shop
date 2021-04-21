import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  listPostDetails,
  createPostComment,
  likePost,
} from '../actions/postActions'
import {
  COMMENT_CREATE_RESET,
  POST_UPDATE_LIKES_RESET,
} from '../constants/postConstants'

function PostSingleScreen({ match }) {
  const [text, setText] = useState('')
  const [avatar, setAvatar] = useState('')
  const [likes, setLikes] = useState(0)
  const [user] = useState(0)

  const dispatch = useDispatch()

  const postDetails = useSelector((state) => state.postDetails)
  const { loading, error, post } = postDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postCommentCreate = useSelector((state) => state.postCommentCreate)
  const {
    success: successCommentCreate,
    error: errorPostCommentCreate,
  } = postCommentCreate

  const postLike = useSelector((state) => state.postLike)
  const { success: successPostLike, error: errorPostLike } = postLike

  useEffect(() => {
    //console.log('hello');
    if (successCommentCreate) {
      alert('Kommentar wurde hinzugefügt!')
      setText('')
      setAvatar('')

      dispatch({ type: COMMENT_CREATE_RESET })
    }
    dispatch(listPostDetails(match.params.id))

    if (successPostLike) {
      setLikes(0)
      dispatch({ type: POST_UPDATE_LIKES_RESET })
    }
  }, [dispatch, match, successCommentCreate, successPostLike])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createPostComment(match.params.id, {
        text,
        avatar,
      })
    )
  }

  const clickHandler = (e) => {
    dispatch(
      likePost(match.params.id, {
        likes,
        user,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/posts'>
        Zurück
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={12} sm={12}>
              <Image src={post.image} alt={post.name} fluid />
            </Col>
            <Col>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{post.name}</h3>
                </ListGroupItem>

                <ListGroupItem>{post.content}</ListGroupItem>
              </ListGroup>
              {errorPostLike && (
                <Message variant='danger'>{errorPostLike}</Message>
              )}
              {userInfo ? (
                <div className='d-flex justify-content-end'>
                  <Button onClick={clickHandler}>
                    {' '}
                    <i as='div' className='far fa-heart'>
                      {' '}
                      {post.likes.length > 0 && (
                        <span> {post.likes.length} </span>
                      )}{' '}
                    </i>
                  </Button>
                </div>
              ) : (
                <>
                  <div className='d-flex justify-content-end'>
                    <Button className='my-3'>
                      {' '}
                      <i as='div' className='far fa-heart'>
                        {' '}
                        {post.likes.length > 0 && (
                          <span> {post.likes.length} </span>
                        )}{' '}
                      </i>
                    </Button>
                  </div>
                  <Col md={6}>
                    <Message className='my-3'>
                      {' '}
                      Bitte <Link to='/login'>loggen Sie sich ein </Link> um
                      Posts zu liken{' '}
                    </Message>
                  </Col>
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className='mx-3 py-3'>Kommentare</h2>
              <Col md={6}>
                {post.comments.length === 0 && (
                  <Message>
                    Es gibt noch keine Kommentare zum diesen Post
                  </Message>
                )}
              </Col>
              <ListGroup variant='flush'>
                {post.comments.map((comment) => (
                  <ListGroup.Item key={comment._id}>
                    <strong>{comment.name}</strong>
                    <p>{comment.createdAt.substring(0, 10)}</p>
                    <p>{comment.text}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Kommentieren</h2>
                  {errorPostCommentCreate && (
                    <Message variant='danger'>{errorPostCommentCreate}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Absenden
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      {' '}
                      Bitte <Link to='/login'>loggen Sie sich ein </Link> um
                      Posts zu kommentieren{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PostSingleScreen
