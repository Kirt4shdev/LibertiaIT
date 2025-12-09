"""
Script para extraer y ordenar todos los textos e imágenes de libertia.es
Autor: Libertia IT Web Scraper
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import json
from datetime import datetime
import re
from collections import OrderedDict
import os
import hashlib


class LibertiaWebScraper:
    def __init__(self, base_url="https://libertia.es"):
        self.base_url = base_url
        self.domain = urlparse(base_url).netloc
        self.visited_urls = set()
        self.all_pages_content = OrderedDict()
        self.all_images = {
            'team': [],           # Fotos del equipo
            'clients': [],        # Logos de clientes
            'testimonials': [],   # Fotos de personas que dan testimonios
            'services': [],       # Imágenes de servicios
            'hero': [],           # Imágenes principales/hero
            'logos': [],          # Logos de la empresa
            'certifications': [], # Logos de certificaciones
            'partners': [],       # Logos de partners
            'blog': [],           # Imágenes del blog
            'other': []           # Otras imágenes
        }
        self.downloaded_images = {}
        self.images_dir = "libertia-web/public/images"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        }
        
        # Crear directorios para imágenes
        self._create_image_directories()
    
    def _create_image_directories(self):
        """Crea los directorios para almacenar imágenes"""
        subdirs = ['team', 'clients', 'testimonials', 'services', 'hero', 
                   'logos', 'certifications', 'partners', 'blog', 'other']
        for subdir in subdirs:
            path = os.path.join(self.images_dir, subdir)
            os.makedirs(path, exist_ok=True)
        print(f"📁 Directorios de imágenes creados en: {self.images_dir}")
    
    def is_valid_url(self, url):
        """Verifica si la URL pertenece al dominio de Libertia"""
        parsed = urlparse(url)
        # Verificar que sea del mismo dominio y no sea un archivo o recurso
        if parsed.netloc and parsed.netloc != self.domain:
            return False
        # Excluir archivos de recursos (excepto imágenes que procesamos aparte)
        excluded_extensions = ['.pdf', '.css', '.js', '.ico']
        if any(url.lower().endswith(ext) for ext in excluded_extensions):
            return False
        # Excluir URLs de administración, login, etc.
        excluded_patterns = ['wp-admin', 'wp-login', 'wp-includes', '#', 'mailto:', 'tel:', 'javascript:']
        if any(pattern in url.lower() for pattern in excluded_patterns):
            return False
        return True
    
    def is_image_url(self, url):
        """Verifica si la URL es una imagen"""
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
        return any(url.lower().endswith(ext) or ext + '?' in url.lower() for ext in image_extensions)
    
    def normalize_url(self, url):
        """Normaliza la URL eliminando fragmentos y parámetros innecesarios"""
        parsed = urlparse(url)
        # Reconstruir sin fragmento
        normalized = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
        # Eliminar trailing slash para consistencia (excepto para la raíz)
        if normalized != self.base_url and normalized.endswith('/'):
            normalized = normalized[:-1]
        return normalized
    
    def get_page_content(self, url):
        """Obtiene el contenido HTML de una página"""
        try:
            response = requests.get(url, headers=self.headers, timeout=15)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"  ⚠ Error al obtener {url}: {e}")
            return None
    
    def download_image(self, img_url, category='other'):
        """Descarga una imagen y la guarda en el directorio correspondiente"""
        # Ignorar data URIs
        if img_url.startswith('data:'):
            return None
            
        if img_url in self.downloaded_images:
            return self.downloaded_images[img_url]
        
        try:
            # Obtener la imagen
            response = requests.get(img_url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            # Determinar la extensión
            content_type = response.headers.get('content-type', '')
            if 'jpeg' in content_type or 'jpg' in content_type:
                ext = '.jpg'
            elif 'png' in content_type:
                ext = '.png'
            elif 'gif' in content_type:
                ext = '.gif'
            elif 'webp' in content_type:
                ext = '.webp'
            elif 'svg' in content_type:
                ext = '.svg'
            else:
                # Intentar obtener del URL
                parsed = urlparse(img_url)
                path = parsed.path.lower()
                for e in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']:
                    if e in path:
                        ext = e
                        break
                else:
                    ext = '.jpg'  # Default
            
            # Generar nombre único basado en hash del URL
            url_hash = hashlib.md5(img_url.encode()).hexdigest()[:12]
            filename = f"{category}_{url_hash}{ext}"
            filepath = os.path.join(self.images_dir, category, filename)
            
            # Guardar la imagen
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            # Ruta relativa para usar en la web
            relative_path = f"/images/{category}/{filename}"
            self.downloaded_images[img_url] = relative_path
            
            print(f"    📷 Imagen descargada: {filename} ({category})")
            return relative_path
            
        except Exception as e:
            print(f"    ⚠ Error descargando imagen {img_url}: {e}")
            return None
    
    def classify_image(self, img_tag, parent_section, url):
        """Clasifica una imagen según su contexto"""
        alt_text = img_tag.get('alt', '').lower()
        img_class = ' '.join(img_tag.get('class', [])).lower()
        parent_text = parent_section.get_text().lower() if parent_section else ''
        parent_class = ' '.join(parent_section.get('class', [])).lower() if parent_section else ''
        
        # Ignorar imágenes muy pequeñas o de tracking
        width = img_tag.get('width', '')
        height = img_tag.get('height', '')
        if width and height:
            try:
                if int(width) < 20 or int(height) < 20:
                    return None, None
            except:
                pass
        
        # Clasificar por contexto
        category = 'other'
        
        # Detectar logos de la empresa
        if 'logo' in alt_text or 'logo' in img_class or 'libertia' in alt_text:
            if 'client' in parent_text or 'partner' in parent_text or 'colabor' in parent_text:
                category = 'clients'
            else:
                category = 'logos'
        
        # Detectar fotos del equipo
        elif any(term in parent_text or term in parent_class for term in ['equipo', 'team', 'nosotros', 'fundador', 'ceo', 'director', 'about']):
            category = 'team'
        
        # Detectar fotos de testimonios
        elif any(term in parent_text or term in parent_class for term in ['testimonio', 'testimonial', 'opinión', 'review', 'cliente dice', 'quote']):
            category = 'testimonials'
        
        # Detectar logos de clientes
        elif any(term in parent_text or term in parent_class for term in ['cliente', 'confían', 'trabajan con', 'partner', 'colaborador', 'brands', 'companies']):
            category = 'clients'
        
        # Detectar certificaciones
        elif any(term in alt_text or term in parent_text for term in ['certificación', 'iso', 'ens', 'certificado', 'badge', 'microsoft', 'partner']):
            category = 'certifications'
        
        # Detectar imágenes hero
        elif 'hero' in img_class or 'banner' in img_class or 'featured' in img_class or 'hero' in parent_class:
            category = 'hero'
        
        # Detectar imágenes de servicios
        elif any(term in parent_text or term in parent_class for term in ['servicio', 'service', 'solución', 'solution']):
            category = 'services'
        
        # Detectar imágenes del blog
        elif '/blog' in url or 'articulo' in url or 'post' in parent_text or 'article' in parent_class:
            category = 'blog'
        
        return None, category
    
    def _looks_like_person_photo(self, img_url, alt_text):
        """Intenta determinar si una imagen parece ser una foto de persona"""
        person_indicators = ['luis', 'alicia', 'alvaro', 'daniel', 'carlos', 'maximo', 
                           'angel', 'alberto', 'iñigo', 'inigo', 'morcillo', 'diaz',
                           'foto', 'avatar', 'profile', 'perfil', 'retrato']
        url_lower = img_url.lower()
        return any(ind in url_lower or ind in alt_text for ind in person_indicators)
    
    def extract_images(self, soup, url):
        """Extrae todas las imágenes de una página"""
        images_found = []
        
        for img in soup.find_all('img'):
            # Obtener el contenedor padre para contexto
            parent = img.find_parent(['section', 'div', 'article', 'header', 'footer'])
            
            # Buscar la URL real de la imagen en múltiples atributos (lazy loading)
            img_url = None
            for attr in ['data-src', 'data-lazy-src', 'data-original', 'src']:
                potential_url = img.get(attr, '')
                if potential_url and not potential_url.startswith('data:'):
                    img_url = potential_url
                    break
            
            # También buscar en srcset
            if not img_url:
                srcset = img.get('srcset', '') or img.get('data-srcset', '')
                if srcset and not srcset.startswith('data:'):
                    # Tomar la primera imagen del srcset
                    first_src = srcset.split(',')[0].strip().split(' ')[0]
                    if first_src and not first_src.startswith('data:'):
                        img_url = first_src
            
            if not img_url:
                continue
                
            # Convertir a URL absoluta
            img_url = urljoin(url, img_url)
            
            # Clasificar la imagen
            _, category = self.classify_image(img, parent, url)
            
            if category:
                alt_text = img.get('alt', '')
                
                image_data = {
                    'url': img_url,
                    'alt': alt_text,
                    'source_page': url,
                    'category': category,
                    'local_path': None  # Se llenará al descargar
                }
                
                images_found.append(image_data)
                
                if image_data not in self.all_images[category]:
                    self.all_images[category].append(image_data)
        
        # También buscar imágenes en backgrounds CSS inline
        for element in soup.find_all(style=True):
            style = element.get('style', '')
            urls = re.findall(r'url\(["\']?([^"\'()]+)["\']?\)', style)
            for bg_url in urls:
                if self.is_image_url(bg_url):
                    full_url = urljoin(url, bg_url)
                    parent = element.find_parent(['section', 'div', 'article'])
                    _, category = self.classify_image(element, parent, url)
                    if category:
                        image_data = {
                            'url': full_url,
                            'alt': '',
                            'source_page': url,
                            'category': category or 'other',
                            'local_path': None
                        }
                        if image_data not in self.all_images[category or 'other']:
                            self.all_images[category or 'other'].append(image_data)
        
        return images_found
    
    def extract_links(self, soup, current_url):
        """Extrae todos los enlaces internos de una página"""
        links = set()
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            # Convertir a URL absoluta
            full_url = urljoin(current_url, href)
            full_url = self.normalize_url(full_url)
            
            # Solo enlaces de páginas, no imágenes
            if self.is_valid_url(full_url) and not self.is_image_url(full_url) and full_url not in self.visited_urls:
                links.add(full_url)
        return links
    
    def clean_text(self, text):
        """Limpia el texto eliminando espacios extra y caracteres especiales"""
        if not text:
            return ""
        # Eliminar múltiples espacios y saltos de línea
        text = re.sub(r'\s+', ' ', text)
        # Eliminar espacios al inicio y final
        text = text.strip()
        return text
    
    def extract_page_structure(self, soup, url):
        """Extrae el contenido estructurado de una página"""
        page_data = {
            'url': url,
            'title': '',
            'meta_description': '',
            'sections': [],
            'images': []
        }
        
        # Extraer título
        title_tag = soup.find('title')
        if title_tag:
            page_data['title'] = self.clean_text(title_tag.get_text())
        
        # Extraer meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            page_data['meta_description'] = self.clean_text(meta_desc['content'])
        
        # Extraer imágenes antes de modificar el DOM
        page_data['images'] = self.extract_images(soup, url)
        
        # Eliminar elementos que no queremos (scripts, styles, nav, footer, etc.)
        for element in soup.find_all(['script', 'style', 'noscript', 'iframe']):
            element.decompose()
        
        # Buscar el contenido principal
        main_content = soup.find('main') or soup.find('article') or soup.find('div', class_=re.compile('content|main|page', re.I)) or soup.find('body')
        
        if main_content:
            current_section = {'heading': 'Contenido Principal', 'level': 0, 'content': []}
            
            # Procesar todos los elementos relevantes
            for element in main_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'span', 'div', 'blockquote']):
                text = self.clean_text(element.get_text())
                
                if not text or len(text) < 3:
                    continue
                
                # Si es un encabezado, crear nueva sección
                if element.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
                    # Guardar sección anterior si tiene contenido
                    if current_section['content']:
                        page_data['sections'].append(current_section)
                    
                    level = int(element.name[1])
                    current_section = {
                        'heading': text,
                        'level': level,
                        'content': []
                    }
                else:
                    # Evitar duplicados y textos muy cortos
                    if text not in current_section['content'] and len(text) > 10:
                        # Evitar agregar texto si ya está contenido en otro
                        is_duplicate = any(text in existing or existing in text for existing in current_section['content'])
                        if not is_duplicate:
                            current_section['content'].append(text)
            
            # Agregar última sección
            if current_section['content']:
                page_data['sections'].append(current_section)
        
        return page_data
    
    def scrape_page(self, url):
        """Scrapea una página individual"""
        print(f"📄 Scrapeando: {url}")
        
        html = self.get_page_content(url)
        if not html:
            return set()
        
        soup = BeautifulSoup(html, 'lxml')
        
        # Extraer contenido estructurado
        page_data = self.extract_page_structure(soup, url)
        self.all_pages_content[url] = page_data
        
        # Extraer enlaces para continuar el scraping
        new_links = self.extract_links(soup, url)
        
        return new_links
    
    def download_all_images(self):
        """Descarga todas las imágenes recopiladas"""
        print("\n" + "=" * 60)
        print("📥 Descargando imágenes...")
        print("=" * 60)
        
        total_downloaded = 0
        
        for category, images in self.all_images.items():
            if images:
                print(f"\n📁 Categoría: {category} ({len(images)} imágenes)")
                for img_data in images:
                    local_path = self.download_image(img_data['url'], category)
                    if local_path:
                        img_data['local_path'] = local_path
                        total_downloaded += 1
                    time.sleep(0.2)  # Pequeña pausa entre descargas
        
        print(f"\n✅ Total de imágenes descargadas: {total_downloaded}")
        return total_downloaded
    
    def scrape_all(self):
        """Scrapea todo el sitio web"""
        print("=" * 60)
        print("🚀 Iniciando scraping de libertia.es")
        print("=" * 60)
        
        urls_to_visit = {self.base_url}
        
        while urls_to_visit:
            url = urls_to_visit.pop()
            
            if url in self.visited_urls:
                continue
            
            self.visited_urls.add(url)
            new_links = self.scrape_page(url)
            urls_to_visit.update(new_links)
            
            # Pequeña pausa para no sobrecargar el servidor
            time.sleep(0.5)
        
        print(f"\n✅ Scraping completado. {len(self.visited_urls)} páginas procesadas.")
        
        # Descargar todas las imágenes
        self.download_all_images()
    
    def generate_report(self):
        """Genera un reporte en formato texto legible"""
        report = []
        report.append("=" * 80)
        report.append("EXTRACCIÓN DE CONTENIDO WEB - LIBERTIA.ES")
        report.append(f"Fecha de extracción: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append(f"Total de páginas procesadas: {len(self.all_pages_content)}")
        report.append("=" * 80)
        report.append("")
        
        for url, page_data in self.all_pages_content.items():
            report.append("-" * 80)
            report.append(f"📌 PÁGINA: {page_data['title']}")
            report.append(f"   URL: {url}")
            if page_data['meta_description']:
                report.append(f"   Descripción: {page_data['meta_description']}")
            report.append("-" * 80)
            report.append("")
            
            for section in page_data['sections']:
                indent = "  " * section['level']
                heading_marker = "#" * max(1, section['level'])
                report.append(f"{indent}{heading_marker} {section['heading']}")
                report.append("")
                
                for content in section['content']:
                    # Dividir contenido largo en líneas
                    wrapped_content = self.wrap_text(content, 100)
                    for line in wrapped_content:
                        report.append(f"{indent}  {line}")
                report.append("")
            
            report.append("")
        
        return "\n".join(report)
    
    def wrap_text(self, text, width):
        """Divide texto largo en líneas"""
        words = text.split()
        lines = []
        current_line = []
        current_length = 0
        
        for word in words:
            if current_length + len(word) + 1 <= width:
                current_line.append(word)
                current_length += len(word) + 1
            else:
                if current_line:
                    lines.append(" ".join(current_line))
                current_line = [word]
                current_length = len(word)
        
        if current_line:
            lines.append(" ".join(current_line))
        
        return lines if lines else [text]
    
    def generate_json_report(self):
        """Genera un reporte en formato JSON estructurado"""
        return json.dumps({
            'extraction_date': datetime.now().isoformat(),
            'base_url': self.base_url,
            'total_pages': len(self.all_pages_content),
            'pages': list(self.all_pages_content.values()),
            'images': {
                category: [
                    {
                        'url': img['url'],
                        'alt': img['alt'],
                        'local_path': img['local_path'],
                        'source_page': img['source_page']
                    }
                    for img in images if img.get('local_path')
                ]
                for category, images in self.all_images.items()
            },
            'images_summary': {
                category: len([img for img in images if img.get('local_path')])
                for category, images in self.all_images.items()
            }
        }, ensure_ascii=False, indent=2)
    
    def generate_images_js_export(self):
        """Genera un archivo JS con las imágenes categorizadas para usar en la web"""
        js_content = """// Imágenes extraídas de libertia.es
