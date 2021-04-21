import React, { useEffect } from 'react'
import { Nav, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listTopLikedPosts } from '../actions/postActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import Shop from './Shop'
import Post from '../components/Post'

function Sidebar() {
  const dispatch = useDispatch()
  const postTopLiked = useSelector((state) => state.postTopLiked)
  const { loading, error, posts } = postTopLiked

  useEffect(() => {
    dispatch(listTopLikedPosts())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col sm={12} md={4} className='border my-3 py-3'>
          <h4 className='text-center'>Kategorien</h4>
          <Nav className='flex-column sidebar'>
            <LinkContainer to='/'>
              <Nav.Link className='text-center'>Felgen</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
              <Nav.Link className='text-center'>Innenausstatung</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
              <Nav.Link className='text-center'>Außenausstatung</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
              <Nav.Link className='text-center'>Reise</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
              <Nav.Link className='text-center'>Events</Nav.Link>
            </LinkContainer>
          </Nav>
          <hr />
          <h4 className='text-center py-3'>TOP GELIKTE</h4>
          {posts.map((post) => (
            <Col key={post._id} className='fluid'>
              <Post post={post} />
            </Col>
          ))}
          <Shop />
        </Col>
      )}
    </>
  )
}
export default Sidebar
