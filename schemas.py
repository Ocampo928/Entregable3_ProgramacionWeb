from pydantic import BaseModel
from typing import List

class PokemonCreate(BaseModel):
    nombre: str
    imagen_url: str

class Pokemon(PokemonCreate):
    id: int
    class Config:
        orm_mode = True

class EquipoCreate(BaseModel):
    nombre: str
    pokemones: List[PokemonCreate]

class Equipo(BaseModel):
    id: int
    nombre: str
    pokemones: List[Pokemon]
    class Config:
        orm_mode = True
