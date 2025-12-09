"""
Verificar el orden de las fotos en el CSS de Libertia
"""

import requests
import re

url = "https://libertia.es/wp-content/litespeed/css/A.64ea19bd44de9e8a65ff6483bee11623.css,qver=19f14.pagespeed.cf.YnwQDFa3Qo.css"

headers = {'User-Agent': 'Mozilla/5.0'}

response = requests.get(url, headers=headers)

# Buscar todas las referencias a fotos del equipo
team_photos = re.findall(r'url\(["\']?(https://libertia\.es/wp-content/uploads/[^"\')\s]+(?:MG_\d+|[a-z_]+(?:soporte|sistemas|ciberseguridad|coordinador|redes|soc))[^"\')\s]*)["\']?\)', response.text, re.IGNORECASE)

print("Fotos del equipo encontradas en orden de aparición en CSS:\n")

seen = set()
for i, photo in enumerate(team_photos, 1):
    if photo not in seen:
        seen.add(photo)
        # Extraer nombre del archivo
        filename = photo.split('/')[-1]
        print(f"{i}. {filename}")
        print(f"   URL: {photo}\n")

# Buscar el contexto alrededor de las fotos MG
print("\n\nBuscando contexto de las fotos MG_xxxx:")
for mg_photo in ['MG_0381', 'MG_0683', 'MG_0356']:
    idx = response.text.find(mg_photo)
    if idx > -1:
        context = response.text[max(0, idx-200):idx+200]
        # Buscar selectores CSS cercanos
        selectors = re.findall(r'\.elementor-\d+', context)
        print(f"\n{mg_photo}:")
        print(f"  Selectores cercanos: {set(selectors)}")

