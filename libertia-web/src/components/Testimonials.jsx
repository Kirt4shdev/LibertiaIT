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
                    marginBottom: '1rem',
                    overflow: 'hidden',
                    padding: '3px'
                  }}>
                    {siteContent.testimonials[current].image ? (
                      <img 
                        src={siteContent.testimonials[current].image}
                        alt={siteContent.testimonials[current].name}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span style="font-size: 1.5rem; font-weight: 700; color: white;">${siteContent.testimonials[current].name.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                        {siteContent.testimonials[current].name.charAt(0)}
                      </span>
                    )}
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
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                { name: 'Julián de Castro', subtitle: 'Avanza', years: '+10 años', logo: '/images/clients/clients_5cfa1d6a9bdb.webp' },
                { name: 'BUSQUETS', subtitle: 'Despacho Legal', years: '+8 años', logo: '/images/clients/clients_75563dbfb54b.webp' },
                { name: 'CONCAES', subtitle: 'Gestión', years: '+5 años', logo: '/images/clients/clients_0501e8ee6d17.webp' },
                { name: 'DILUS', subtitle: 'Innovación', years: '+7 años', logo: '/images/clients/clients_f53eebaf0fb1.webp' },
                { name: 'NextMune', subtitle: 'Farmacéutica', years: '+20 años', logo: '/images/certifications/certifications_46d74fbaffda.webp' },
                { name: 'Julián de Castro', subtitle: 'Avanza', years: '+10 años', logo: '/images/clients/clients_5cfa1d6a9bdb.webp' },
                { name: 'BUSQUETS', subtitle: 'Despacho Legal', years: '+8 años', logo: '/images/clients/clients_75563dbfb54b.webp' },
                { name: 'CONCAES', subtitle: 'Gestión', years: '+5 años', logo: '/images/clients/clients_0501e8ee6d17.webp' },
                { name: 'DILUS', subtitle: 'Innovación', years: '+7 años', logo: '/images/clients/clients_f53eebaf0fb1.webp' },
                { name: 'NextMune', subtitle: 'Farmacéutica', years: '+20 años', logo: '/images/certifications/certifications_46d74fbaffda.webp' },
              ].map((company, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    padding: '1.5rem 2rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    minWidth: '220px',
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

                  {/* Logo */}
                  {company.logo && (
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      margin: '0 auto 1rem',
                      borderRadius: '0.75rem',
                      overflow: 'hidden',
                      background: 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.5rem'
                    }}>
                      <img 
                        src={company.logo} 
                        alt={`Logo ${company.name}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          filter: 'var(--client-logo-filter, none)'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                  }}>
                    {company.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
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

          {/* Certifications */}
          <div style={{ marginTop: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Certificaciones y Partners
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {[
                '/images/logos/logos_9c2ab2ab5299.webp',
                '/images/logos/logos_318954208de9.webp',
                '/images/logos/logos_19f509e88bf8.webp',
                '/images/certifications/certifications_475e7fc5698a.webp',
                '/images/certifications/certifications_eb1ad026fc5a.webp',
              ].map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    width: '5rem',
                    height: '5rem',
                    padding: '0.75rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src={logo}
                    alt="Certificación"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      opacity: 0.85
                    }}
                    onError={(e) => {
                      e.target.parentElement.style.display = 'none';
                    }}
                  />
                </motion.div>
              ))}
            </div>
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
