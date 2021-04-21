import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { ListGroupItem } from 'react-bootstrap'

// match to get url: params, location.search to getall after ?  : ?qty= , history to redirect
function CartScreen({ match, location, history }) {
  const productId = match.params.id
  // if qty exists, ?qty=3 split ('=') in array [qty, 3], we need a number => [1] index
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  //console.log(qty);

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  //console.log( cartItems );

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    //console.log('remove')
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    //console.log('checkout');
    // push- add to the and of array '/login?redirect=shipping', redirection if you are logged in - redirect to shipping, if not to login
    history.push('/login?redirect=shipping')
  }

  //item.product - product: data.id from cartActions
  //Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
  // cartItems is an Array,  accumulator starts from 0
  //toFixed(2)  rounding the number to keep only two decimals
  return (
    <Row>
      <Col md={8}>
        <h1>Warenkorb</h1>
        {cartItems.length === 0 ? (
          <Message>
            Warenkorb ist leer <Link to='/shop'>Zurück</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>€{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>
                Gesamtsumme (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Artikel
              </h2>
              €
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Zur Kasse
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
