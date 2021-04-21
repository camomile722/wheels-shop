import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import ShopScreen from './screens/ShopScreen'
import ProductScreen from './screens/ProductScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import PostScreen from './screens/PostScreen'
import PostListScreen from './screens/PostListScreen'
import PostSingleScreen from './screens/PostSingleScreen'
import PostEditScreen from './screens/PostEditScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/postlist' component={PostListScreen} exact />
          <Route
            path='/admin/postlist/:pageNumber'
            component={PostListScreen}
            exact
          />
          <Route path='/admin/post/:id/edit' component={PostEditScreen} />

          <Route path='/' component={ShopScreen} exact />
          <Route path='/search/:keyword' component={ShopScreen} exact />
          <Route path='/page/:pageNumber' component={ShopScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={ShopScreen}
            exact
          />
          <Route
            path='/search/post/:keyword/page/:pageNumber'
            component={PostScreen}
            exact
          />

          <Route path='/search/post/:keyword' component={PostScreen} exact />

          <Route path='/posts/page/:pageNumber' component={PostScreen} exact />

          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/posts' component={PostScreen} exact />
          <Route path='/post/:id' component={PostSingleScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
