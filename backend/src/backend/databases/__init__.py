from backend.databases.mongo_db import MongoDBDatabase

_mongo_db_instance: MongoDBDatabase | None = None

async def get_mongo_db() -> MongoDBDatabase:
    global _mongo_db_instance
    if _mongo_db_instance is None:
        _mongo_db_instance = MongoDBDatabase()
        await _mongo_db_instance.ping()
    return _mongo_db_instance
