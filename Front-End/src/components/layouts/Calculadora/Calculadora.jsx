import './calculadora.css';
import imagenFondo from '../../../assets/fondo_consejo.png';
import { ReactCalculator } from 'react-calculator-ts';

function ModalCalculadora({
    onClose,
    isOpen
}) {
    // Si no está activo el modal, no renderiza nada en el árbol del DOM
    if (!isOpen) return null;

    return (
        <div className="modal-ayuda-overlay" onClick={onClose}>
            <div
                className="modal-ayuda-content"
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundImage: `url(${imagenFondo})`, paddingTop: '80px', paddingBottom: '20px' }}
            >
                <button className="modal-ayuda-close-btn" onClick={onClose} aria-label="Cerrar modal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <ReactCalculator
                    type="SCIENTIFIC"                 // Choose between 'SIMPLE', 'SCIENTIFIC', 'GRAPHING', 'PROGRAMMER'
                    numberButtonColor="#34d399"       // Optional: Green color for number buttons
                    operationButtonColor="#f97316"    // Optional: Orange color for operation buttons
                    clearButtonColor="#3b82f6"        // Optional: Blue color for the clear button
                    equalButtonColor="#10b981"        // Optional: Green color for the equal button
                    scientificButtonColor="#384B70"   // Optional: Blue-gray color for scientific function buttons
                    style={{ height: '100%', maxWidth: '400px', margin: '0 auto' }} // Optional: Center the calculator and set a max width
                />
            </div>
        </div>
    );
}

export default ModalCalculadora;