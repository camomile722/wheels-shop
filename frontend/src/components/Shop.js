import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'
import Product from '../components/Product'

function Shop() {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h4 className='text-center py-3'>Shop</h4>
          {products.map((product) => (
            <Col key={product._id} className='fluid'>
              <Product product={product} />
            </Col>
          ))}
        </>
      )}
    </>
  )
}

export default Shop
