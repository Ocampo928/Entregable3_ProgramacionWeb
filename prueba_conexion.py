from sqlalchemy import create_engine

USER = "root"
PASSWORD = "***"
HOST = "127.0.0.1"
PORT = "3306"
DB_NAME = "equipos_pokemon"

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"

try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    with engine.connect() as conn:
        print("✅ Conexión exitosa a la base de datos MySQL.")
except Exception as e:
    print("❌ Error de conexión:", e)
