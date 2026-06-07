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
    ToastContainer,
    InputGroup
} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
//aca tengo los hooks para el formulario de registro, similar a los del login pero con campos adicionales como nombre 
// y confirmación de contraseña

const useRegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); //traemos el contexto de autenticación para simular el login después del registro exitoso
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success'); // 'success' o 'danger'
    const [showToast, setShowToast] = useState(false);
    const [genero,setGenero] = useState('');
    const [lugar, setLugar] = useState('');
// aca para memanejar el cambio de los campos del formulario, similar al login pero con más campos
    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'nombre') setNombre(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
        if(name === 'genero') setGenero(value);
        if(name === 'lugar') setLugar(value);
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
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        genero,
        lugar,
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
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    genero,
    lugar,
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
                    <Col md={6} className="bg-primary d-none d-md-flex align-items-center justify-content-center text-white"
                        style={{
                        backgroundImage: 'url(src/images/fondo2.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    >
                            <div className="text-center p-5">
                                <h1 className="display-4 mb-4 font-weight-bold text-white"  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Bienvenido</h1>
                                <p className="lead text-white"  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Únete y comienza a gestionar tu aprendizaje</p>
                            </div>
                        </Col>
                        <Col md={6} className="d-flex align-items-center justify-content-center bg-light"
                            style={{ overflowY: 'auto', height: '100vh' }}>  
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
                                            <InputGroup>
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                size="lg"
                                                onChange={handleChangeValue}
                                                name="password"
                                                value={password}
                                            />
                                            <Button
                                            size="lg"
                                            variant="outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                            >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                             </InputGroup>
                                        </Form.Group>       
                                        <Form.Group className="mb-4">
                                            <Form.Label>Confirmar contraseña</Form.Label>
                                                <InputGroup>    
                                            <Form.Control
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                size="lg"
                                                onChange={handleChangeValue}
                                                name="confirmPassword"
                                                value={confirmPassword}
                                            />
                                            <Button
                                             size="lg"
                                            variant="outline-secondary"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            tabIndex={-1}
                                            >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                             </Button>
                                             </InputGroup>
                                        </Form.Group> 
                                        <Row className="mb-3 g-2">
                                        <Col xs={6}>
                                            <Form.Group>
                                                <Form.Label>Género</Form.Label>
                                                <Form.Select
                                                    name="genero"
                                                    value={genero}
                                                    onChange={handleChangeValue}
                                                >
                                                    <option value="">Seleccionar</option>
                                                    <option value="masculino">Masculino</option>
                                                    <option value="femenino">Femenino</option>
                                                    <option value="otro">Otro</option>
                                                    <option value="prefiero_no_decir">Prefiero no decir</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <Form.Label>Lugar</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ciudad o país"
                                                    onChange={handleChangeValue}
                                                    name="lugar"
                                                    value={lugar}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            size="lg"
                                            className="w-100 mt-3"
                                            style={{ 
                                            backgroundColor: '#2ECC71', 
                                            borderColor: '#2ECC71',
                                            color: 'white'
                                            }}
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