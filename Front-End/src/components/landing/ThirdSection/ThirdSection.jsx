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
        <Container fluid className="py-5">
            <Row className="justify-content-center mb-5">
                <Col md={8} className="text-center">
                    <h2 className="display-4 fw-bold mb-3">
                        ¡Conocé al equipo detrás de <span className="text-primary">Mate+</span>!
                    </h2>
                    <p className="lead text-muted">
                        Un grupo de profesionales apasionados por la educación y la tecnología
                    </p>
                </Col>
            </Row>

            <Container>
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    {/* Tabs mejorados */}
                    <Nav variant="pills" className="justify-content-center mb-5 gap-3">
                        {Object.entries(teamData).map(([key, value]) => (
                            <Nav.Item key={key}>
                                <Nav.Link
                                    eventKey={key}
                                    className={`px-4 py-2 rounded-pill fw-semibold ${activeTab === key ? 'text-white' : ''
                                        }`}
                                    style={{
                                        backgroundColor: activeTab === key ? value.color : '#f8f9fa',
                                        color: activeTab === key ? 'white' : value.color,
                                        border: `2px solid ${value.color}`,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <span className="me-2">{value.icon}</span>
                                    {value.title}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Contenido de Tabs Mejorado */}
                    <Tab.Content>
                        {Object.entries(teamData).map(([key, value]) => (
                            <Tab.Pane key={key} eventKey={key}>
                                <Row className="g-4 justify-content-center">
                                    {value.members.map((member, idx) => (
                                        <Col key={idx} xs={12} md={6} lg={4}>
                                            <Card className="h-100 border-0 shadow-sm hover-card text-center">
                                                <Card.Body className="p-4">
                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            backgroundColor: `${value.color}15`,
                                                            fontSize: '3rem'
                                                        }}
                                                    >
                                                        {member.avatar}
                                                    </div>
                                                    <Card.Title className="fw-bold mb-2">{member.name}</Card.Title>
                                                    <Card.Subtitle className="mb-3" style={{ color: value.color }}>
                                                        {member.role}
                                                    </Card.Subtitle>
                                                    <Card.Text className="text-muted small">
                                                        {member.bio}
                                                    </Card.Text>
                                                    {/* Botón de GitHub opcional */}
                                                    <Button
                                                        variant="link"
                                                        className="text-decoration-none p-0"
                                                        href={`https://github.com/${member.github}`}
                                                        target="_blank"
                                                    >
                                                        Ver perfil →
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </Container>

            <style>{`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </Container>
    );
};

export default ThirdSection;