import {
    Row,
    Col,
    Button,
    Card,
} from 'react-bootstrap';
import { FiArrowUpRight } from "react-icons/fi";
import { BiMath } from "react-icons/bi";
import './FirstSection.css';

const FirstSection = ({ navigate }) => {
    return (
        <Row className="vh-100 g-0" id="inicio" style={{ backgroundColor: "#F0F1EB" }}>
            {/* Columna lateral izquierda - Decorativa */}
            <Col md={6} className="d-none d-md-flex align-items-center justify-content-center text-white position-relative overflow-hidden">
                <svg
                    width="50"
                    height="48"
                    viewBox="0 0 50 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color='#2D3E4E'
                    style={{
                        fontSize: 80,
                        marginTop: "auto",
                        position: "absolute",
                        top: "5%",
                        left: "10%",
                        zIndex: 100
                    }}
                >
                    <path d="M32.7378 0H0V15.7632H21.21L0 36.2711L11.5278 47.4173L32.7378 26.9094V47.4173H49.0407V15.7632V0H32.7378Z" fill="#2D3E4E" />
                </svg>

                <Card className="border-0 bg-transparent shadow-none" style={{ width: '80%', height: '90%' }}>
                    <Card.Body
                        className="d-flex flex-column justify-content-between align-items-center"
                        style={{
                            padding: "6rem",
                            gap: '2rem',
                            backgroundColor: "white",
                            borderRadius: "100%",
                            height: "100%",
                        }}
                    >
                        {/* Primer SVG (verde) */}
                        <svg
                            width="284"
                            height="267"
                            viewBox="0 0 284 267"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "auto" }}
                        >
                            <path
                                d="M284 117.785H181.976L254.118 50.0467L230.7 28.0582L158.559 95.7974V0H125.441V95.7974L53.2998 28.0582L29.882 50.0467L102.024 117.785H0V148.881H102.024L29.882 216.62L53.2998 238.608L125.441 170.87V266.666H158.559V170.87L230.7 238.608L254.118 216.62L181.976 148.881H284V117.785Z"
                                fill="#31C976"
                            />
                        </svg>

                        {/* Segundo SVG (azul/oscuro) */}
                        <svg
                            width="284"
                            height="267"
                            viewBox="0 0 284 267"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginLeft: "auto" }}
                        >
                            <path
                                d="M284 117.785H181.976L254.118 50.0467L230.7 28.0582L158.559 95.7974V0H125.441V95.7974L53.2998 28.0582L29.882 50.0467L102.024 117.785H0V148.881H102.024L29.882 216.62L53.2998 238.608L125.441 170.87V266.666H158.559V170.87L230.7 238.608L254.118 216.62L181.976 148.881H284V117.785Z"
                                fill="#2D3E4E"
                            />
                        </svg>
                    </Card.Body>
                </Card>
            </Col>

            {/* Columna derecha - Formulario */}
            <Col md={6} className="d-flex align-items-center justify-content-center">
                <Card className="border-0 bg-transparent shadow-none" style={{ width: '100%', maxWidth: '450px' }}>
                    <Card.Body className="p-4 d-flex flex-column" style={{ gap: '2.5rem' }}>
                        <div className="text-center">
                            <h1 className="mb-3 fw-bold display-1 d-flex justify-content-center align-items-center" style={{ color: '#2D3E4E' }}>
                                <svg
                                    width="50"
                                    height="55"
                                    viewBox="0 0 50 55"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    color='#31C976'
                                    style={{
                                        fontSize: 60,
                                        marginTop: "auto",
                                    }}
                                >
                                    <path d="M32.7378 0H0V18.1696H21.21L0 41.8082L11.5278 54.6559L32.7378 31.0174V54.6559H49.0407V18.1696V0H32.7378Z" fill="#31C976" />
                                </svg>

                                <span style={{ fontSize: 100 }}>MATE</span>
                                <span className="fw-black" style={{ fontSize: 70, fontWeight: '900' }}>+</span>
                            </h1>
                        </div>

                        <div className="text-center">
                            <h3 className="fw-semibold">Aprendé matemáticas para la vida cotidiana, sin presión y a tu propio ritmo.</h3>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-100 py-3 rounded-pill fw-semibold"
                                style={{ backgroundColor: "#31C976", borderColor: "#31C976", borderRadius: "35px", fontSize: "1.75rem" }}
                                onClick={() => navigate('/started')}
                            >
                                Comenzar
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default FirstSection;