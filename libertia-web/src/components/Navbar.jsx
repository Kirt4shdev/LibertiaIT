import { useState, useEffect } from 'react';
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
            <motion.a 
              href="#"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', zIndex: 101 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #22d3ee, #2563eb)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>L</span>
              </div>
              <span className="logo-text" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Libertia<span style={{ color: '#22d3ee' }}>IT</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ color: '#22d3ee' }}
                  style={{
                    position: 'relative',
                    padding: '0.5rem 1rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <motion.button
                onClick={cycleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
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
              </motion.button>

              <motion.a
                href={`tel:+34${siteContent.company.phone.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="phone-link"
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
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem' }}
              >
                Contactar
              </motion.a>
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
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  onClick={() => setIsOpen(false)}
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
                    background: 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    background: theme === 'dark-glass' 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'var(--bg-secondary)',
                    color: '#22d3ee'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
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
