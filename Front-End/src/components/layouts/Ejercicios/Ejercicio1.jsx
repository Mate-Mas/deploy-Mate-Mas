import { useState, useEffect, useRef } from 'react';
import ButtonContinue from '../../ui/ButtonContinue/ButtonContinue';
import { MascotWidget } from '../../../mascotas/components/MascotWidget';
import './Ejercicio.css';
import HeaderDesafio from '../Desafios/headerDesafio/HeaderDesafio';
import HeaderMate from '../HeaderMate/HeaderMate';
import { useMascotContext } from '../../../mascotas/core/MascotProvider';

function EjercicioInput({
  pregunta,
  imagenUrl,
  respuestaCorrecta,
  onContinue,
  mascotPosition = 'bottom-left',
  mascotSize = 160,
  maxIntentos = 3,
}) {
  const isMobile = window.innerWidth <= 900;
  const [inputValue, setInputValue] = useState('');
  const [resultado, setResultado] = useState(null);
  const [intentos, setIntentos] = useState(0);
  const [yaDioPista, setYaDioPista] = useState(false);
  
  // 👇 Referencia para saber si el componente está montado
  const isMounted = useRef(true);

  const { say, react, setState } = useMascotContext();

  // 🎯 Dar pista después de varios intentos fallidos
  useEffect(() => {
    if (resultado === 'incorrecto' && intentos >= maxIntentos && !yaDioPista) {
      setYaDioPista(true);
      say('hint');
      setState('thinking');

      const timer = setTimeout(() => {
        if (isMounted.current) {
          setState('idle');
        }
      }, 3000);

      return () => {
        clearTimeout(timer);
        if (isMounted.current) {
          setState('idle');
        }
      };
    }
  }, [intentos, resultado, say, setState, yaDioPista, maxIntentos]);

  // 🔄 Resetear estado cuando cambia la pregunta
  useEffect(() => {
    setInputValue('');
    setResultado(null);
    setIntentos(0);
    setYaDioPista(false);
    // Resetear mascota a idle
    setState('idle');
    
    return () => {
      isMounted.current = false;
    };
  }, [pregunta, respuestaCorrecta, setState]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const verificarRespuesta = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!inputValue) {
      say('thinking_prompt');
      return;
    }

    if (resultado === 'correcto') {
      // Ya respondió correctamente, no hacer nada
      return;
    }

    const isCorrect = Number(inputValue) === Number(respuestaCorrecta);

    if (isCorrect) {
      setResultado('correcto');
      // 🎉 Celebramos con animación y mensaje custom
      react('celebration', '🎉 ¡Perfecto! ¡Sos un genio!');
    } else {
      setResultado('incorrecto');
      setIntentos(prev => prev + 1);

      // 😅 Mensajes según el intento
      const mensajesError = [
        '❌ Intentálo de nuevo. ¡Vos podés!',
        '❌ Casi... ¡Dale otra oportunidad!',
        '❌ No te rindas, ¡pensá con calma!',
        '❌ ¡Un poco más! Confío en vos.'
      ];

      const index = Math.min(intentos, mensajesError.length - 1);
      react('sad', mensajesError[index]);
    }
  };

  // 🔄 Función para avanzar manualmente (si es necesario)
  const handleContinue = () => {
    if (resultado === 'correcto') {
      // Resetear estado antes de avanzar
      setResultado(null);
      setInputValue('');
      setIntentos(0);
      setYaDioPista(false);
      setState('idle');
      onContinue();
    }
  };

  return (
    <div className="ejercicio-page-container">
      <MascotWidget
        size={isMobile ? 90 : mascotSize}
        position={mascotPosition}
        showBubble={true}
      />

      <main className="ejercicio-page-content">
        <HeaderMate />
        <HeaderDesafio progreso={100} />

        <div className="ejercicio-grid">
          <div className="ejercicio-col-left">
            <h2 className="ejercicio-pregunta">{pregunta}</h2>

            <form onSubmit={verificarRespuesta} className="ejercicio-form">
              <div className="input-container">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={resultado === 'correcto' ? '✅ ¡Bien hecho!' : 'Escribí tu respuesta...'}
                  value={inputValue}
                  onChange={handleInputChange}
                  className={`ejercicio-input ${resultado === 'correcto' ? 'ejercicio-input--success' : ''}`}
                  autoFocus
                  disabled={resultado === 'correcto'}
                />
                <button 
                  type="submit" 
                  className={`button-check ${resultado === 'correcto' ? 'button-check--disabled' : ''}`}
                  disabled={resultado === 'correcto'}
                >
                  {resultado === 'correcto' ? '✅' : 'Comprobar'}
                </button>
              </div>
            </form>
          </div>

          <div className="ejercicio-col-right">
            <div className="card-imagen-wrapper">
              <img
                src={imagenUrl}
                alt="Material del ejercicio"
                className="ejercicio-imagen"
              />
            </div>
          </div>
        </div>

        <div className="ejercicio-footer">
          <ButtonContinue
            onClick={handleContinue} // 👈 Usar handler personalizado
            disabled={resultado !== 'correcto'}
          />
        </div>
      </main>
    </div>
  );
}

export default EjercicioInput;