import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Twitter, Github, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Function to handle navigation to sections on main page
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    
    // If we're not on the main page, navigate there first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSectionByid(sectionId);
      }, 100);
    } else {
      scrollToSectionByid(sectionId);
    }
    
    closeMenu();
  };

  const scrollToSectionByid = (sectionId) => {
    const isMobile = window.innerWidth <= 768;
    let scrollPosition = 0;
    
    switch(sectionId) {
      case 'Home':
        scrollPosition = 0;
        break;
      case 'About':
        scrollPosition = window.innerHeight + 1000;
        break;
      case 'Contact':
        scrollPosition = isMobile 
          ? window.innerHeight * 4 + 1000
          : window.innerHeight * 2 + 1000;
        break;
      default:
        scrollPosition = 0;
    }
    
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    navigate('/shop');
    closeMenu();
  };

  return (
    <>
      <header className="fixed w-full z-50 py-4 bg-transparent">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-black font-bold text-xl">LASO</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="bg-white rounded-full px-6 py-2 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-6">
                <NavLink href="#Home" onClick={(e) => scrollToSection('Home', e)}>Home</NavLink>
                <NavLink href="#About" onClick={(e) => scrollToSection('About', e)}>About</NavLink>
                <NavLink href="#Contact" onClick={(e) => scrollToSection('Contact', e)}>Contact</NavLink>
                <NavLink href="/shop" onClick={handleShopClick}>Shop</NavLink>
              </div>
            </div>
          </nav>
          
          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <SocialIcon><Linkedin size={18} /></SocialIcon>
            <SocialIcon><Twitter size={18} /></SocialIcon>
            <SocialIcon><Github size={18} /></SocialIcon>
          </div>
          
          {/* Hamburger Button */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-8 relative z-60"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span 
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-0' : 'mb-1.5'
              }`}
            ></span>
            <span 
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                menuOpen ? 'opacity-0' : 'mb-1.5'
              }`}
            ></span>
            <span 
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-0.5' : ''
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-6">
            <MobileNavLink href="#Home" onClick={(e) => scrollToSection('Home', e)}>Home</MobileNavLink>
            <MobileNavLink href="#About" onClick={(e) => scrollToSection('About', e)}>About</MobileNavLink>
            <MobileNavLink href="#Contact" onClick={(e) => scrollToSection('Contact', e)}>Contact</MobileNavLink>
            <MobileNavLink href="/shop" onClick={handleShopClick}>Shop</MobileNavLink>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-6 mt-8">
            <SocialIcon>
              <Linkedin size={20} />
            </SocialIcon>
            <SocialIcon>
              <Twitter size={20} />
            </SocialIcon>
            <SocialIcon>
              <Github size={20} />
            </SocialIcon>
          </div>

          {/* Logo at bottom */}
          <div className="absolute bottom-8">
            <span className="text-black font-bold text-2xl opacity-20">LASO</span>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <span className="text-black font-bold text-8xl">LASO</span>
        </div>
      </div>

      {/* Backdrop for closing menu when clicking outside */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-black text-sm font-medium hover:text-red-600 transition-colors duration-200 cursor-pointer"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-black text-2xl font-medium hover:text-red-600 transition-colors duration-200 text-center cursor-pointer"
  >
    {children}
  </a>
);

const SocialIcon = ({ children }) => (
  <a
    href="#"
    className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 hover:border-red-600 hover:text-red-600 transition-colors duration-200"
  >
    {children}
  </a>
);

export default Navbar;