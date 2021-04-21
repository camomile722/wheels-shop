import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import PaginatePosts from '../components/PaginatePosts'
import { listPosts, deletePost, createPost } from '../actions/postActions'
import { POST_CREATE_RESET } from '../constants/postConstants'

const PostListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts, page, pages } = postList

  const postDelete = useSelector((state) => state.postDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete

  const postCreate = useSelector((state) => state.postCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET })
    // if is not an Admin - redirect to /login
    if (!userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      history.push(`/admin/post/${createdPost._id}/edit`)
    } else {
      dispatch(listPosts('', pageNumber))
    }

    // success , to reload after delete
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdPost,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Beitrag entfernen?')) {
      // DELETE POST
      dispatch(deletePost(id))
    }
  }
  const createPostHandler = () => {
    // create a post
    dispatch(createPost())
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Beitrag</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createPostHandler}>
            <i className='fas fa-plus'></i> Beitrag hinzufügen
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>KATEGORIE</th>
                <th>FOTO</th>
                <th>NAME</th>
                <th>TEXT</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post._id}</td>
                  <td>{post.user.name}</td>
                  <td>{post.category}</td>
                  <td>
                    <Image
                      src={post.image}
                      alt={post.name}
                      fluid
                      rounded
                    ></Image>
                  </td>
                  <td>{post.name}</td>
                  <td>{post.content}</td>

                  <td>
                    <LinkContainer to={`/admin/post/${post._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(post._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginatePosts pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default PostListScreen
