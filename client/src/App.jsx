import Canvas from "./canvas"
import About from "./pages/About"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Customizer from "./pages/Customizer"
import { useSnapshot } from 'valtio';
import state from './store';
import React, { useEffect, useState, useRef } from 'react';
import { Footer } from './components/';

function App() {
  const snap = useSnapshot(state);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1260);
  const [aboutOffset, setAboutOffset] = useState(0);
  const aboutRef = useRef(null);

  // Set canvas offset (Valtio)
  useEffect(() => {
    state.canvasOffsetRight = snap.intro;
  }, [snap.intro]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1260);
      updateAboutOffset();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically calculate About section height + offset
  const updateAboutOffset = () => {
    if (aboutRef.current) {
      const height = aboutRef.current.getBoundingClientRect().height;
      setAboutOffset(window.innerHeight + height); // About starts at 100vh
    }
  };

  useEffect(() => {
    updateAboutOffset();
  }, [snap.intro]);

  // Scroll-based canvas animation
  const maxScroll = window.innerHeight;
  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  const homeTransform = `translateX(${-scrollProgress * 400}%)`;

  // Canvas transforms
  let canvasPosition = 'fixed';
  let canvasTop = 0;
  let canvasTransform = isMobile
    ? `translateX(0%)` // Keep centered on mobile
    : `translateX(${1 - (scrollProgress * 60)}%)`;

  const aboutSectionStart = window.innerHeight + 1000;
  if (scrollY >= aboutSectionStart) {
    canvasPosition = 'absolute';
    canvasTop = aboutSectionStart;
  }

  return (
    <main className="app transition-all ease-in-out" style={{ minHeight: '300vh' }}>
      {/* Canvas - animates with scroll, then becomes static */}
      {snap.intro ? (
        <div
          style={{
            position: canvasPosition,
            top: canvasTop,
            right: 0,
            width: '100%',
            height: '100vh',
            transform: canvasTransform,
            transition: scrollY < aboutSectionStart ? 'transform 0.1s ease-out' : 'none',
            zIndex: 10
          }}
        >
          <Canvas />
        </div>
      ) : (
        <div>
          <Canvas />
        </div>
      )}

      {/* Home page with scroll-based transform */}
      {snap.intro && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            transform: homeTransform,
            transition: 'transform 0.1s ease-out',
            zIndex: 20
          }}
        >
          <Home />
        </div>
      )}

      {/* About section (absolute, starts at 100vh) */}
      {snap.intro && (
        <div
          ref={aboutRef}
          className={`absolute top-[100vh] right-0 min-h-screen z-20 w-full xlplus:w-[65%] p-4 ${
            isMobile ? 'bg-white bg-opacity-95' : 'bg-white xlplus:bg-transparent'
          }`}
        >
          <About />
        </div>
      )}

      {/* Contact section - placed just below About */}
      {snap.intro && (
        <div
          style={{
            position: 'absolute',
            top: `${aboutOffset}px`,
            left: 0,
            width: '100%',
            zIndex: 5
          }}
        >
          <Contact />
        </div>
      )}

      {/* Footer section - placed below Contact */}
      {snap.intro && (
        <div
          style={{
            position: 'absolute',
            top: `${aboutOffset+ 600}px`,
            left: 0,
            width: '100%',
            minHeight: '10vh',
            zIndex: 1,
            backgroundColor: '#eaeaea'
          }}
        >
          <Footer />
        </div>
      )}

      <Customizer />
    </main>
  );
}

export default App;
