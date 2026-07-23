import IconoMoneda from "../iconos/IconoMoneda";
import SlideCard from "../SlideCard";

const CardMoneda = ({ monedas, isActive, onClick, onNext }) => (
  <SlideCard isActive={isActive} onClick={onClick} onNext={onNext}>
    <IconoMoneda />
    <h3 className="fw-bold mt-2">Ganaste {monedas} monedas</h3>
    <p className="text-muted small mt-2">
      Qué bueno que las acciones formativas te traigan algo bueno
    </p>
  </SlideCard>
);

export default CardMoneda;