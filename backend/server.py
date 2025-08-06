from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict
import uuid
from datetime import datetime
from services.gumroad_service import GumroadService, GumroadProduct


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize Gumroad service
gumroad_service = GumroadService()


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class LicenseVerificationRequest(BaseModel):
    license_key: str
    permalink: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Gumroad endpoints
@api_router.get("/gumroad/test")
async def test_gumroad_connection():
    """Test connection to Gumroad API"""
    return await gumroad_service.test_connection()

@api_router.get("/gumroad/products", response_model=List[GumroadProduct])
async def get_gumroad_products():
    """Get all products from Gumroad"""
    try:
        return await gumroad_service.get_products()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des produits: {str(e)}")

@api_router.get("/gumroad/products/{product_id}", response_model=GumroadProduct)
async def get_gumroad_product(product_id: str):
    """Get a specific product from Gumroad"""
    return await gumroad_service.get_product(product_id)

@api_router.post("/gumroad/verify-license")
async def verify_license(request: LicenseVerificationRequest):
    """Verify a license key"""
    return await gumroad_service.verify_license(request.license_key, request.permalink)

@api_router.post("/gumroad/create-products")
async def create_default_products():
    """Create the 4 default Airbnb template products"""
    default_products = [
        {
            "name": "Template Studio - Super-hôte",
            "price": 19.0,
            "description": "Template professionnel optimisé pour studio Airbnb. Augmentez vos réservations avec une annonce qui convertit !"
        },
        {
            "name": "Template Appartement - Super-hôte",
            "price": 29.0,
            "description": "Template professionnel optimisé pour appartement Airbnb. Maximisez votre taux d'occupation avec une description parfaite !"
        },
        {
            "name": "Template Maison - Super-hôte",
            "price": 39.0,
            "description": "Template professionnel optimisé pour maison Airbnb. Attirez plus de voyageurs avec une annonce irrésistible !"
        },
        {
            "name": "Kit Complet Super-hôte",
            "price": 67.0,
            "description": "Kit complet avec les 3 templates + guides bonus. Tout ce dont vous avez besoin pour devenir Super-hôte rapidement !"
        }
    ]
    
    results = []
    for product_data in default_products:
        result = await gumroad_service.create_product(
            product_data["name"],
            product_data["price"],
            product_data["description"]
        )
        results.append(result)
    
    return {"products_created": results}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
