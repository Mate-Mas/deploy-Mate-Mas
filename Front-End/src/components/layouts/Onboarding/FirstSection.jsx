import './firstSection.css';

function FirstSection({ onStart }) {
  return (
   
    <div className="container">
      <header>MATE+</header>
      <div className="page">
        <div className="title2">
          Para personalizar tu experiencia te vamos a hacer un par de preguntas
        </div>
        <div className="field btns central-btn">
          <button type="button" className="option-btn" onClick={onStart}>
            Empecemos
          </button>
        </div>
      </div>
    </div>
  
  );
}
export default FirstSection;
