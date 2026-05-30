import { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Toast,
    ToastContainer,
    Stack,
    Tab,
    Nav
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiMath } from "react-icons/bi";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="p-0 m-0 overflow-auto overflow-x-hidden">
            <FirstSection navigate={navigate} />
            <SecondSection />
            <ThirdSection navigate={navigate} />
        </Container>
    );
}

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

const SecondSection = () => {
    const steps = [
        {
            id: 1,
            title: "Práctico y fácil de entender",
            subtitle: "Aprendé con ejemplos reales como compras, descuentos, precios y cuentas del día a día.",
            icon: "📚",
            color: "#0d6efd"
        },
        {
            id: 2,
            title: "Explicado paso a paso",
            subtitle: "Lecciones claras y simples para ganar confianza resolviendo problemas cotidianos.",
            icon: "🎯",
            color: "#6f42c1"
        },
        {
            id: 3,
            title: "Pensado para adultos",
            subtitle: "Una experiencia accesible y enfocada en aprender desde situaciones reales. Sin apuros ni presión. ¡A tu ritmo!",
            icon: "🌟",
            color: "#198754"
        }
    ];
    
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

const ThirdSection = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState('frontend');

    const teamData = {
        frontend: {
            title: "Frontend Developers",
            icon: "💻",
            color: "#0d6efd",
            members: [
                { name: "Lisan Castillo", role: "Frontend Lead", bio: "Especialista en React y arquitectura frontend", avatar: "👩‍💻", github: "lisan-castillo" },
                { name: "Agustina Gómez", role: "React Developer", bio: "Apasionada por las interfaces dinámicas", avatar: "👩‍🎨", github: "agustina-gomez" },
                { name: "Valentina López", role: "UI Specialist", bio: "Detallista y amante del CSS moderno", avatar: "👩‍🔧", github: "valentina-lopez" }
            ]
        },
        uxui: {
            title: "UX/UI Designers",
            icon: "🎨",
            color: "#6f42c1",
            members: [
                { name: "Juan Martínez", role: "UX Lead", bio: "Investigación y diseño centrado en el usuario", avatar: "👨‍🎨", github: "juan-martinez" },
                { name: "María Fernández", role: "UI Designer", bio: "Diseño visual y sistemas de diseño", avatar: "👩‍🎨", github: "maria-fernandez" },
                { name: "Pedro Sánchez", role: "Product Designer", bio: "Wireframes y prototipos interactivos", avatar: "👨‍💻", github: "pedro-sanchez" }
            ]
        },
        backend: {
            title: "Backend Developers",
            icon: "⚙️",
            color: "#198754",
            members: [
                { name: "Ana Rodríguez", role: "Backend Lead", bio: "Arquitectura de APIs y microservicios", avatar: "👩‍💻", github: "ana-rodriguez" },
                { name: "Carlos Ruiz", role: "API Specialist", bio: "Optimización de base de datos", avatar: "👨‍🔧", github: "carlos-ruiz" },
                { name: "Sofía Mendoza", role: "Security Engineer", bio: "Seguridad y escalabilidad", avatar: "👩‍💼", github: "sofia-mendoza" }
            ]
        },
        qa: {
            title: "QA Engineers",
            icon: "🧪",
            color: "#dc3545",
            members: [
                { name: "Diego Torres", role: "QA Lead", bio: "Pruebas automatizadas con Cypress", avatar: "👨‍🔬", github: "diego-torres" },
                { name: "Laura Núñez", role: "Manual QA", bio: "Pruebas de usabilidad y experiencia", avatar: "👩‍🔧", github: "laura-nunez" },
                { name: "Martín Díaz", role: "Performance QA", bio: "Pruebas de carga y estrés", avatar: "👨‍💻", github: "martin-diaz" }
            ]
        }
    };

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
                                    className={`px-4 py-2 rounded-pill fw-semibold ${
                                        activeTab === key ? 'text-white' : ''
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

export default Landing;