import { Navbar, Container, Nav, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import './header.css'


export default function Header() 
{
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';

  const cerrarSesion = () => 
    {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <>
     
    <Navbar className="navbar-custom"expand="lg" sticky="top">
        <Container>
            <Navbar.Brand  href='#'>Mate+</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Inicio</Nav.Link>
                    <Nav.Link  href='#como-funciona'>Como Funciona</Nav.Link>
                    <Nav.Link href='#nosotros'>Nosotros</Nav.Link>
                </Nav>
               
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </>
  );
}

