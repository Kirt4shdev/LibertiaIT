"""
Script para extraer las imágenes del equipo de Libertia IT usando Selenium
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import re
import os
import urllib.request

def extract_team_images():
    # Configurar Chrome
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Sin ventana
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    print("Iniciando Chrome...")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    try:
        url = "https://libertia.es/sobre-nosotros/"
        print(f"Cargando página: {url}")
        driver.get(url)
        
        # Esperar a que la página cargue
        time.sleep(5)
        
        # Scroll para cargar todas las imágenes lazy
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(2)
        
        # Buscar elementos flip-box
        flip_boxes = driver.find_elements(By.CSS_SELECTOR, ".elementor-flip-box")
        print(f"Encontrados {len(flip_boxes)} elementos flip-box")
        
        team_images = {}
        team_names = ['Luis Morcillo', 'Alicia Díaz', 'Álvaro Sepúlveda', 'Julia Ruiz', 'Daniel González', 
                      'Carlos Larrarte', 'Máximo Danylyuk', 'Ángel Valiente', 'Alberto Serrano', 'Iñigo Bolado']
        
        for flip_box in flip_boxes:
            try:
                # Obtener el texto del flip-box
                text = flip_box.text
                
                # Ver si contiene algún nombre del equipo
                for name in team_names:
                    if name in text:
                        # Buscar imagen de fondo en este elemento
                        front_layer = flip_box.find_elements(By.CSS_SELECTOR, ".elementor-flip-box__layer--front")
                        
                        for layer in front_layer:
                            # Obtener computed style
                            bg_image = driver.execute_script(
                                "return window.getComputedStyle(arguments[0]).backgroundImage;", 
                                layer
                            )
                            
                            if bg_image and bg_image != 'none':
                                # Extraer URL
                                match = re.search(r'url\(["\']?(.*?)["\']?\)', bg_image)
                                if match:
                                    img_url = match.group(1)
                                    team_images[name] = img_url
                                    print(f"✓ {name}: {img_url}")
                            
                            # También buscar en hijos
                            children = layer.find_elements(By.CSS_SELECTOR, "*")
                            for child in children:
                                bg = driver.execute_script(
                                    "return window.getComputedStyle(arguments[0]).backgroundImage;", 
                                    child
                                )
                                if bg and bg != 'none' and 'url' in bg:
                                    match = re.search(r'url\(["\']?(.*?)["\']?\)', bg)
                                    if match:
                                        img_url = match.group(1)
                                        if name not in team_images:
                                            team_images[name] = img_url
                                            print(f"✓ {name}: {img_url}")
                        break
            except Exception as e:
                continue
        
        # Si no encontramos nada, buscar todas las imágenes de fondo en la página
        if not team_images:
            print("\nBuscando todas las imágenes de fondo en la página...")
            all_elements = driver.find_elements(By.CSS_SELECTOR, "*")
            bg_images = set()
            
            for el in all_elements[:500]:  # Limitar para no tardar demasiado
                try:
                    bg = driver.execute_script(
                        "return window.getComputedStyle(arguments[0]).backgroundImage;", 
                        el
                    )
                    if bg and bg != 'none' and 'url' in bg:
                        match = re.search(r'url\(["\']?(.*?)["\']?\)', bg)
                        if match:
                            img_url = match.group(1)
                            if 'libertia' in img_url or 'wp-content' in img_url:
                                bg_images.add(img_url)
                except:
                    continue
            
            print(f"\nImágenes de fondo encontradas: {len(bg_images)}")
            for img in bg_images:
                print(f"  - {img}")
        
        # Buscar también en elementos con data-bg
        elements_with_data_bg = driver.find_elements(By.CSS_SELECTOR, "[data-bg], [data-settings]")
        print(f"\nElementos con data-bg o data-settings: {len(elements_with_data_bg)}")
        
        for el in elements_with_data_bg:
            data_bg = el.get_attribute("data-bg")
            data_settings = el.get_attribute("data-settings")
            
            if data_bg:
                print(f"  data-bg: {data_bg}")
            
            if data_settings and 'url' in data_settings:
                matches = re.findall(r'"url":"([^"]+)"', data_settings)
                for m in matches:
                    if any(ext in m.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                        print(f"  data-settings url: {m}")
        
        # Obtener HTML de la sección del equipo
        print("\n\nAnalizando sección del equipo...")
        team_section = driver.find_elements(By.XPATH, "//*[contains(text(), 'Un equipo experto')]")
        if team_section:
            section = team_section[0].find_element(By.XPATH, "./ancestor::section")
            html = section.get_attribute('innerHTML')
            
            # Buscar todas las URLs de imágenes
            urls = re.findall(r'https?://[^"\'\s>]+\.(?:jpg|jpeg|png|webp)', html)
            print(f"URLs de imágenes en sección del equipo: {len(urls)}")
            for url in set(urls):
                print(f"  - {url}")
        
        return team_images
        
    finally:
        driver.quit()

def download_images(team_images, output_dir="libertia-web/public/images/team_real"):
    """Descargar las imágenes encontradas"""
    if not team_images:
        return
        
    os.makedirs(output_dir, exist_ok=True)
    
    for name, url in team_images.items():
        safe_name = name.lower().replace(' ', '_').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ñ', 'n')
        ext = url.split('.')[-1].split('?')[0]
        filename = f"{safe_name}.{ext}"
        filepath = os.path.join(output_dir, filename)
        
        try:
            print(f"Descargando {name}...")
            urllib.request.urlretrieve(url, filepath)
            print(f"  ✓ Guardado en {filepath}")
        except Exception as e:
            print(f"  ✗ Error: {e}")

if __name__ == "__main__":
    images = extract_team_images()
    if images:
        print(f"\n\nResumen - {len(images)} imágenes encontradas:")
        for name, url in images.items():
            print(f"  {name}: {url}")
        
        download = input("\n¿Descargar imágenes? (s/n): ")
        if download.lower() == 's':
            download_images(images)

