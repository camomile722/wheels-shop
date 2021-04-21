import axios from 'axios'
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_TOP_LIKED_FAIL,
  POST_TOP_LIKED_REQUEST,
  POST_TOP_LIKED_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_LIKES_FAIL,
  POST_UPDATE_LIKES_SUCCESS,
  POST_UPDATE_LIKES_REQUEST,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
} from '../constants/postConstants'

export const listPosts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({
      type: POST_LIST_REQUEST,
    })
    const { data } = await axios.get(
      `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTopLikedPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: POST_TOP_LIKED_REQUEST,
    })
    const { data } = await axios.get('/api/posts/toplikes')

    dispatch({
      type: POST_TOP_LIKED_SUCCESS,
      payload: data, 
    })
  } catch (error) {
    dispatch({
      type: POST_TOP_LIKED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const listPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: POST_DETAILS_REQUEST,
    })
    const { data } = await axios.get(`/api/posts/${id}`)

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data, 
    })
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/posts/${id}`, config)

    dispatch({
      type: POST_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPost = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/posts`, {}, config)

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/posts/${post._id}`, post, config)

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPostComment = (postId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COMMENT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/posts/${postId}/comment`, comment, config)

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const likePost = (id, likes) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPDATE_LIKES_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/posts/like/${id}`, likes, config)

    dispatch({
      type: POST_UPDATE_LIKES_SUCCESS,
      payload: { id, data },
    })
  } catch (error) {
    dispatch({
      type: POST_UPDATE_LIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
