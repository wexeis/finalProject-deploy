import React, { useEffect } from 'react';
import './Parallax.css'; // Import the CSS file for styling

const Parallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallaxLayers = document.querySelectorAll('.parallax-layer');

      parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const offset = scrollTop * speed;

        layer.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container">
      <div className="parallax-layer" data-speed="0.2"></div>
      <div className="parallax-layer" data-speed="0.5"></div>
      <div className="parallax-layer" data-speed="1"></div>
    </div>
  );
};

export default Parallax;
