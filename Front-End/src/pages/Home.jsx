import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Bienvenido a la Página Principal</h1>
            <p>Esta es la página de inicio de nuestra aplicación.</p>
            <Link to="/dashboard">Ir al Dashboard</Link>
            <Link to="/login">Iniciar Sesión</Link>
        </div>
    );
}

export default Home;