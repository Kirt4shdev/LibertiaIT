import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { siteContent } from '../data/content';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % siteContent.testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % siteContent.testimonials.length);
  };

  const prev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + siteContent.testimonials.length) % siteContent.testimonials.length);
  };

  return (
    <section id="testimonials" style={{ 
      position: 'relative', 
      padding: '6rem 0', 
      overflow: 'hidden' 
    }}>
      {/* Background - subtle gradient overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '0 1.5rem' 
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            borderRadius: '9999px', 
            background: 'rgba(168, 85, 247, 0.1)', 
            color: '#c084fc', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            marginBottom: '1rem' 
          }}>
            Testimonios
          </span>
          <h2 style={{ 
            fontSize: 'clamp(1.875rem, 4vw, 3rem)', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Lo que dicen{' '}
            <span className="gradient-text">nuestros clientes</span>
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '40rem', 
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Más de 20 años creando relaciones de confianza con empresas que no pueden permitirse interrupciones.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'relative' }}
            >
              <div className="glass-card" style={{ 
                padding: '3rem', 
                textAlign: 'center',
                position: 'relative'
              }}>
                {/* Quote Icon */}
                <div style={{
                  position: 'absolute',
                  top: '-1.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Quote style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                </div>

                {/* Stars */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '0.25rem', 
                  marginBottom: '1.5rem',
                  marginTop: '1rem'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} style={{ width: '1.25rem', height: '1.25rem', color: '#fbbf24', fill: '#fbbf24' }} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote style={{ 
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', 
                  color: 'var(--text-primary)', 
                  lineHeight: 1.6, 
                  marginBottom: '2rem',
                  fontStyle: 'italic'
                }}>
                  "{siteContent.testimonials[current].quote}"
                </blockquote>

                {/* Author */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                      {siteContent.testimonials[current].name.charAt(0)}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {siteContent.testimonials[current].name}
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>
                    {siteContent.testimonials[current].role}
                  </div>
                  <div style={{ color: '#22d3ee', fontWeight: 500 }}>
                    {siteContent.testimonials[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginTop: '2rem' 
          }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              style={{
                padding: '0.75rem',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronLeft style={{ width: '1.25rem', height: '1.25rem' }} />
            </motion.button>

            {/* Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {siteContent.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrent(index);
                  }}
                  style={{
                    height: '0.5rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: index === current ? '2rem' : '0.5rem',
                    background: index === current 
                      ? 'linear-gradient(135deg, #a855f7, #ec4899)' 
                      : 'var(--bg-tertiary)'
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              style={{
                padding: '0.75rem',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </motion.button>
          </div>
        </div>

        {/* Client Logos - Animated Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '5rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              ✦ Confían en nosotros ✦
            </span>
          </div>

          {/* Marquee Container */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem 0',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}>
            <div style={{
              display: 'flex',
              gap: '3rem',
              animation: 'marquee 25s linear infinite',
              width: 'max-content'
            }}>
              {/* First set */}
              {[
                { name: 'Julián de Castro', subtitle: 'Avanza', years: '+10 años' },
                { name: 'BUSQUETS', subtitle: 'Despacho Legal', years: '+8 años' },
                { name: 'CONCAES', subtitle: 'Gestión', years: '+5 años' },
                { name: 'DILUS', subtitle: 'Innovación', years: '+7 años' },
                { name: 'NextMune', subtitle: 'Farmacéutica', years: '+20 años' },
                { name: 'Julián de Castro', subtitle: 'Avanza', years: '+10 años' },
                { name: 'BUSQUETS', subtitle: 'Despacho Legal', years: '+8 años' },
                { name: 'CONCAES', subtitle: 'Gestión', years: '+5 años' },
                { name: 'DILUS', subtitle: 'Innovación', years: '+7 años' },
                { name: 'NextMune', subtitle: 'Farmacéutica', years: '+20 años' },
              ].map((company, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    padding: '1.5rem 2rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    minWidth: '200px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  className="client-card"
                >
                  {/* Glow effect on hover */}
                  <div style={{
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: '1rem',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1
                  }} className="card-glow" />
                  
                  {/* Years badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-0.75rem',
                    right: '1rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    {company.years}
                  </div>

                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                  }}>
                    {company.name}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {company.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats below */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            {[
              { value: '50+', label: 'Empresas activas' },
              { value: '15+', label: 'Años de media' },
              { value: '98%', label: 'Tasa de retención' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .client-card:hover {
            transform: translateY(-4px);
            border-color: rgba(6, 182, 212, 0.5) !important;
          }
          .client-card:hover .card-glow {
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </section>
  );
}
