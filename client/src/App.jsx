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
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const aboutRef = useRef(null);

  // Set canvas offset (Valtio)
  useEffect(() => {
    state.canvasOffsetRight = snap.intro;
  }, [snap.intro]);

  // Mobile viewport height fix
  useEffect(() => {
    const setVH = () => {
      setViewportHeight(window.innerHeight);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

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
      setAboutOffset(viewportHeight + height); // Use actual viewport height
    }
  };

  useEffect(() => {
    updateAboutOffset();
  }, [snap.intro, viewportHeight]);

  // Scroll-based canvas animation
  const maxScroll = viewportHeight;
  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  const homeTransform = `translateX(${-scrollProgress * 400}%)`;

  // Canvas transforms
  let canvasPosition = 'fixed';
  let canvasTop = 0;
  let canvasTransform = isMobile
    ? `translateX(0%)` // Keep centered on mobile
    : `translateX(${1 - (scrollProgress * 60)}%)`;

  const aboutSectionStart = viewportHeight + 1000;
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
            height: `${viewportHeight}px`,
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
            height: `${viewportHeight}px`,
            transform: homeTransform,
            transition: 'transform 0.1s ease-out',
            zIndex: 20
          }}
        >
          <Home />
        </div>
      )}

      {/* About section - positioned at actual viewport height */}
      {snap.intro && (
        <div
          ref={aboutRef}
          style={{
            position: 'absolute',
            top: `${viewportHeight}px`,
            right: 0,
            minHeight: `${viewportHeight}px`,
            zIndex: 30,
            width: '100%',
            backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: isMobile ? 'blur(10px)' : 'none',
            padding: '16px'
          }}
          className={`${isMobile ? '' : 'xlplus:w-[65%]'}`}
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
            zIndex: 25
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
            top: `${aboutOffset + 600}px`,
            left: 0,
            width: '100%',
            minHeight: '10vh',
            zIndex: 20,
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