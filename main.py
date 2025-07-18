from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models, schemas
from typing import List


from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Permitir llamadas desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # para desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/equipos/", response_model=schemas.Equipo)
def crear_equipo(equipo: schemas.EquipoCreate, db: Session = Depends(get_db)):
    if len(equipo.pokemones) > 6:
        raise HTTPException(status_code=400, detail="Un equipo solo puede tener hasta 6 Pokémon.")
    
    db_equipo = models.Equipo(nombre=equipo.nombre)
    db.add(db_equipo)
    db.commit()
    db.refresh(db_equipo)

    for poke in equipo.pokemones:
        db_pokemon = models.Pokemon(
            nombre=poke.nombre,
            imagen_url=poke.imagen_url,
            equipo_id=db_equipo.id
        )
        db.add(db_pokemon)

    db.commit()
    db.refresh(db_equipo)
    return db_equipo

@app.get("/equipos/", response_model=List[schemas.Equipo])
def listar_equipos(db: Session = Depends(get_db)):
    return db.query(models.Equipo).all()
