import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { steps } from '../../../data/Steps';

const SecondSection = () => {
    return (
        <Container fluid className="py-5 bg-light">
            <Row className="justify-content-center mb-5">
                <Col md={8} className="text-center">
                    <h2 className="display-4 fw-bold mb-3">¿Cómo funciona Mate+?</h2>
                    <p className="lead text-muted">Tres pasos simples para dominar las matemáticas</p>
                </Col>
            </Row>

            <Container>
                {steps.map((step, index) => (
                    <Row key={step.id} className={`mb-5 py-4 align-items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                        <Col lg={6} className="text-center text-lg-start">
                            <div className="mb-3">
                                {/* agregar un fonsize mas grande */}
                                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3" style={{ fontSize: '1.25rem' }}>
                                    Paso {step.id}
                                </span>
                            </div>
                            <h3 className="display-5 fw-bold mb-3">{step.title}</h3>
                            <p className="lead text-muted">{step.subtitle}</p>
                        </Col>
                        <Col lg={6} className="text-center">
                            <div 
                                className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-lg"
                                style={{ 
                                    width: '180px', 
                                    height: '180px', 
                                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`,
                                    border: `3px solid ${step.color}`
                                }}
                            >
                                <span className="display-1">{step.icon}</span>
                            </div>
                        </Col>
                    </Row>
                ))}
            </Container>
        </Container>
    );
};

export default SecondSection;