from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Equipo(Base):
    __tablename__ = "equipos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)

    pokemones = relationship("Pokemon", back_populates="equipo")

class Pokemon(Base):
    __tablename__ = "pokemones"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    imagen_url = Column(String)
    equipo_id = Column(Integer, ForeignKey("equipos.id"))

    equipo = relationship("Equipo", back_populates="pokemones")
