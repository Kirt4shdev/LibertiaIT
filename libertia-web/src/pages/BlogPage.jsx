import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Calendar, 
  Tag, 
  BookOpen,
  Search,
  Filter,
  Home
} from 'lucide-react';
import { blogPosts, siteContent } from '../data/content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LightOrbs from '../components/LightOrbs';

const getCategoryColor = (category) => {
  const colors = {
    'Ciberseguridad': '#ef4444',
    'Industria': '#3b82f6',
    'Hostelería': '#f59e0b',
    'Tendencias': '#a855f7',
    'Estadísticas': '#10b981',
    'Servicios': '#6366f1',
    'Consejos': '#14b8a6',
    'Cumplimiento': '#64748b',
    'Seguridad': '#f43f5e'
  };
  return colors[category] || '#6b7280';
};

// Obtener todas las categorías únicas
const allCategories = [...new Set(blogPosts.map(post => post.category))];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtrar posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <LightOrbs />
      <div className="noise" />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        
        <main style={{ paddingTop: '6rem' }}>
          {/* Hero Section */}
          <section style={{ 
            position: 'relative', 
            padding: '4rem 0 3rem', 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)',
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
              >
                <span style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem', 
                  borderRadius: '9999px', 
                  background: 'rgba(168, 85, 247, 0.1)', 
                  color: '#c084fc', 
                  fontSize: '0.875rem', 
                  fontWeight: 500, 
                  marginBottom: '1.5rem' 
                }}>
                  <Newspaper style={{ width: '1rem', height: '1rem' }} />
                  Blog de Ciberseguridad
                </span>
                
                <h1 style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                  fontWeight: 700, 
                  color: 'var(--text-primary)', 
                  marginBottom: '1.5rem',
                  lineHeight: 1.2
                }}>
                  Artículos y{' '}
                  <span className="gradient-text">Recursos</span>
                </h1>
                
                <p style={{ 
                  fontSize: '1.125rem', 
                  color: 'var(--text-secondary)', 
                  maxWidth: '48rem', 
                  margin: '0 auto',
                  lineHeight: 1.7
                }}>
                  Mantente actualizado con las últimas tendencias en ciberseguridad, 
                  tecnología y transformación digital para empresas.
                </p>
              </motion.div>

              {/* Search & Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  maxWidth: '48rem',
                  margin: '0 auto 3rem'
                }}
              >
                {/* Search Bar */}
                <div style={{ position: 'relative' }}>
                  <Search style={{ 
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1.25rem', 
                    height: '1.25rem', 
                    color: 'var(--text-muted)' 
                  }} />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                {/* Category Filter */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: selectedCategory === 'all' 
                        ? 'linear-gradient(135deg, #06b6d4, #2563eb)' 
                        : 'var(--bg-tertiary)',
                      color: selectedCategory === 'all' ? 'white' : 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Todos
                  </button>
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: 'none',
                        background: selectedCategory === category 
                          ? getCategoryColor(category)
                          : 'var(--bg-tertiary)',
                        color: selectedCategory === category ? 'white' : 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Post */}
          {selectedCategory === 'all' && searchTerm === '' && (
            <section style={{ 
              position: 'relative',
              padding: '0 0 3rem',
              overflow: 'hidden' 
            }}>
              <div style={{ 
                maxWidth: '80rem', 
                margin: '0 auto', 
                padding: '0 1.5rem' 
              }}>
                <motion.a
                  href={featuredPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="card-hover"
                  style={{
                    display: 'block',
                    padding: '2.5rem',
                    borderRadius: '1.5rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background Glow */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '25rem',
                    height: '25rem',
                    background: `linear-gradient(to bottom left, ${getCategoryColor(featuredPost.category)}22, transparent)`,
                    borderRadius: '50%',
                    filter: 'blur(80px)'
                  }} />

                  <div style={{ 
                    position: 'relative', 
                    zIndex: 10,
                    display: 'grid',
                    gridTemplateColumns: '1fr 200px',
                    gap: '3rem',
                    alignItems: 'center'
                  }} className="blog-featured-grid">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <span style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '9999px',
                          background: getCategoryColor(featuredPost.category),
                          color: 'white',
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}>
                          {featuredPost.category}
                        </span>
                        <span style={{ 
                          fontSize: '0.875rem', 
                          color: 'var(--text-muted)',
                          padding: '0.375rem 0.75rem',
                          background: 'var(--bg-tertiary)',
                          borderRadius: '0.5rem'
                        }}>
                          ⭐ Artículo Destacado
                        </span>
                      </div>

                      <h2 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '1rem',
                        lineHeight: 1.3
                      }}>
                        {featuredPost.title}
                      </h2>

                      <p style={{
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        lineHeight: 1.8,
                        fontSize: '1.05rem'
                      }}>
                        {featuredPost.excerpt}
                      </p>

                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '2rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar style={{ width: '1rem', height: '1rem' }} />
                          <span>{new Date(featuredPost.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock style={{ width: '1rem', height: '1rem' }} />
                          <span>{featuredPost.readTime} lectura</span>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '1.5rem',
                        color: '#22d3ee',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}>
                        <span>Leer artículo completo</span>
                        <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                      </div>
                    </div>

                    <div style={{ 
                      width: '200px', 
                      height: '200px', 
                      borderRadius: '1.5rem',
                      background: `linear-gradient(135deg, ${getCategoryColor(featuredPost.category)}44, ${getCategoryColor(featuredPost.category)}11)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${getCategoryColor(featuredPost.category)}33`
                    }} className="blog-featured-icon">
                      <BookOpen style={{ width: '5rem', height: '5rem', color: getCategoryColor(featuredPost.category), opacity: 0.6 }} />
                    </div>
                  </div>
                </motion.a>
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section style={{ 
            position: 'relative',
            padding: '3rem 0 6rem',
            overflow: 'hidden' 
          }}>
            <div style={{ 
              maxWidth: '80rem', 
              margin: '0 auto', 
              padding: '0 1.5rem' 
            }}>
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                  marginBottom: '2rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem'
                }}
              >
                {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` en "${selectedCategory}"`}
                {searchTerm && ` para "${searchTerm}"`}
              </motion.div>

              {/* Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
                  gap: '1.5rem'
                }}>
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id || index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="card-hover"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1.75rem',
                        borderRadius: '1rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        textDecoration: 'none',
                        height: '100%',
                        cursor: 'default'
                      }}
                    >
                      {/* Header */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        marginBottom: '1.25rem' 
                      }}>
                        <span style={{
                          padding: '0.375rem 0.875rem',
                          borderRadius: '9999px',
                          background: getCategoryColor(post.category),
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {post.category}
                        </span>
                        <Tag style={{ width: '1rem', height: '1rem', color: 'var(--text-muted)' }} />
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '0.875rem',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        marginBottom: '1.25rem',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border-color)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Calendar style={{ width: '0.875rem', height: '0.875rem' }} />
                          <span>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Clock style={{ width: '0.875rem', height: '0.875rem' }} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Read More - Info message */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '1rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}>
                        <BookOpen style={{ width: '1rem', height: '1rem' }} />
                        <span>Contenido de referencia</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <Search style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    color: 'var(--text-muted)',
                    margin: '0 auto 1rem'
                  }} />
                  <h3 style={{ 
                    color: 'var(--text-primary)', 
                    marginBottom: '0.5rem',
                    fontSize: '1.25rem'
                  }}>
                    No se encontraron artículos
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Intenta con otros términos de búsqueda o categorías.
                  </p>
                </motion.div>
              )}

              {/* Back to Home */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ 
                  textAlign: 'center', 
                  marginTop: '4rem' 
                }}
              >
                <Link
                  to="/"
                  className="btn-secondary"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                  Volver al inicio
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .blog-featured-grid {
            grid-template-columns: 1fr !important;
          }
          .blog-featured-icon {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

