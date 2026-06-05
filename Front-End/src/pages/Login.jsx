import { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Toast,
    ToastContainer
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../services/index';

// Hook personalizado para manejar el estado del formulario de inicio de sesión
const useLoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success'); // 'success' o 'danger'

    // Método para manejar el cambio de los campos del formulario
    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // Método para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        // Validaciones básicas
        if (!email || !password) {
            setToastMessage('❌ Por favor, completa todos los campos');
            setToastVariant('danger');
            setShowToast(true);
            return;
        }

        if (!email.includes('@')) {
            setToastMessage('❌ Ingresa un correo electrónico válido');
            setToastVariant('danger');
            setShowToast(true);
            return;
        }

        // Aquí podrías agregar lógica para autenticar al usuario con el backend
        // Simulamos una autenticación exitosa
        console.log('Intentando iniciar sesión con:', { email, password });

        // 
        axiosInstance.post('/login', { email, password })
            .then(response => {
                // status 200 
                login({ email });
                console.log('Respuesta del servidor:', response.data);
                // Aquí podrías manejar la respuesta del servidor, como guardar el token de autenticación
                // Simulación de respuesta del servidor (éxito)
                setToastMessage('✅ ¡Inicio de sesión exitoso! Redirigiendo...');
                setToastVariant('success');
                setShowToast(true);

                // Limpiar el formulario después de 2 segundos
                setTimeout(() => {
                    setEmail('');
                    setPassword('');
                    // Aquí podrías redirigir al usuario a otra página
                    navigate('/dashboard', { replace: true });
                }, 2000);
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
                setToastMessage('❌ Error al iniciar sesión. Por favor, intenta nuevamente.');
                setToastVariant('danger');
                setShowToast(true);
            });
    };

    const handleSocialLogin = (provider) => {
        // Aquí podrías agregar lógica para manejar el inicio de sesión con redes sociales
        setToastMessage(`🔗 Iniciando sesión con ${provider}...`);
        setToastVariant('info');
        login({ email: `${provider}@example.com` });
        setShowToast(true);
    }

    return {
        email,
        password,
        showToast,
        setShowToast,
        toastMessage,
        toastVariant,
        handleChangeValue,
        handleSubmit,
        handleSocialLogin
    };
}

const LoginPage = () => {
    const {
        email,
        password,
        showToast,
        setShowToast,
        toastMessage,
        toastVariant,
        handleChangeValue,
        handleSubmit,
        handleSocialLogin
    } = useLoginForm();

    useEffect(() => {
        // Aquí podrías agregar lógica para verificar si el usuario ya está autenticado
        // y redirigirlo a la página principal si es así.
    }, []);

    return (
        <>
            <Container fluid className="vh-100 vw-100 p-0 m-0">
                <Row className="h-100 g-0">
                    {/* Columna lateral izquierda */}
                    <Col md={6} className="bg-primary d-none d-md-flex align-items-center justify-content-center text-white">
                        <div className="text-center p-5">
                            <h1 className="display-4 mb-4 font-weight-bold">Bienvenido</h1>
                            <p className="lead">Accede a tu cuenta y gestiona todo desde un solo lugar</p>
                        </div>
                    </Col>

                    {/* Columna derecha - Formulario */}
                    <Col md={6} className="d-flex align-items-center justify-content-center bg-light">
                        <Card className="border-0 bg-transparent" style={{ width: '100%', maxWidth: '400px' }}>
                            <Card.Body className="p-4">
                                <div className="text-center mb-4">
                                    <h2 className="mb-3">Iniciar Sesión</h2>
                                    <p className="text-muted">
                                        ¿No tienes una cuenta?{' '}
                                        <Link to="/register" className="text-primary text-decoration-none">
                                            Regístrate
                                        </Link>
                                    </p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Correo electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="nombre@empresa.com"
                                            size="lg"
                                            onChange={handleChangeValue}
                                            name="email"
                                            value={email}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="••••••••"
                                            size="lg"
                                            onChange={handleChangeValue}
                                            name="password"
                                            value={password}
                                        />
                                    </Form.Group>

                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
                                        <Form.Check
                                            type="checkbox"
                                            label="Recordarme"
                                            className="order-md-1"
                                        />
                                        <Link to="/forgot-password" className="text-decoration-none order-md-2">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </div>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="lg"
                                        className="w-100 mb-3"
                                    >
                                        Ingresar
                                    </Button>

                                    <div className="text-center">
                                        <hr className="my-2" />
                                        <p className="text-muted mb-0">
                                            O continúa con
                                        </p>
                                        <div className="d-flex gap-2 justify-content-center mt-3">
                                            <Button onClick={() => handleSocialLogin('facebook')} variant="outline-secondary" className="flex-grow-1">
                                                Facebook
                                            </Button>
                                            <Button onClick={() => handleSocialLogin('google')} variant="outline-secondary" className="flex-grow-1">
                                                Google
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={5000}
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Body className={'text-white'}>
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default LoginPage;