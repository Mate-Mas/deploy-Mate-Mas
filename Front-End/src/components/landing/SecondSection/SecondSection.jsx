import {
    Container,
    Row,
    Col,
    Stack,
} from 'react-bootstrap';
import { steps } from '../../../data/Steps';

const SecondSection = () => {
    return (
        <Container fluid className="p-5" style={{ backgroundColor: '#2C3D4D' }} id="como-funciona">
            <Stack>
                {steps.map((step, index) => (
                    <Row key={step.id} className={`py-4 align-items-center justify-content-around gap-2 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`} style={{ marginBottom: '3rem' }}>
                        <Col lg={7} className="text-center text-lg-start text-white">
                            <h3 className="display-2 text-uppercase fw-bold mb-3">{step.title}</h3>
                            <p className="lead text-white" style={{ fontSize: '2rem' }}>{step.subtitle}</p>
                        </Col>
                        <Col lg={4} className="text-center">
                            <div 
                                className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-lg"
                                style={{ 
                                    width: '180px', 
                                    height: '180px', 
                                    border: `10px solid #31C976`
                                }}
                            >
                                <img 
                                    src={step.src} 
                                    alt={step.title} 
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                                />
                            </div>
                        </Col>
                    </Row>
                ))}
            </Stack>
        </Container>
    );
};

export default SecondSection;