import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { likePost } from '../actions/postActions'

function Post({ post, id }) {
  const dispatch = useDispatch()
  const [likes] = useState(0)
  const [user] = useState(0)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const clickHandler = (id) => {
    dispatch(
      likePost(id, {
        likes,
        user,
      })
    )
  }

  const messageHandler = (e) => {
    alert('Bitte loggen Sie sich ein')
  }
  return (
    <Card className='my-3 p-3 '>
      <Link to={`/post/${post._id}`}>
        <Card.Title as='h2' className='text-center'>
          {post.name}
        </Card.Title>
      </Link>
      <Link as='h4' className='text-center' to={`/post/${post._id}`}>
        <Card.Title as='div'>{post.category}</Card.Title>
      </Link>
      <Link to={`/post/${post._id}`}>
        <Card.Img variant='top' src={post.image} />
      </Link>
      <Card.Body>
        <Card.Text as='div' className='my-3 hide'>
          {post.content}
        </Card.Text>
        <Card.Text
          as='div'
          className='like-blog d-flex justify-content-between align-items-center flex-md-wrap'
        >
          <Link className='btn btn-outline-dark' to={`/post/${post._id}`}>
            Weiter lesen
          </Link>
          {userInfo ? (
            <Button onClick={() => clickHandler(post._id)} id={post._id}>
              <i as='div' className='far fa-heart'>
                {' '}
                {post.likes.length > 0 && (
                  <span> {post.likes.length} </span>
                )}{' '}
              </i>
            </Button>
          ) : (
            <>
              <Button onClick={(e) => messageHandler()}>
                <i as='div' className='far fa-heart'>
                  {' '}
                  {post.likes.length > 0 && (
                    <span> {post.likes.length} </span>
                  )}{' '}
                </i>
              </Button>
            </>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Post
