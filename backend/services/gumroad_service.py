import httpx
import os
from typing import List, Dict, Optional
from pydantic import BaseModel
from datetime import datetime
from fastapi import HTTPException
import json

class GumroadProduct(BaseModel):
    id: str
    name: str
    price: float
    description: str
    currency: str = "EUR"
    permalink: str
    short_url: str
    preview_url: Optional[str] = None
    formatted_price: str
    published: bool = True

class GumroadSale(BaseModel):
    sale_id: str
    product_id: str
    product_name: str
    price: float
    currency: str
    email: str
    license_key: Optional[str] = None
    created_at: datetime

class GumroadService:
    def __init__(self):
        self.access_token = os.getenv("GUMROAD_ACCESS_TOKEN")
        self.base_url = "https://api.gumroad.com/v2"
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
    
    async def test_connection(self) -> Dict:
        """Test connection to Gumroad API"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/user",
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    user_data = response.json()
                    return {
                        "success": True,
                        "user": user_data.get("user", {}),
                        "message": "Connexion réussie à Gumroad"
                    }
                else:
                    return {
                        "success": False,
                        "error": f"Erreur API: {response.status_code}",
                        "message": "Échec de la connexion à Gumroad"
                    }
                    
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "message": "Erreur de connexion à Gumroad"
            }
    
    async def get_products(self) -> List[GumroadProduct]:
        """Retrieve all products from Gumroad"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/products",
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=response.status_code, 
                        detail=f"Erreur API Gumroad: {response.status_code}"
                    )
                
                data = response.json()
                products = []
                
                for product_data in data.get("products", []):
                    # Convert price from cents to euros
                    price_in_euros = float(product_data.get("price", 0)) / 100.0
                    
                    product = GumroadProduct(
                        id=product_data["id"],
                        name=product_data["name"],
                        price=price_in_euros,
                        description=product_data.get("description", ""),
                        currency="EUR",
                        permalink=product_data.get("url_params", ""),
                        short_url=product_data.get("short_url", ""),
                        preview_url=product_data.get("preview_url"),
                        formatted_price=f"{price_in_euros:.0f}€",
                        published=product_data.get("published", True)
                    )
                    products.append(product)
                
                return products
                
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Service indisponible: {str(e)}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Erreur API Gumroad")
    
    async def get_product(self, product_id: str) -> GumroadProduct:
        """Retrieve a specific product from Gumroad"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/products/{product_id}",
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code == 404:
                    raise HTTPException(status_code=404, detail="Produit non trouvé")
                
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=response.status_code, 
                        detail=f"Erreur API Gumroad: {response.status_code}"
                    )
                
                data = response.json()
                product_data = data["product"]
                
                price_in_euros = float(product_data.get("price", 0)) / 100.0
                
                return GumroadProduct(
                    id=product_data["id"],
                    name=product_data["name"],
                    price=price_in_euros,
                    description=product_data.get("description", ""),
                    currency="EUR",
                    permalink=product_data.get("url_params", ""),
                    short_url=product_data.get("short_url", ""),
                    preview_url=product_data.get("preview_url"),
                    formatted_price=f"{price_in_euros:.0f}€",
                    published=product_data.get("published", True)
                )
                
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Service indisponible: {str(e)}")
    
    async def verify_license(self, license_key: str, permalink: str) -> Dict:
        """Verify a license key for a product"""
        try:
            async with httpx.AsyncClient() as client:
                payload = {
                    "product_permalink": permalink,
                    "license_key": license_key
                }
                
                response = await client.post(
                    f"{self.base_url}/licenses/verify",
                    json=payload,
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    return {
                        "success": False,
                        "message": "Vérification de licence échouée"
                    }
                
                return response.json()
                
        except Exception as e:
            return {
                "success": False,
                "message": f"Erreur de vérification: {str(e)}"
            }

    async def create_product(self, name: str, price: float, description: str) -> Dict:
        """Create a new product on Gumroad"""
        try:
            async with httpx.AsyncClient() as client:
                payload = {
                    "name": name,
                    "price": int(price * 100),  # Convert euros to cents
                    "description": description,
                    "currency": "EUR"
                }
                
                response = await client.post(
                    f"{self.base_url}/products",
                    json=payload,
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    return {
                        "success": True,
                        "product": response.json()
                    }
                else:
                    return {
                        "success": False,
                        "error": f"Erreur de création: {response.status_code}"
                    }
                    
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }