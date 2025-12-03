from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from geoalchemy2.elements import WKTElement
from app.core.database import get_db
from app.models.sample import GeologicalSample
from app.schemas.sample import SampleCreate, SampleResponse
from typing import List

router = APIRouter()

@router.post("/", response_model=SampleResponse)
def create_sample(sample: SampleCreate, db: Session = Depends(get_db)):
    point = WKTElement(f'POINT({sample.longitude} {sample.latitude})', srid=4326)
    
    db_sample = GeologicalSample(
        sample_id=sample.sample_id,
        rock_type=sample.rock_type,
        description=sample.description,
        location=point,
        strike=sample.strike,
        dip=sample.dip,
        collector=sample.collector,
        notes=sample.notes
    )
    
    db.add(db_sample)
    db.commit()
    db.refresh(db_sample)
    
    return {
        "id": db_sample.id,
        "sample_id": db_sample.sample_id,
        "rock_type": db_sample.rock_type,
        "description": db_sample.description,
        "latitude": sample.latitude,
        "longitude": sample.longitude,
        "strike": db_sample.strike,
        "dip": db_sample.dip,
        "collector": db_sample.collector,
        "collection_date": db_sample.collection_date,
        "notes": db_sample.notes
    }

@router.get("/", response_model=List[SampleResponse])
def get_samples(db: Session = Depends(get_db)):
    samples = db.query(GeologicalSample).all()
    return samples
