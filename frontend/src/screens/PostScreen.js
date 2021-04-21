import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import Loader from '../components/Loader'
import Message from '../components/Message'
import SearchBoxPost from '../components/SearchBoxPost'
import PaginatePosts from '../components/PaginatePosts'
import { listPosts } from '../actions/postActions'
import {
  POST_UPDATE_LIKES_RESET,
} from '../constants/postConstants'

const PostScreen = ({ match }) => {
  const keyword = match.params.keyword
  const id = match.params.id
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const postList = useSelector((state) => state.postList)
  const { loading, error, posts, page, pages } = postList

  const postLike = useSelector((state) => state.postLike)
  const { success: successPostLike, error: errorPostLike } = postLike
  const [, setLikes] = useState(0)
  

  useEffect(() => {
    dispatch(listPosts(keyword, pageNumber))
    if (successPostLike) {
      setLikes(0)
      dispatch({ type: POST_UPDATE_LIKES_RESET })
    }
  }, [dispatch, keyword, pageNumber, id, successPostLike])


  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
         {errorPostLike && <Message variant='danger'>{errorPostLike}</Message>}
          <Row>
            <Col sm={12} md={8}>
              <Route
                render={({ history }) => <SearchBoxPost history={history} />}
              />
              {posts.map((post) => (
                <Col key={post._id} className='fluid'>
                  <Post post={post} id={post._id} />
                </Col>
                
              ))}
              
            </Col>
            <Sidebar />
          </Row>
          <PaginatePosts
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default PostScreen
