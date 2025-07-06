import asyncio
from contextlib import asynccontextmanager

import uvicorn
from backend.api_routes import blog, category
from backend.databases import get_mongo_db
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import logging


logging.basicConfig(level=logging.DEBUG)
logging.getLogger('pymongo').setLevel(logging.WARNING)

@asynccontextmanager
async def lifespan(app: FastAPI):
    mdb = await get_mongo_db()
    yield
    mdb.client.close()

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:4200",
    "http://mkpatka.duckdns.org:8080",
    "http://mkpatka.duckdns.org:5000",
    "https://nnikolovskiii.ngrok.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blog.router, prefix="/blog", tags=["blog"])
app.include_router(category.router, prefix="/category", tags=["category"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
