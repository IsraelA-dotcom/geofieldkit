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
notes: Optional[str] = None

class SampleResponse(BaseModel):
id: int
sample_id: str
rock_type: str
description: str
latitude: float
longitude: float
strike: Optional[float]
dip: Optional[float]
collector: str
collection_date: datetime
notes:Optional[str]

class Config:
from_attributes = True

