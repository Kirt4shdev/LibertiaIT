import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Moon, Sun, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';
import { navigation, siteContent } from '../data/content';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, cycleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getThemeIcon = () => {
    switch(theme) {
      case 'light': return <Sun style={{ width: '1.25rem', height: '1.25rem' }} />;
      case 'dark-glass': return <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />;
      default: return <Moon style={{ width: '1.25rem', height: '1.25rem' }} />;
    }
  };

  const getNavbarBackground = () => {
    if (!scrolled && !isOpen) return 'transparent';
    
    switch(theme) {
      case 'light':
        return 'rgba(255, 255, 255, 0.95)';
      case 'dark-glass':
        return 'rgba(15, 12, 29, 0.85)';
      default:
        return 'rgba(10, 10, 15, 0.95)';
    }
  };

  const getNavbarBorder = () => {
    if (!scrolled && !isOpen) return 'none';
    
    switch(theme) {
      case 'light':
        return '1px solid rgba(0, 0, 0, 0.06)';
      case 'dark-glass':
        return '1px solid rgba(255, 255, 255, 0.1)';
      default:
        return '1px solid rgba(255, 255, 255, 0.05)';
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          background: getNavbarBackground(),
          backdropFilter: (scrolled || isOpen) ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: (scrolled || isOpen) ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: getNavbarBorder(),
          boxShadow: (scrolled || isOpen)
            ? theme === 'dark-glass' 
              ? '0 4px 30px rgba(0, 0, 0, 0.3)' 
              : '0 4px 30px rgba(0, 0, 0, 0.1)' 
            : 'none'
        }}
      >
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.25rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4.5rem'
          }}>
            {/* Logo */}
            <Link 
              to="/"
              className="navbar-logo"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', zIndex: 101 }}
            >
              <img 
                src="/libertia_it_logo_fondos_claros-2.webp" 
                alt="Libertia IT" 
                style={{
                  height: '2.5rem',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {navigation.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="navbar-link"
                    style={{
                      position: 'relative',
                      padding: '0.5rem 1rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="navbar-link"
                    style={{
                      position: 'relative',
                      padding: '0.5rem 1rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={cycleTheme}
                className="navbar-icon-btn"
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.75rem',
                  background: theme === 'dark-glass' ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-tertiary)',
                  border: theme === 'dark-glass' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={`Tema: ${themes[theme].name}`}
              >
                {getThemeIcon()}
              </button>

              <a
                href={`tel:+34${siteContent.company.phone.replace(/\s/g, '')}`}
                className="phone-link navbar-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  background: theme === 'dark-glass' ? 'rgba(255, 255, 255, 0.08)' : 'var(--bg-tertiary)',
                  border: theme === 'dark-glass' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <Phone style={{ width: '1rem', height: '1rem' }} />
                <span style={{ fontWeight: 500 }}>{siteContent.company.phone}</span>
              </a>

              <a
                href="#contact"
                className="btn-primary navbar-cta"
                style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem' }}
              >
                Contactar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-nav" style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
              <motion.button
                onClick={cycleTheme}
                whileTap={{ scale: 0.9 }}
                style={{
                  padding: '0.625rem',
                  borderRadius: '0.75rem',
                  background: theme === 'dark-glass' ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-tertiary)',
                  border: theme === 'dark-glass' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {getThemeIcon()}
              </motion.button>
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                style={{
                  padding: '0.625rem',
                  borderRadius: '0.75rem',
                  background: isOpen 
                    ? 'linear-gradient(135deg, #22d3ee, #2563eb)' 
                    : theme === 'dark-glass' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'var(--bg-tertiary)',
                  border: theme === 'dark-glass' && !isOpen ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                  color: isOpen ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                {isOpen 
                  ? <X style={{ width: '1.5rem', height: '1.5rem' }} /> 
                  : <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
                }
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: theme === 'dark-glass' 
                ? 'rgba(15, 12, 29, 0.98)' 
                : theme === 'light'
                  ? 'rgba(255, 255, 255, 0.98)'
                  : 'rgba(10, 10, 15, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            <nav style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '0.5rem',
              width: '100%',
              maxWidth: '400px'
            }}>
              {navigation.map((item, index) => (
                item.isRoute ? (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    style={{ width: '100%' }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="mobile-menu-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '1.25rem 2rem',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        borderRadius: '1rem',
                        background: 'transparent'
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => setIsOpen(false)}
                    className="mobile-menu-link"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      padding: '1.25rem 2rem',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      borderRadius: '1rem',
                      background: 'transparent'
                    }}
                  >
                    {item.name}
                  </motion.a>
                )
              ))}
              
              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navigation.length * 0.08 + 0.1, duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="btn-primary"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  marginTop: '1.5rem',
                  padding: '1.25rem 2rem',
                  fontSize: '1.25rem'
                }}
              >
                Contactar ahora
                <ArrowRight style={{ width: '1.5rem', height: '1.5rem' }} />
              </motion.a>

              {/* Phone number */}
              <motion.a
                href={`tel:+34${siteContent.company.phone.replace(/\s/g, '')}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '2rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '1rem'
                }}
              >
                <Phone style={{ width: '1.25rem', height: '1.25rem' }} />
                +34 {siteContent.company.phone}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav, .desktop-actions { display: flex; }
        .mobile-nav { display: none; }
        .phone-link { display: flex; }
        
        /* Fast hover animations for navbar */
        .navbar-logo {
          transition: transform 0.15s ease;
        }
        .navbar-logo:hover {
          transform: scale(1.05);
        }
        .navbar-logo:active {
          transform: scale(0.95);
        }
        
        .navbar-link {
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .navbar-link:hover {
          color: #22d3ee !important;
          transform: translateY(-2px);
        }
        .navbar-link:active {
          transform: translateY(0);
        }
        
        .navbar-icon-btn {
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .navbar-icon-btn:hover {
          transform: scale(1.15) rotate(15deg);
        }
        .navbar-icon-btn:active {
          transform: scale(0.9);
        }
        
        .navbar-btn {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .navbar-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .navbar-btn:active {
          transform: translateY(0) scale(0.98);
        }
        
        .navbar-cta {
          transition: transform 0.15s ease, box-shadow 0.15s ease !important;
        }
        .navbar-cta:hover {
          transform: translateY(-3px) scale(1.05) !important;
        }
        .navbar-cta:active {
          transform: translateY(0) scale(0.95) !important;
        }
        
        .mobile-menu-link {
          transition: all 0.15s ease;
        }
        .mobile-menu-link:hover {
          background: var(--bg-secondary);
          color: #22d3ee !important;
          transform: scale(1.02);
        }
        .mobile-menu-link:active {
          transform: scale(0.98);
        }
        
        @media (max-width: 1024px) {
          .phone-link { display: none !important; }
        }
        
        @media (max-width: 768px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-nav { display: flex !important; }
          .logo-text { font-size: 1.1rem !important; }
        }
      `}</style>
    </>
  );
}
