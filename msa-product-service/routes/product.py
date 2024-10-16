from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session


from schema.product import ProductBase, Product, ProductList
from service.database import get_db
from service.product import register, productlist

router = APIRouter()

@router.post('/product', response_model=Product)
async def new_product(product: ProductBase, db: Session=Depends(get_db)):
    print(product)

    return register(db, product)

@router.get('/products', response_model=list[ProductList])
async def list_products(db: Session=Depends(get_db)):
    products = productlist(db)

    return [ProductList.model_validate(p) for p in products]