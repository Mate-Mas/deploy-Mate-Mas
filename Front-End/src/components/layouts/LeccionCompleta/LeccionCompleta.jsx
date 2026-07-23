import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMate from "../HeaderMate/HeaderMate";
import CardRacha from "./Cards/CardRacha";
import CardLeccion from "./Cards/CardLeccion";
import CardMoneda from "./Cards/CardMoneda";

const TOTAL_SLIDES = 3;

const DesafioCompletado = ({
  racha = 1,
  xp = 20,
  porcentaje = 85,
  monedas = 10,
}) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (index < TOTAL_SLIDES - 1) {
      setIndex((prev) => prev + 1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <HeaderMate />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#8FD8FD",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 40,
          paddingBottom: 40,
          overflow: "hidden",
        }}
      >
        {/* Carrusel */}
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: 16,
              transform: `translateX(calc(50vw - 160px - ${index * 336}px))`,
              transition: "transform 0.4s ease",
            }}
          >
            <CardRacha
              racha={racha}
              isActive={index === 0}
              onClick={() => setIndex(0)}
              onNext={handleNext}
            />

            <CardLeccion
              xp={xp}
              porcentaje={porcentaje}
              isActive={index === 1}
              onClick={() => setIndex(1)}
              onNext={handleNext}
            />

            <CardMoneda
              monedas={monedas}
              isActive={index === 2}
              onClick={() => setIndex(2)}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DesafioCompletado;