// Generado automáticamente el {date}

export const scrapedImages = {{
  team: {team},
  
  clients: {clients},
  
  testimonials: {testimonials},
  
  logos: {logos},
  
  certifications: {certifications},
  
  services: {services},
  
  hero: {hero},
  
  partners: {partners},
  
  blog: {blog}
}};

// Helper para obtener imagen por categoría
export const getImagesByCategory = (category) => scrapedImages[category] || [];

// Helper para obtener la primera imagen de una categoría
export const getFirstImage = (category) => scrapedImages[category]?.[0]?.local_path || null;
"""
        
        def format_images(images):
            formatted = []
            for img in images:
                if img.get('local_path'):
                    formatted.append({
                        'path': img['local_path'],
                        'alt': img['alt'] or ''
                    })
            return json.dumps(formatted, ensure_ascii=False, indent=4)
        
        return js_content.format(
            date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            team=format_images(self.all_images['team']),
            clients=format_images(self.all_images['clients']),
            testimonials=format_images(self.all_images['testimonials']),
            logos=format_images(self.all_images['logos']),
            certifications=format_images(self.all_images['certifications']),
            services=format_images(self.all_images['services']),
            hero=format_images(self.all_images['hero']),
            partners=format_images(self.all_images['partners']),
            blog=format_images(self.all_images['blog'])
        )
    
    def generate_markdown_report(self):
        """Genera un reporte en formato Markdown"""
        md = []
        md.append("# Contenido Web - Libertia.es")
        md.append("")
        md.append(f"**Fecha de extracción:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        md.append(f"**Total de páginas:** {len(self.all_pages_content)}")
        md.append("")
        
        # Resumen de imágenes
        md.append("## 🖼️ Resumen de Imágenes")
        md.append("")
        for category, images in self.all_images.items():
            downloaded = len([img for img in images if img.get('local_path')])
            if downloaded > 0:
                md.append(f"- **{category.capitalize()}:** {downloaded} imágenes")
        md.append("")
        
        md.append("---")
        md.append("")
        
        # Índice
        md.append("## 📑 Índice de Páginas")
        md.append("")
        for i, (url, page_data) in enumerate(self.all_pages_content.items(), 1):
            title = page_data['title'] or url
            anchor = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
            md.append(f"{i}. [{title}](#{anchor})")
        md.append("")
        md.append("---")
        md.append("")
        
        # Contenido de cada página
        for url, page_data in self.all_pages_content.items():
            title = page_data['title'] or url
            md.append(f"## 📄 {title}")
            md.append("")
            md.append(f"**URL:** {url}")
            md.append("")
            
            if page_data['meta_description']:
                md.append(f"> {page_data['meta_description']}")
                md.append("")
            
            # Imágenes de la página
            if page_data.get('images'):
                md.append("### Imágenes encontradas")
                for img in page_data['images'][:5]:  # Mostrar solo las primeras 5
                    if img.get('local_path'):
                        md.append(f"- [{img['alt'] or 'Sin descripción'}]({img['local_path']}) - {img['category']}")
                md.append("")
            
            for section in page_data['sections']:
                heading_level = min(section['level'] + 2, 6)  # Ajustar nivel de heading
                md.append(f"{'#' * heading_level} {section['heading']}")
                md.append("")
                
                for content in section['content']:
                    md.append(f"{content}")
                    md.append("")
            
            md.append("---")
            md.append("")
        
        return "\n".join(md)
    
    def save_reports(self, base_filename="libertia_contenido"):
        """Guarda los reportes en diferentes formatos"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # Guardar TXT
        txt_filename = f"{base_filename}_{timestamp}.txt"
        with open(txt_filename, 'w', encoding='utf-8') as f:
            f.write(self.generate_report())
        print(f"📝 Reporte TXT guardado: {txt_filename}")
        
        # Guardar JSON
        json_filename = f"{base_filename}_{timestamp}.json"
        with open(json_filename, 'w', encoding='utf-8') as f:
            f.write(self.generate_json_report())
        print(f"📊 Reporte JSON guardado: {json_filename}")
        
        # Guardar Markdown
        md_filename = f"{base_filename}_{timestamp}.md"
        with open(md_filename, 'w', encoding='utf-8') as f:
            f.write(self.generate_markdown_report())
        print(f"📋 Reporte Markdown guardado: {md_filename}")
        
        # Guardar archivo JS con imágenes
        js_filename = "libertia-web/src/data/images.js"
        with open(js_filename, 'w', encoding='utf-8') as f:
            f.write(self.generate_images_js_export())
        print(f"🖼️ Archivo JS de imágenes guardado: {js_filename}")
        
        return txt_filename, json_filename, md_filename, js_filename


