import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }

  // calculate prices item.price * item.qty +  item.price * item.qty
  //subtotal price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  //sipping price
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 70)

  //tax price to decimals

  //cart.taxPrice = addDecimals(Number((0.19 * cart.itemsPrice).toFixed(2)))

  //total price with tax
  //cart.totalPrice = (
  ////    Number(cart.itemsPrice) +
  //    Number(cart.shippingPrice) +
  //    Number(cart.taxPrice)
  //  ).toFixed(2)

  //total price without tax
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_CREATE_RESET })
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    //console.log('order')
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Lieferadresse</h2>
              <div>
                <strong>Adresse:</strong>
                <div>{cart.shippingAddress.address}</div>
                <div>
                  {cart.shippingAddress.postalCode} {cart.shippingAddress.city}
                </div>
                {cart.shippingAddress.country}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Zahlungsart</h2>
              <strong>Zahlungsart:</strong>
              <div>{cart.paymentMethod}</div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Artikel</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Dein Warenkorb ist leer</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x €{item.price} = €{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Bestellung</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Artikel</Col>
                  <Col>€{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Versand</Col>
                  <Col>€{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/*<ListGroup.Item>
                <Row>
                  <Col>MwSt.</Col>
                  <Col>€{cart.taxPrice}</Col>
                </Row>
             </ListGroup.Item>*/}

              <ListGroup.Item>
                <Row>
                  <Col>Gesamtsumme</Col>
                  <Col>€{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Bestellen
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
