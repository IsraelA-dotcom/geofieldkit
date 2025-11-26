from sqlalchemy import Column, Integer, String, DateTime, Float, Text
from geoalchemy2 import Geometry
from datetime import datetime
from app.core.database import Base

class GeologicalSample(Base):
__tablename__="geological-samples"

id = Column(Integer, primary-key=True, index=True)
sample_id = Column(String, unique=True, index=True)
rock_type = Column(String)
description = Column(Text)
location = Column(Geometry('POINT', srid=4326))
strike = Column(Float, nullable=True)
dip = Column(Float, nullable=True)
collector = Column(String)
collection_date = Column(DateTime, default=datetime.utcnow)
photo_url = Column(String, nullable=True)
notes = Column(Text, nullable=True)
