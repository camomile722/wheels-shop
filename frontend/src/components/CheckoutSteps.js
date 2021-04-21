import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className='checkout'>Anmelden</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Anmelden</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className='checkout'>Adresse</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Adresse</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer className='checkout' to='/payment'>
            <Nav.Link>Zahlen</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Zahlen</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer className='checkout' to='/placeorder'>
            <Nav.Link>Bestellen</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Bestellen</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
