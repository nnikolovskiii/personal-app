from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from backend.models.blogpost import BlogPost
from backend.databases import get_mongo_db
from bson import ObjectId
from fastapi import UploadFile, File

router = APIRouter()



@router.post("/", response_model=BlogPost, status_code=status.HTTP_201_CREATED)
async def create_blog_post(blog_post: BlogPost):
    db = await get_mongo_db()
    try:
        post_id = await db.add_entry(blog_post)
        blog_post.id = post_id
        return blog_post
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    db = await get_mongo_db()
    try:
        if not ObjectId.is_valid(post_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ObjectId format")
        blog_post = await db.get_entry(ObjectId(post_id), BlogPost)
        if blog_post is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found")
        return blog_post
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, blog_post: BlogPost):
    db = await get_mongo_db()
    try:
        if not ObjectId.is_valid(post_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ObjectId format")
        
        # Ensure the ID in the request body matches the path ID
        if blog_post.id and blog_post.id != post_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID in request body does not match path ID")

        # Set the ID from the path for the update operation
        blog_post.id = post_id

        success = await db.update_entry(post_id, entity=blog_post)
        if not success:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found or no changes made")
        
        updated_post = await db.get_entry(ObjectId(post_id), BlogPost)
        return updated_post
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog_post(post_id: str):
    db = await get_mongo_db()
    try:
        if not ObjectId.is_valid(post_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ObjectId format")
        success = await db.delete_entity(post_id, class_type=BlogPost)
        if not success:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found")
        return
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[BlogPost])
async def get_blog_posts(
    category: Optional[str] = Query(None, description="Category to filter by"),
    sort_by: Optional[str] = Query("date", description="Field to sort by (e.g., 'date', 'title')"),
    sort_order: Optional[str] = Query("desc", description="Sort order ('asc' or 'desc')")
):
    db = await get_mongo_db()
    try:
        doc_filter = {}
        if category:
            doc_filter["category"] = category
            
        sort_field = sort_by if sort_by in ["date", "title"] else "date"
        order = 1 if sort_order == "asc" else -1
        sort_options = [(sort_field, order)]

        blog_posts = await db.get_entries(BlogPost, doc_filter=doc_filter, sort=sort_options)
        
        return blog_posts or []
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))