import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import DropdownSelector from '../components/DropdownSelector'

function Homescreen(props) {
    console.log(props);
   // const isShop = props.match.path === '/shop'
    return (
        <>
        <Container className="bg-slide" fluid>
          <Row>
            <Col md={4} sm={12} className="search_1 p-3">
              <DropdownSelector />
            </Col>
          </Row>
        </Container>

        <Container className="section-1">
          <Row className="px-5">
            <Col sm={12} md={12} className="p-5 ">
              <h3 className="py-3">Ihr Oldtimer Felgen Berater</h3>
              <p>
                Finde die passenden Felgen für dein Auto. Stet clita kasd
                gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                amet. Lorem ipsum dolor sit amet.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="bg-slide2" fluid>
          <DropdownSelector/>
        </Container>
      </>
    )
}

export default Homescreen
