import React, { useState, useRef } from "react";
import { WhiteCard } from "../WhiteCard";
import { RiskAnalysis } from "../RiskAnalysis";
import { TeamCard } from "../TeamCard";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [draggedDistance, setDraggedDistance] = useState(0);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX); // Pega a posição inicial do mouse
    setDraggedDistance(0); // Resetando a distância arrastada
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = e.clientX - startX; // Distância percorrida pelo mouse
    setDraggedDistance(distance);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Invertendo a lógica: arrasto à direita vai para o próximo slide, arrasto à esquerda vai para o anterior
    if (draggedDistance < -100) {
      nextSlide(); // Retroceder slide
    } else if (draggedDistance > 100) {
      prevSlide(); // Avançar slide
    }

    // Resetar a distância do arrasto
    setDraggedDistance(0);
  };

  return (
    <div
      ref={carouselRef}
      className="w-[100%] h-[100%] mb-10"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Garantir que se o mouse sair do componente, o arrasto pare
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab', // Alterar o cursor durante o arrasto
      }}
    >
      {/* Área de Slides */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {/* Slide fixo com dados dinâmicos */}
              <Slide data={slide} />
            </div>
          ))}
        </div>

        {/* Botões de Navegação */}
      </div>

      {/* Indicadores horizontais (bolinhas deitadas) */}
      {slides.length <= 1 ? (
        <></>
      ) : (
        <div className="flex justify-center mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${index === currentIndex ? "bg-[#2D60FF]" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente Slide fixo
const Slide = ({ data }) => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col justify-center flex-1 w-full">
      <div className="flex gap-0 items-center ">
        <div className="h-[460px] gap-6 w-full flex">
          <div className="w-full h-full">
            <WhiteCard data={data} />
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center gap-3">
            <div>
              <RiskAnalysis data={data} />
            </div>
            <div>
              <TeamCard data={data.equipe} />
            </div>
            <div className="flex justify-end w-[80%]">
              <Button
                onClick={() => navigate.push(`/Platform/ProjectInformation/${data.id}`)}
                textbutton={"Ver mais detalhes"}
                className="flex w-[170px] h-[35px] text-[14px] hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;