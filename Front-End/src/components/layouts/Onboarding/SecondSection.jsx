import { useState } from 'react';
import './FirstSection.css';

const initialFormState = {
  nombre: '',
  apellidos: '',
  idUser: 'USER_ID_TEMPORAL', // Aquí inyectar el ID real del usuario cuando lo tengas
  desafio: '',
  edad: '',
  sentimiento: '',
};

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const stepLabels = ['Paso 1', 'Paso 2', 'Paso 3'];

  // Función genérica para guardar la selección de los botones interactivos
  const handleSelectOption = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < stepLabels.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    // Obtenemos la fecha actual en el momento exacto del envío
    const fechaActual = new Date().toISOString();

    const dataToSubmit = {
      ...formData,
      fechaRespuesta: fechaActual,
      nombre: `${formData.nombre} ${formData.apellidos}`.trim()
    };

    try {
      const response = await fetch('/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar los datos');
      }

      setStatus({ loading: false, error: '', success: 'Formulario enviado correctamente.' });
      setCurrentStep(stepLabels.length - 1);
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Error al enviar los datos', success: '' });
    }
  };

  // Listas de opciones fijas para renderizar limpiamente en las columnas
  const opcionesDesafios = [
    'Porcentajes',
    'Finanzas cotidianas',
    'Fracciones y proporciones',
    'Números básicos',
    'Estimulación cognitiva'
  ];

  const opcionesSentimientos = ['Relajado', 'Ansioso', 'Confundido', 'Estresado'];

  const opcionesEdades = ['20 a 30 años', '30 a 50 años', '+ 50 años'];

  return (
    <div className="container">
      <header>MATE+</header>

      {/* Barra de progreso con clases dinámicas para las líneas conectoras */}
      <div className="progress-bar">
        {stepLabels.map((label, index) => (
          <div 
            className={`step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`} 
            key={label}
          >
            <p className={index <= currentStep ? 'active' : ''}>{label}</p>
            <div className={`bullet ${index <= currentStep ? 'active' : ''}`}>
              <span>{index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="form-outer">
        <form onSubmit={handleSubmit} style={{ marginLeft: `-${currentStep * 100}%` }}>
          
          {/* PASO 1: DESAFÍOS */}
          <div className="page">
            <div className="title">¿Qué desafío de tu vida diaria te gustaría dominar primero?</div>
            <div className="options-grid">
              {opcionesDesafios.map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  className={`option-btn ${formData.desafio === opcion ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('desafio', opcion)}
                >
                  {opcion}
                </button>
              ))}
            </div>

            <div className="field btns central-btn">
              <button 
                type="button" 
                className="next" 
                onClick={nextStep} 
                disabled={!formData.desafio}
              >
                Siguiente
              </button>
            </div>
          </div>

          {/* PASO 2: SENTIMIENTOS */}
          <div className="page">
            <div className="title">¿Cómo te sentís normalmente cuando tenés que hacer cuentas frente a otras personas?</div>
            <div className="options-grid">
              {opcionesSentimientos.map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  className={`option-btn ${formData.sentimiento === opcion ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('sentimiento', opcion)}
                >
                  {opcion}
                </button>
              ))}
            </div>

            <div className="field btns">
              <button type="button" className="prev" onClick={prevStep}>
                Atrás
              </button>
              <button 
                type="button" 
                className="next" 
                onClick={nextStep} 
                disabled={!formData.sentimiento}
              >
                Siguiente
              </button>
            </div>
          </div>

          {/* PASO 3: EDAD */}
          <div className="page">
            <div className="title">¿En qué rango de edad te encontrás?</div>
            <div className="options-grid full-width-options">
              {opcionesEdades.map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  className={`option-btn ${formData.edad === opcion ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('edad', opcion)}
                >
                  {opcion}
                </button>
              ))}
            </div>
 
            <div className="field btns">
              <button type="button" className="prev" onClick={prevStep}>
                Atrás
              </button>
              <button type="submit" className="submit" disabled={status.loading || !formData.edad}>
                {status.loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {status.error && <p className="status-msg error">{status.error}</p>}
      {status.success && <p className="status-msg success">{status.success}</p>}
    </div>
  );
}

export default Onboarding;