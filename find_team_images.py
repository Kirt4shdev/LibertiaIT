"""
Buscar imágenes del equipo en el servidor de Libertia
"""

import requests
from bs4 import BeautifulSoup
import re

def find_images():
    url = "https://libertia.es/sobre-nosotros/"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.get(url, headers=headers)
    
    # Buscar todas las URLs que contengan wp-content/uploads
    all_urls = re.findall(r'https://libertia\.es/wp-content/uploads/[^\s"\')]+', response.text)
    
    # Filtrar solo imágenes
    image_urls = [u for u in all_urls if any(ext in u.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif'])]
    
    # Eliminar duplicados y ordenar
    image_urls = sorted(set(image_urls))
    
    print(f"Total de imágenes encontradas: {len(image_urls)}\n")
    
    # Agrupar por tipo
    team_possible = []
    other = []
    
    for url in image_urls:
        # Imágenes que podrían ser del equipo (retratos, fotos, etc)
        if any(word in url.lower() for word in ['luis', 'alicia', 'alvaro', 'daniel', 'carlos', 'maximo', 'angel', 'alberto', 'inigo', 'team', 'equipo', 'about', 'perfil', 'foto']):
            team_possible.append(url)
        elif '2024' in url or '2025' in url or '2023' in url:
            # Imágenes recientes podrían ser del equipo
            team_possible.append(url)
        else:
            other.append(url)
    
    print("=== POSIBLES IMÁGENES DEL EQUIPO ===")
    for url in team_possible:
        print(url)
    
    print(f"\n=== OTRAS IMÁGENES ({len(other)}) ===")
    for url in other[:30]:  # Solo las primeras 30
        print(url)
    
    # También buscar en CSS/JS externos
    print("\n\n=== Buscando en hojas de estilo ===")
    css_links = re.findall(r'href=["\']([^"\']+\.css[^"\']*)["\']', response.text)
    
    for css_url in css_links[:5]:  # Solo las primeras 5
        if css_url.startswith('/'):
            css_url = 'https://libertia.es' + css_url
        elif not css_url.startswith('http'):
            continue
            
        try:
            css_response = requests.get(css_url, headers=headers, timeout=5)
            css_images = re.findall(r'url\(["\']?(https://libertia\.es/wp-content/uploads/[^"\')]+)["\']?\)', css_response.text)
            if css_images:
                print(f"\nEn {css_url}:")
                for img in set(css_images):
                    print(f"  {img}")
        except:
            continue
    
    # Buscar data-settings con URLs de imágenes
    print("\n\n=== Buscando en data-settings ===")
    data_settings = re.findall(r'data-settings=["\']([^"\']+)["\']', response.text)
    
    for ds in data_settings:
        # Decodificar HTML entities
        ds_decoded = ds.replace('&quot;', '"').replace('&#039;', "'")
        img_matches = re.findall(r'"url":"(https://[^"]+)"', ds_decoded)
        for img in img_matches:
            if any(ext in img.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                print(f"  {img}")

if __name__ == "__main__":
    find_images()

