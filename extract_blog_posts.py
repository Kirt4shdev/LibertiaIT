import json
import re

# Leer el JSON
with open('libertia_contenido_20251209_194130.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Lista para almacenar todos los posts del blog
blog_posts = []

# Filtrar URLs del blog (excluir páginas de paginación y páginas que no son artículos)
excluded_patterns = [
    '/blog$',
    '/blog/',  # Páginas de índice
    '/virtualcio',
    '/servicios-gestionados',
    '/sobre-nosotros',
    '/contacto',
    '/aviso-legal',
    '/politica-privacidad',
    '/politica-de-cookies',
    '/politica-de-seguridad'
]

# Categorías basadas en las URLs
def get_category_from_url(url):
    categories_map = {
        'ciberseguridad': 'Ciberseguridad',
        'cyber': 'Ciberseguridad',
        'seguridad': 'Ciberseguridad',
        'ciberataque': 'Ciberseguridad',
        'phising': 'Ciberseguridad',
        'estafa': 'Ciberseguridad',
        'industria': 'Industria',
        'hosteleria': 'Hostelería',
        'aeronautico': 'Industria',
        'transformacion-digital': 'Tendencias',
        'outsourcing': 'Servicios',
        'msp': 'Servicios',
        'mssp': 'Servicios',
        'gestion': 'Servicios',
        'mantenimiento': 'Servicios',
        'estadistica': 'Estadísticas',
        'kpi': 'Estadísticas',
        'noticia': 'Estadísticas',
        'tendencia': 'Tendencias',
        'futuro': 'Tendencias',
        'big-data': 'Tendencias',
        'iot': 'Tendencias',
        'erp': 'Tendencias',
        'consejo': 'Consejos',
        'paso': 'Consejos',
        'guia': 'Consejos',
        'como': 'Consejos',
        'rgpd': 'Cumplimiento',
        'iso': 'Cumplimiento',
        'ens': 'Cumplimiento',
        'esquema-nacional': 'Cumplimiento',
        'proteccion-datos': 'Cumplimiento'
    }
    
    url_lower = url.lower()
    for keyword, category in categories_map.items():
        if keyword in url_lower:
            return category
    return 'Tecnología'

# Procesar cada página
for page in data.get('pages', []):
    url = page.get('url', '')
    
    # Saltar si no es un artículo del blog
    should_skip = False
    for pattern in excluded_patterns:
        if re.search(pattern, url):
            should_skip = True
            break
    
    if should_skip or not url or url == 'https://libertia.es':
        continue
    
    title = page.get('title', '').replace(' - Libertia', '').strip()
    meta_description = page.get('meta_description', '')
    
    # Extraer contenido principal
    content_parts = []
    for section in page.get('sections', []):
        if section.get('level', 0) <= 2:  # Solo headings principales
            content_parts.extend(section.get('content', []))
    
    # Limpiar y obtener excerpt
    full_content = ' '.join(content_parts)
    # Limpiar texto
    full_content = re.sub(r'\s+', ' ', full_content).strip()
    
    excerpt = meta_description if meta_description else (full_content[:200] + '...' if len(full_content) > 200 else full_content)
    
    # Solo añadir si tiene título y contenido
    if title and len(title) > 10 and not any(excluded in title.lower() for excluded in ['aviso legal', 'política', 'contacto']):
        blog_posts.append({
            'title': title,
            'excerpt': excerpt[:250] + '...' if len(excerpt) > 250 else excerpt,
            'category': get_category_from_url(url),
            'date': '2024',  # Fecha genérica
            'url': url,
            'readTime': '5 min',
            'featured': False
        })

# Ordenar por categoría
blog_posts.sort(key=lambda x: x['category'])

# Marcar el primero como destacado
if blog_posts:
    blog_posts[0]['featured'] = True

print(f"Total de artículos encontrados: {len(blog_posts)}")
print("\nPrimeros 5 artículos:")
for i, post in enumerate(blog_posts[:5], 1):
    print(f"{i}. [{post['category']}] {post['title']}")

# Guardar en formato JavaScript
with open('blog_posts_extracted.js', 'w', encoding='utf-8') as f:
    f.write('export const blogPosts = [\n')
    for i, post in enumerate(blog_posts):
        f.write('  {\n')
        f.write(f'    title: "{post["title"]}",\n')
        f.write(f'    excerpt: "{post["excerpt"]}",\n')
        f.write(f'    category: "{post["category"]}",\n')
        f.write(f'    date: "{post["date"]}",\n')
        f.write(f'    readTime: "{post["readTime"]}",\n')
        f.write(f'    featured: {str(post["featured"]).lower()}\n')
        if i < len(blog_posts) - 1:
            f.write('  },\n')
        else:
            f.write('  }\n')
    f.write('];\n')

print(f"\n✓ Archivo 'blog_posts_extracted.js' creado con {len(blog_posts)} artículos")

