from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SampleCreate(BaseModel):
    sample_id: str
    rock_type: str
    description: str
    latitude: float
    longitude: float
    strike: Optional[float] = None
    dip: Optional[float] = None
    collector: str
    notes: Optional[str]

    class Config:
        from_attributes = True
