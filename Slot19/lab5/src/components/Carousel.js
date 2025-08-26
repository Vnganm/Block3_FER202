import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import "../styles.css";

const Carousel = () => {
  const { dark } = useTheme();
  const images = [
    { src: "/images/uthappizza.png", alt: "Uthappizza" },
    { src: "/images/zucchipakoda.jpg", alt: "Zucchipakoda" },
    { src: "/images/vadonut.png", alt: "Vadonut" },
  ];

  const [index, setIndex] = useState(0);
  const [autoPlay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-fullwidth"> {/* Wrapper để control width */}
      <BootstrapCarousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={autoPlay ? 3000 : null}
        controls
        indicators
        variant={dark ? "dark" : "light"}
      >
        {images.map((img, idx) => (
          <BootstrapCarousel.Item key={idx}>
            <img
              className="d-block w-100 carousel-image"
              src={img.src}
              alt={img.alt}
              style={{ 
                height: "250px", 
                objectFit: "cover",
                width: "100%"
              }}
            />
            <BootstrapCarousel.Caption className="carousel-caption-custom">
              <h3 className="carousel-title">{img.alt}</h3>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;