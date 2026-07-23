import IconoConfeti from "../iconos/IconoConfeti";
import SlideCard from "../SlideCard";

const CardLeccion = ({ xp, porcentaje, isActive, onClick, onNext }) => (
  <SlideCard isActive={isActive} onClick={onClick} onNext={onNext}>
    <IconoConfeti />
    <h3 className="fw-bold mt-2">Completaste la lección</h3>
    <div className="d-flex justify-content-center gap-3 my-3">
      {/* Experiencia */}
      <div
        className="rounded-3 p-3 text-center"
        style={{ backgroundColor: "#EAF6FF", minWidth: 130 }}
      >
        <div className="d-flex align-items-center justify-content-center gap-2">
          <img src="/leccion/flecha.png" alt="flecha" style={{ width: 36, height: 36 }} />
          <span className="fw-bold fs-3">{xp}</span>
        </div>
        <div className="text-muted small mt-2">Experiencia Total</div>
      </div>

      {/* Correctas */}
      <div
        className="rounded-3 p-3 text-center"
        style={{ backgroundColor: "#EAF6FF", minWidth: 130 }}
      >
        <div className="d-flex align-items-center justify-content-center gap-2">
          <img src="/leccion/check.png" alt="check" style={{ width: 36, height: 36 }} />
          <span className="fw-bold fs-3">{porcentaje}%</span>
        </div>
        <div className="text-muted small mt-2">Correctas</div>
      </div>
    </div>
  </SlideCard>
);

export default CardLeccion;