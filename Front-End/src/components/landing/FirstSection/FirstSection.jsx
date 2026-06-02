import {
    Row,
    Col,
    Button,
    Card,
} from 'react-bootstrap';
import { BiMath } from "react-icons/bi";
import './FirstSection.css';

const FirstSection = ({ navigate }) => {
    return (
        <Row className="vh-100 g-0">
            {/* Columna lateral izquierda - Decorativa */}
            <Col md={6} className="bg-primary d-none d-md-flex align-items-center justify-content-center text-white position-relative overflow-hidden">
                <BiMath className="position-absolute text-white opacity-25" style={{ top: '15%', left: '10%', fontSize: '12rem' }} />
                <BiMath className="position-absolute text-white opacity-25" style={{ bottom: '15%', right: '10%', fontSize: '10rem' }} />
                <BiMath className="position-absolute text-white opacity-10" style={{ top: '50%', left: '50%', fontSize: '18rem', transform: 'translate(-50%, -50%)' }} />
            </Col>

            {/* Columna derecha - Formulario */}
            <Col md={6} className="d-flex align-items-center justify-content-center bg-light">
                <Card className="border-0 bg-transparent shadow-none" style={{ width: '100%', maxWidth: '450px' }}>
                    <Card.Body className="p-4 d-flex flex-column" style={{ gap: '2.5rem' }}>
                        <div className="text-center">
                            <h1 className="mb-3 fw-bold display-1 text-primary">Mate+</h1>
                            <div className="bg-primary mx-auto rounded-pill" style={{ width: '60px', height: '3px' }}></div>
                        </div>

                        <div className="text-center">
                            <h3 className="fw-semibold">Aprendé matemáticas para la vida cotidiana</h3>
                            <p className="text-muted mt-3">Sin presión y a tu propio ritmo</p>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-100 py-3 rounded-pill fw-semibold"
                                onClick={() => navigate('/register')}
                            >
                                Registrate ahora
                            </Button>

                            <Button
                                variant="outline-primary"
                                size="lg"
                                className="w-100 py-3 rounded-pill fw-semibold"
                                onClick={() => navigate('/login')}
                            >
                                Iniciar sesión
                            </Button>
                        </div>

                        {/* Footer adicional */}
                        <p className="text-center text-muted small mt-3">
                            ¿Tenés dudas? <a href="#" className="text-primary">Contactanos</a>
                        </p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default FirstSection;