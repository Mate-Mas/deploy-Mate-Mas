import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Toast,
  ToastContainer,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../../src/components/layouts/header/Header";

const useRegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [genero, setGenero] = useState("");
  const [lugar, setLugar] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [anioNacimiento, setAnioNacimiento] = useState("");
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToastMessage("❌ Por favor, completá todos los campos");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setToastMessage("❌ Ingresa un correo electrónico válido");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }
    if (password.length < 8) {
      setToastMessage("❌ La contraseña debe tener al menos 8 caracteres");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }
    if (password !== confirmPassword) {
      setToastMessage("❌ Las contraseñas no coinciden");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }
    if (!acceptedTerms) {
      setToastMessage("❌ Debés aceptar los términos y condiciones");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }
    setShowProfileModal(true);
  };
  const handleCompleteProfile = async () => {
    if (!nombre ||  !genero ) {
      setToastMessage("❌ Completá todos los campos del perfil");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

   
    try {
      await register(email, password, nombre, {
        genero,
      });
      setToastMessage("✅ Registro exitoso");
      setToastVariant("success");
      setShowToast(true);
      setShowProfileModal(false);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error) {
      setToastMessage(`❌ Error: ${error.message}`);
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return {
    nombre,
    setNombre,
    email,
    password,
    setEmail,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    rememberMe,
    setRememberMe,
    acceptedTerms,
    setAcceptedTerms,
    genero,
    setGenero,
    showProfileModal,
    setShowProfileModal,
    handleChangeValue,
    toastMessage,
    toastVariant,
    showToast,
    setShowToast,
    handleSubmit,
    handleCompleteProfile,
  };
};

const RegisterPage = () => {
  const {
    nombre,
    setNombre,
    email,
    password,
    setEmail,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    rememberMe,
    setRememberMe,
    acceptedTerms,
    setAcceptedTerms,
    genero,
    setGenero,
    showProfileModal,
    setShowProfileModal,
    showToast,
    toastMessage,
    toastVariant,
    setShowToast,
    handleChangeValue,
    handleSubmit,
    handleCompleteProfile,
  } = useRegisterForm();

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/login/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#8FD8FD",
          backgroundSize: "contain",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "20px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: 400 }}>
          <Link to="/" style={{ position: "absolute", left: -70, top: 30 }}>
            <img
              src="/login/iconButton.png"
              alt="button"
              style={{ width: 50, height: 50 }}
            />
          </Link>
          <div
            className="bg-white rounded-4 p-4"
            style={{
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            }}
          >
            {/* Tabs */}
            <div className="d-flex border-bottom mb-4">
              <Link
                to="/login"
                className="flex-grow-1 text-center pb-2 text-decoration-none text-muted"
              >
                Iniciar sesión
              </Link>
              <span
                className="flex-grow-1 text-center pb-2 fw-bold"
                style={{
                  color: "#2D3E4E",
                  borderBottom: "3px solid #2D3E4E",
                  cursor: "default",
                }}
              >
                Registrarse
              </span>
            </div>
            <div className="text-center mb-3">
              <img
                src="/login/registroform.png"
                alt="login"
                style={{ width: 64, height: 64 }}
              />
            </div>
            <h3
              className="text-center fw-bold mb-4"
              style={{ fontSize: 24, fontWeight: 600 }}
            >
              Bienvenido a MATE+
            </h3>
            <Form onSubmit={handleSubmit} className="px-2">
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label className="visually-hidden">Email</Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "4px" }}
                >
                  <div style={{ position: "relative", flex: 1 }}>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChangeValue}
                        style={{
                          width: "100%",
                          backgroundColor: "#f5f5f5",
                          border: "none",
                          borderBottom: "1px solid #e0e0e0",
                          borderRadius: 0,
                          boxShadow: "none",
                          paddingRight: "10px",
                        }}
                      />
                    </InputGroup>
                    {email && (
                      <img
                        src="/login/icon2.png"
                        alt="Cerrar"
                        onClick={() => setEmail("")}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 16,
                          height: 16,
                          cursor: "pointer",
                          opacity: 0.6,
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      visibility: "hidden",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaEye size={18} />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label className="visually-hidden">Contraseña</Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "4px" }}
                >
                  <div style={{ position: "relative", flex: 1 }}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={handleChangeValue}
                      style={{
                        width: "100%",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        borderBottom: "1px solid #e0e0e0",
                        borderRadius: 0,
                        boxShadow: "none",
                        paddingRight: "10px",
                      }}
                    />
                    {/* ✕ borrar */}
                    {password && (
                      <img
                        src="/login/icon2.png"
                        alt="borrar"
                        onClick={() => setPassword("")}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 16,
                          height: 16,
                          cursor: "pointer",
                          opacity: 0.6,
                        }}
                      />
                    )}
                  </div>
                  {/* 👁 mostrar/ocultar */}
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerConfirmPassword">
                <Form.Label className="visually-hidden">
                  Repetir contraseña
                </Form.Label>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "4px" }}
                >
                  <div style={{ position: "relative", flex: 1 }}>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Repetir contraseña"
                      value={confirmPassword}
                      onChange={handleChangeValue}
                      style={{
                        width: "100%",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        borderBottom: "1px solid #e0e0e0",
                        borderRadius: 0,
                        boxShadow: "none",
                        paddingRight: "10px",
                      }}
                    />
                    {/* ✕ borrar */}
                    {confirmPassword && (
                      <img
                        src="/login/icon2.png"
                        alt="borrar"
                        onClick={() => setConfirmPassword("")}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 16,
                          height: 16,
                          cursor: "pointer",
                          opacity: 0.6,
                        }}
                      />
                    )}
                  </div>
                  {/* 👁 mostrar/ocultar */}
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </div>
                </div>
              </Form.Group>
              {/* Recordarme / Olvidé contraseña */}
              <div className=" mb-3">
                {/*  <Form.Check
                  type="checkbox"
                  id="rememberMe"
                  label="Recordarme"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  variant="dark"
                  className="small"
                /> */}
                <Form.Check
                  type="checkbox"
                  id="acceptedTerms"
                  label="He leído y acepto los términos y condiciones de uso"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  variant="dark"
                  className="small"
                />
              </div>
              {/* Botón ingresar */}
              <Button
                variant="outline-secondary"
                type="submit"
                className="w-100 rounded-pill fw-semibold mb-2 justify-content-center d-flex align-items-center gap-2"
                style={{ backgroundColor: "#FFFEFD", color: "#151515" }}
              >
                <img
                  src="/login/icon.png"
                  alt="Google"
                  style={{ width: 18, height: 18, bacgroundColor: "#E7E7E7" }}
                />
                Registrarse
              </Button>
              {/* Separador */}
              <div className="d-flex align-items-center my-2">
                <hr className="flex-grow-1" />
                <span className="mx-2 text-muted small">o</span>
                <hr className="flex-grow-1" />
              </div>
              {/* Google */}
              <Button
                variant="outline-secondary"
                className="w-100 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
              >
                <img
                  src="/login/icon.png"
                  alt="Google"
                  style={{
                    width: 18,
                    height: 18,
                    bacgroundColor: "#E7E7E7",
                    color: "#E7E7E7",
                  }}
                />
                Iniciar sesión con Google
              </Button>
            </Form>
            <p className="text-center mt-3 small text-muted">
              ¿Ya sos usuario?{" "}
              <Link
                to="/login"
                className="text-decoration-none "
                style={{ color: "#000000" }}
              >
                Ingresá
              </Link>
            </p>
          </div>
        </div>
      </Container>
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 99999, position: "fixed" }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className={"text-white"}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        centered
      >
        <div className="  position-relative width-100">
          <img
            src="/login/fmodal2.png"
            alt="fondomodal2"
            style={{
              width: 100,
              height: 100,
              position: "absolute",
              top: "15px",
              right: "10px",
            }}
          />
          <img
            src="/login/fmodal.png"
            alt="fondomodal"
            style={{
              width: 100,
              height: 100,
              position: "absolute",
              top: "5px",
              left: "10px",
            }}
          />
        </div>
        <Modal.Body className="p-4">
          <div className="text-center mb-3">
            <img
              src="/login/registro.png"
              alt="perfil"
              style={{ width: 64, height: 64 }}
            />
          </div>
          <h4 className="text-center fw-bold mb-4">Completa tu perfil</h4>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                border: "none",
                borderBottom: "1px solid #e0e0e0",
                borderRadius: 0,
                boxShadow: "none",
              }}
            />
          </Form.Group>
        
          <Form.Group className="mb-3">
            <Form.Select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              style={{
                border: "none",
                borderBottom: "1px solid #e0e0e0",
                borderRadius: 0,
                boxShadow: "none",
              }}
            >
              <option value="">Género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </Form.Select>
          </Form.Group>
          <Button
            className="w-100 rounded-pill fw-semibold"
            style={{ backgroundColor: "#2D2D2D", borderColor: "#2D2D2D" }}
            onClick={handleCompleteProfile}
          >
            Comenzar
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterPage;
