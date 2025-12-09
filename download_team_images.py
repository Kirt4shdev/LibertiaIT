"""
Descargar las imágenes reales del equipo de Libertia IT
"""

import os
import urllib.request

# Imágenes encontradas en el CSS de Libertia
team_images = {
    "luis_morcillo": "https://libertia.es/wp-content/uploads/2022/10/MG_0381-1-1.jpg",
    "alicia_diaz": "https://libertia.es/wp-content/uploads/2022/10/MG_0683-1.jpg",
    "alvaro_sepulveda": "https://libertia.es/wp-content/uploads/2022/10/MG_0356-1.jpg",
    "julia_ruiz": "https://libertia.es/wp-content/uploads/2023/01/Julia-Ruiz.jpg",
    "daniel_gonzalez": "https://libertia.es/wp-content/uploads/2025/11/daniel_gonzalez_coordinador_soporte_sistemas-1.webp",
    "carlos_larrarte": "https://libertia.es/wp-content/uploads/2025/11/carlos_larrarte_ciberseguridad_y_sistemas.webp",
    "maximo_danylyuk": "https://libertia.es/wp-content/uploads/2025/11/maximo_danylyuk_sistemas_y_redes.webp",
    "angel_valiente": "https://libertia.es/wp-content/uploads/2025/11/angel_valiente_soporte_y_sistemas.webp",
    "alberto_serrano": "https://libertia.es/wp-content/uploads/2025/11/alberto_serrano_ciberseguridad_y_soc.webp",
    "inigo_bolado": "https://libertia.es/wp-content/uploads/2025/11/inigo_bolado_soporte_y_sistemas.webp",
}

output_dir = "libertia-web/public/images/team_real"
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for name, url in team_images.items():
    ext = url.split('.')[-1].split('?')[0]
    filename = f"{name}.{ext}"
    filepath = os.path.join(output_dir, filename)
    
    try:
        print(f"Descargando {name}...")
        
        # Crear request con headers
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        
        print(f"  ✓ Guardado en {filepath}")
    except Exception as e:
        print(f"  ✗ Error descargando {name}: {e}")

print("\n¡Descarga completada!")
print("\nAhora actualiza content.js con estas rutas:")
for name in team_images.keys():
    ext = team_images[name].split('.')[-1].split('?')[0]
    print(f'  {{ name: "...", image: "/images/team_real/{name}.{ext}" }}')

