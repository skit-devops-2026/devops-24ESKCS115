import { useState, useEffect } from "react";

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []); 
  return (
    <section className={`hero ${isVisible ? "is-visible" : ""}`}>
      <div className="hero-mark">
        <span>MR</span>
        <span>14</span>
      </div>

      <p className="hero-tagline">
        words have a pulse.
      </p>

      <a href="#journal" className="hero-enter">
  <span>scroll to enter</span>
  <span className="hero-arrow">↓</span>
</a>
    </section>
  );
}

export default Hero;