"""
Corregir asignación de fotos del equipo según el orden del CSS
Orden en CSS:
1. MG_0683-1.jpg = Luis Morcillo
2. MG_0381-1-1.jpg = Alicia Díaz  
3. MG_0356-1.jpg = Álvaro Sepúlveda
"""

import os
import urllib.request
import shutil

# Asignación correcta basada en el orden del CSS
correct_assignments = {
    "luis_morcillo": "https://libertia.es/wp-content/uploads/2022/10/MG_0683-1.jpg",
    "alicia_diaz": "https://libertia.es/wp-content/uploads/2022/10/MG_0381-1-1.jpg",
    "alvaro_sepulveda": "https://libertia.es/wp-content/uploads/2022/10/MG_0356-1.jpg",
}

output_dir = "libertia-web/public/images/team_real"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for name, url in correct_assignments.items():
    ext = url.split('.')[-1].split('?')[0]
    filename = f"{name}.{ext}"
    filepath = os.path.join(output_dir, filename)
    
    try:
        print(f"Descargando {name} desde {url.split('/')[-1]}...")
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        
        print(f"  ✓ Guardado en {filepath}")
    except Exception as e:
        print(f"  ✗ Error: {e}")

print("\n¡Asignación corregida!")
print("\nAsignaciones finales:")
print("  Luis Morcillo    <- MG_0683-1.jpg")
print("  Alicia Díaz      <- MG_0381-1-1.jpg")
print("  Álvaro Sepúlveda <- MG_0356-1.jpg")

