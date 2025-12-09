"""
Script para extraer las imágenes del equipo de Libertia IT
Las imágenes están en elementos flip-box de Elementor con background-image
"""

import requests
from bs4 import BeautifulSoup
import re
import os
import urllib.request

def extract_team_images():
    url = "https://libertia.es/sobre-nosotros/"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    print(f"Descargando página: {url}")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error al descargar la página: {response.status_code}")
        return
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Buscar todos los elementos flip-box
    flip_boxes = soup.find_all('div', class_=re.compile(r'elementor-flip-box'))
    print(f"Encontrados {len(flip_boxes)} elementos flip-box")
    
    # Buscar imágenes en estilos inline
    all_styles = soup.find_all(style=True)
    
    image_urls = []
    
    # Buscar background-image en estilos inline
    for element in all_styles:
        style = element.get('style', '')
        # Buscar URLs de background-image
        matches = re.findall(r'background-image\s*:\s*url\(["\']?(.*?)["\']?\)', style)
        for match in matches:
            if 'libertia' in match or 'wp-content' in match:
                image_urls.append(match)
    
    # También buscar en tags <style>
    style_tags = soup.find_all('style')
    for style_tag in style_tags:
        if style_tag.string:
            matches = re.findall(r'background-image\s*:\s*url\(["\']?(.*?)["\']?\)', style_tag.string)
            for match in matches:
                image_urls.append(match)
    
    # Buscar imágenes en data attributes
    elements_with_data = soup.find_all(attrs={'data-settings': True})
    for el in elements_with_data:
        data = el.get('data-settings', '')
        # Buscar URLs de imágenes
        matches = re.findall(r'"url":"(https?://[^"]+)"', data)
        for match in matches:
            if any(ext in match.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                image_urls.append(match)
    
    # Buscar todas las imágenes en la sección del equipo
    team_section = soup.find('h2', string=re.compile(r'Un equipo experto'))
    if team_section:
        parent = team_section.find_parent('section')
        if parent:
            all_imgs = parent.find_all('img')
            for img in all_imgs:
                src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
                if src:
                    image_urls.append(src)
    
    # Buscar imágenes con patrones de nombres de equipo
    all_imgs = soup.find_all('img')
    for img in all_imgs:
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
        alt = img.get('alt', '').lower()
        if src and any(name in alt for name in ['luis', 'alicia', 'alvaro', 'daniel', 'carlos', 'maximo', 'angel', 'alberto', 'iñigo', 'inigo']):
            image_urls.append(src)
    
    # Eliminar duplicados
    image_urls = list(set(image_urls))
    
    print(f"\nImágenes encontradas: {len(image_urls)}")
    for i, url in enumerate(image_urls, 1):
        print(f"  {i}. {url}")
    
    # También imprimir el HTML de la sección del equipo para análisis
    print("\n\nBuscando sección del equipo...")
    
    # Buscar flip-box con nombres del equipo
    team_names = ['Luis Morcillo', 'Alicia Díaz', 'Álvaro Sepúlveda', 'Daniel González', 
                  'Carlos Larrarte', 'Máximo Danylyuk', 'Ángel Valiente', 'Alberto Serrano', 'Iñigo Bolado']
    
    for name in team_names:
        elements = soup.find_all(string=re.compile(name))
        for el in elements:
            # Subir en el árbol para encontrar el contenedor flip-box
            parent = el.parent
            for _ in range(10):  # Subir hasta 10 niveles
                if parent:
                    if 'flip-box' in str(parent.get('class', [])):
                        # Buscar imagen en este contenedor
                        imgs = parent.find_all('img')
                        styles = parent.find_all(style=True)
                        print(f"\n{name}:")
                        for img in imgs:
                            print(f"  IMG: {img.get('src')}")
                        for s in styles:
                            style_val = s.get('style', '')
                            if 'background' in style_val:
                                print(f"  STYLE: {style_val[:200]}...")
                        break
                    parent = parent.parent
    
    return image_urls

if __name__ == "__main__":
    extract_team_images()