def main():
    print("""
    ╔═══════════════════════════════════════════════════════════╗
    ║     LIBERTIA.ES - Extractor de Contenido Web              ║
    ║     Script para renovación de página web                  ║
    ║     Ahora con extracción de imágenes                      ║
    ╚═══════════════════════════════════════════════════════════╝
    """)
    
    scraper = LibertiaWebScraper("https://libertia.es")
    
    # Ejecutar scraping
    scraper.scrape_all()
    
    # Guardar reportes
    print("\n📁 Generando reportes...")
    txt_file, json_file, md_file, js_file = scraper.save_reports()
    
    print("\n" + "=" * 60)
    print("✨ Proceso completado exitosamente")
    print("=" * 60)
    print(f"""
Archivos generados:
  • {txt_file} - Formato texto plano
  • {json_file} - Formato JSON estructurado
  • {md_file} - Formato Markdown
  • {js_file} - Imágenes para la web

Imágenes descargadas en: libertia-web/public/images/
  • team/ - Fotos del equipo
  • clients/ - Logos de clientes
  • testimonials/ - Fotos de testimonios
  • logos/ - Logos de la empresa
  • certifications/ - Certificaciones
  • services/ - Imágenes de servicios
  • hero/ - Imágenes principales
  • partners/ - Logos de partners
  • blog/ - Imágenes del blog

El archivo {js_file} contiene todas las imágenes categorizadas
listas para importar en los componentes React.
    """)


if __name__ == "__main__":
    main()
