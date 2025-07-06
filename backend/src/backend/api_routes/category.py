from fastapi import APIRouter, HTTPException, status
from typing import List
from backend.models.category import Category
from backend.databases import get_mongo_db
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=Category, status_code=status.HTTP_201_CREATED)
async def create_category(category: Category):
    db = await get_mongo_db()
    try:
        category_id = await db.add_entry(category)
        category.id = category_id
        return category
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[Category])
async def get_all_categories():
    db = await get_mongo_db()
    try:
        categories = await db.get_entries(Category)
        return categories
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/{category_id}", response_model=Category)
async def get_category(category_id: str):
    db = await get_mongo_db()
    try:
        if not ObjectId.is_valid(category_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ObjectId format")
        category = await db.get_entry(ObjectId(category_id), Category)
        if category is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
        return category
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/{category_id}", response_model=Category)
async def update_category(category_id: str, category: Category):
    db = await get_mongo_db()
    try:
        if not ObjectId.is_valid(category_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ObjectId format")
        
        if category.id and category.id != category_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID in request body does not match path ID")

        category.id = category_id

        success = await db.update_entry(category_id, entity=category)
        if not success:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found or no changes made")
        
        updated_category = await db.get_entry(ObjectId(category_id), Category)
        return updated_category
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(category_id: str):
    db = await get_mongo_db()
    try:
        if not ObjectId.is_valid(category_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ObjectId format")
        success = await db.delete_entity(category_id, class_type=Category)
        if not success:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
        return
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
