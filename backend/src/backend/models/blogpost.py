from typing import Optional
from backend.databases.mongo_db import MongoEntry
from pydantic import BaseModel, Field
from datetime import datetime, timezone


from typing import Any

class BlogPost(MongoEntry):
    slug: str
    title: str
    author: str
    date: datetime = Field(default_factory=datetime.now(timezone.utc))
    contentBlocks: list[dict[str, Any]]
    category: str
    imageUrl: str
