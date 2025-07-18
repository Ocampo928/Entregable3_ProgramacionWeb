# Entregable3_ProgramacionWeb
Aplicación web interactiva desarrollada con HTML, CSS, JavaScript y FastAPI que permite explorar Pokémon desde la PokeAPI, crear equipos personalizados de hasta 6 Pokémon y almacenarlos en una base de datos MySQL mediante una API propia.

README.txt — Proyecto Web: Pokédex y Equipos Pokémon
----------------------------------------------------

1. Clonar o copiar el repositorio en una carpeta local.

2. Crear la base de datos MySQL:

   -------------------------
   -- Abre el archivo. sql dentro de SQL Workbench --
   -------------------------


3. Configurar el archivo `database.py` con tus credenciales de MySQL:

   Ejemplo:
   USER = "root"
   PASSWORD = "tu_contraseña"
   HOST = "127.0.0.1"
   PORT = "3306"
   DB_NAME = "equipos_pokemon"

4. Instalar dependencias:

   pip install fastapi uvicorn sqlalchemy mysql-connector-python

5. Iniciar el backend (FastAPI): 

   uvicorn main:app --reload (al ejecutar main.py)

6. Iniciar el frontend:
   - Abrí `index.html` o `crear_equipo.html` con Live Server o desde el navegador.

----------------------------------------------------

🗂️ Estructura del proyecto

📁 EntregableGrupal3
├── database.py         # Conexión con MySQL
├── models.py           # Tablas SQLAlchemy
├── schemas.py          # Validación con Pydantic
├── main.py             # API FastAPI
├── prueba_conexion.py  # Test para conexión con MySQL
├── index.html          # Página principal de exploración
├── script.js           # JS para index.html
├── crear_equipo.html   # Página para crear equipos
├── crear_equipo.js     # Lógica de búsqueda y guardado
├── ver_equipo.html     # Página para visualizar equipos guardados
├── ver_equipo.js       # Lógica para cargar equipos desde API
├── styles.css          # Estilos generales
└── README.txt          # Este archivo

----------------------------------------------------

 Autores
Alejandro Ocampo, Alexa Coll y Andrey Mora
