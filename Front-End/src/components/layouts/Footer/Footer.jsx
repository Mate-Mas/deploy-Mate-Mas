import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import '../Footer/Footer.css';
import 'font-awesome/css/font-awesome.min.css'; 

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <Container className="footer">
        <div className="ms-4">
          <Row>
            <Col className='text-center'>
              <h5>MATE+</h5>
            </Col>
          </Row>

          <Row>
            <Col className='text-center'>
              <h5>Buenos Aires, Argentina</h5>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col className='text-center pt-3'>
              <a href="/Landing">HOME</a>
            </Col>
          </Row>
          <Row>
            <Col className='text-center pt-3'>
              <a href="/Landing">SOBRE NOSOTROS</a>
            </Col>
          </Row>
          <Row>
            <Col className='text-center pt-3'>
              <a href="/Landing">PREGUNTAS FRECUENTES</a>
            </Col>
          </Row>
          <Row>
            <Col className='text-center pt-3'>
              <a href="/Landing">CONTÁCTANOS</a>
            </Col>
          </Row>

        </div>
        <div className="me-4">
          <Row>
            <Col className='text-center'>
              <a href="/Landing">NUESTRAS REDES</a>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
                            <a href="#" className="text-white me-3">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
