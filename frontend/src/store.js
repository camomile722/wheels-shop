import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productTopRatedReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer } from './reducers/productReducers'
import { cartReducer }  from './reducers/cartReducers'
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer,orderListMyReducer,orderListReducer,orderPayReducer}  from './reducers/orderReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers'
import { postCreateReducer, postDeleteReducer, postDetailsReducer, postLikeReducer, postListReducer, postTopLikedReducer, postUpdateReducer,postCommentCreateReducer }  from './reducers/postReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    orderCreate:orderCreateReducer,
    orderDelete:orderDeleteReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy:orderListMyReducer,
    orderList: orderListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    postList: postListReducer,
    postDetails: postDetailsReducer,
    postDelete: postDeleteReducer,
    postCreate: postCreateReducer,
    postUpdate: postUpdateReducer,
    postTopLiked: postTopLikedReducer,
    productTopRated:productTopRatedReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    postLike:postLikeReducer,
    postCommentCreate:postCommentCreateReducer,


})
// JSON.parse, because in localstorage saves strings
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress:shippingAddressFromStorage},
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store