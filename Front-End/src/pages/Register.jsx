import {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext"
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
//aca tengo los hooks para el formulario de registro, similar a los del login pero con campos adicionales como nombre 
// y confirmación de contraseña

const useRegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); //traemos el contexto de autenticación para simular el login después del registro exitoso
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success'); // 'success' o 'danger'
    const [showToast, setShowToast] = useState(false);
// aca para memanejar el cambio de los campos del formulario, similar al login pero con más campos
    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'nombre') setNombre(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

//manejar el envío del formulario, con validaciones básicas para campos vacíos, formato de email y 
// coincidencia de contraseñas
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
            if (!nombre || !email || !password || !confirmPassword){
                setToastMessage('❌ Por favor, completa todos los campos');
                setToastVariant('danger');
                setShowToast(true);
                return;
            }
            // Validación de formato de email
            if (!email.includes('@')) {
            setToastMessage('❌ Ingresa un correo electrónico válido');
            setToastVariant('danger');
            setShowToast(true);
            return;
        } 
        // Validación de longitud de contraseña
            if (password.length < 8) {
            setToastMessage('❌ La contraseña debe tener al menos 8 caracteres');
            setToastVariant('danger');
            setShowToast(true);
            return;
        }
        // Validación de coincidencia de contraseñas
        if (password !== confirmPassword) {
            setToastMessage('❌ Las contraseñas no coinciden');
            setToastVariant('danger');
            setShowToast(true);
            return;
        }


     //   console.log('Intentando registrar con:', { nombre, email, password, confirmPassword });
            login({name: nombre, email}); // Simulamos el login después del registro exitoso
            setToastMessage('✅ Registro exitoso');
            setToastVariant('success');
            setShowToast(true);
        // aca simulamos respuesta, limpiamos campos y redirigimos al login después de un tiempo
        setTimeout(() => {
            setNombre('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/login', { replace: true });
        }, 2000);
    };
        
    
    return {
        nombre,
        email,
        password,
        confirmPassword,
        handleChangeValue,
        toastMessage,
        toastVariant,
        showToast,
        setShowToast,
        handleSubmit
    };
};



// aca esta la vista, y en la const, desestructuro los valores y métodos del hook personalizado
//  para usarlos en el formulario de registro
const RegisterPage = () => {
const {
    nombre,
    email,
    password,
    confirmPassword,
    showToast,
    toastMessage,
    toastVariant,
    setShowToast,
    handleChangeValue,
    handleSubmit
} = useRegisterForm();

    return (
        <>
            <Container fluid className="vh-100 vw-100 p-0 m-0"> 
                <Row className="h-100 g-0"> 
                    <Col md={6} className="bg-primary d-none d-md-flex align-items-center justify-content-center text-white">
                            <div className="text-center p-5">
                                <h1 className="display-4 mb-4 font-weight-bold">Bienvenido</h1>
                                <p className="lead">Únete y comienza a gestionar tu aprendizaje</p>
                            </div>
                        </Col>
                        <Col md={6} className="d-flex align-items-center justify-content-center bg-light">  
                        <Card className="border-0 bg-transparent" style={{ width: '100%', maxWidth: '400px' }}> 
                            <Card.Body className="p-4"> 
                            <div className="text-center mb-4"> 
                            <h1 className="mb-3">Registro</h1>
                            <p className="text-muted">
                                            ¿Ya tienes una cuenta?{' '}
                                            <Link to="/login" className="text-primary text-decoration-none">
                                            Iniciar Sesión
                                            </Link>
                                        </p>
                            </div>
                <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingresa tu nombre"
                                                size="lg"
                                                onChange={handleChangeValue}
                                                name="nombre"
                                                value={nombre}
                                            />
                                        </Form.Group>     
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
                                        <Form.Group className="mb-4">
                                            <Form.Label>Confirmar contraseña</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="••••••••"
                                                size="lg"
                                                onChange={handleChangeValue}
                                                name="confirmPassword"
                                                value={confirmPassword}
                                            />
                                        </Form.Group>  
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            size="lg"
                                            className="w-100 mb-3"
                                        >
                                            Registrarse
                                        </Button>            
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
}

export default RegisterPage;