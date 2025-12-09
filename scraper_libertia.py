"""
Script para extraer y ordenar todos los textos de libertia.es
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


class LibertiaWebScraper:
    def __init__(self, base_url="https://libertia.es"):
        self.base_url = base_url
        self.domain = urlparse(base_url).netloc
        self.visited_urls = set()
        self.all_pages_content = OrderedDict()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        }
    
    def is_valid_url(self, url):
        """Verifica si la URL pertenece al dominio de Libertia"""
        parsed = urlparse(url)
        # Verificar que sea del mismo dominio y no sea un archivo o recurso
        if parsed.netloc and parsed.netloc != self.domain:
            return False
        # Excluir archivos de recursos
        excluded_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.css', '.js', '.ico', '.svg', '.webp']
        if any(url.lower().endswith(ext) for ext in excluded_extensions):
            return False
        # Excluir URLs de administración, login, etc.
        excluded_patterns = ['wp-admin', 'wp-login', 'wp-content', 'wp-includes', '#', 'mailto:', 'tel:', 'javascript:']
        if any(pattern in url.lower() for pattern in excluded_patterns):
            return False
        return True
    
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
    
    def extract_links(self, soup, current_url):
        """Extrae todos los enlaces internos de una página"""
        links = set()
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            # Convertir a URL absoluta
            full_url = urljoin(current_url, href)
            full_url = self.normalize_url(full_url)
            
            if self.is_valid_url(full_url) and full_url not in self.visited_urls:
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
            'sections': []
        }
        
        # Extraer título
        title_tag = soup.find('title')
        if title_tag:
            page_data['title'] = self.clean_text(title_tag.get_text())
        
        # Extraer meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            page_data['meta_description'] = self.clean_text(meta_desc['content'])
        
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
            'pages': list(self.all_pages_content.values())
        }, ensure_ascii=False, indent=2)
    
    def generate_markdown_report(self):
        """Genera un reporte en formato Markdown"""
        md = []
        md.append("# Contenido Web - Libertia.es")
        md.append("")
        md.append(f"**Fecha de extracción:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        md.append(f"**Total de páginas:** {len(self.all_pages_content)}")
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
        
        return txt_filename, json_filename, md_filename


def main():
    print("""
    ╔═══════════════════════════════════════════════════════════╗
    ║     LIBERTIA.ES - Extractor de Contenido Web              ║
    ║     Script para renovación de página web                  ║
    ╚═══════════════════════════════════════════════════════════╝
    """)
    
    scraper = LibertiaWebScraper("https://libertia.es")
    
    # Ejecutar scraping
    scraper.scrape_all()
    
    # Guardar reportes
    print("\n📁 Generando reportes...")
    txt_file, json_file, md_file = scraper.save_reports()
    
    print("\n" + "=" * 60)
    print("✨ Proceso completado exitosamente")
    print("=" * 60)
    print(f"""
Archivos generados:
  • {txt_file} - Formato texto plano
  • {json_file} - Formato JSON estructurado
  • {md_file} - Formato Markdown

El archivo JSON es ideal para procesar los datos programáticamente.
El archivo Markdown es perfecto para visualizar el contenido de forma ordenada.
El archivo TXT es útil para una revisión rápida del contenido.
    """)


if __name__ == "__main__":
    main()

