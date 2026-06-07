import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import FirstSection from '../components/landing/FirstSection/FirstSection';
import SecondSection from '../components/landing/SecondSection/SecondSection';
import ThirdSection from '../components/landing/ThirdSection/ThirdSection';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/header/Header';
const Landing = () => {
    const navigate = useNavigate();
//p-0 m-0 overflow-auto overflow-x-hidden
    return (
        <Container fluid className="p-0 m-0">
            <Header />
            <FirstSection navigate={navigate} />
            <SecondSection />
            <ThirdSection />
            <Footer />
        </Container>
    );
}

export default Landing;