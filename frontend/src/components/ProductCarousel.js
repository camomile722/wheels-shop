import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      
      <Carousel pause='hover'>
        {products.map((product) => (
          <Carousel.Item 
          key={product._id}
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}
          >
            <Link to={`/product/${product._id}`}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
    
              {/* <Carousel.Caption className='carousel-caption'>
                <h4 className='caption-color'>
                  {product.name} (€{product.price})
                </h4>
              </Carousel.Caption> */}
            </Link>
            <h2>TOP Bewertete Felgen</h2>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
