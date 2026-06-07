import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Tab,
    Nav
} from 'react-bootstrap';
import { teamData } from '../../../data/TeamData';

const ThirdSection = () => {
    const [activeTab, setActiveTab] = useState('frontend');

    return (
        <Container fluid className="py-5" id="nosotros">
            <Row className="justify-content-center mb-5">
                <Col md={8} className="text-center">
                    <h2 className="display-4 fw-bold mb-3" style={{ color: '#2D3E4E' }}>
                        Proyecto presentado por Equipo 8 Innova Lab
                    </h2>
                </Col>
            </Row>

            <Container>
                <Row className="justify-content-center d-flex">
                    {teamData.map((dpto) => (
                        <Col key={dpto.title} md={4} className="mb-4">
                            <Card style={{ borderColor: "#31C976", borderWidth: '10px', marginBottom: '1rem', height: '40vh', width: "100%" }} className="shadow-lg">
                                <Card.Img variant="top" src={dpto.src} style={{ height: '100%', objectFit: 'cover' }} />
                            </Card>
                            <h5 className="text-center mt-2" style={{ fontSize: "2rem", color: "#2D3E4E" }}>{dpto.title}</h5>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default ThirdSection;