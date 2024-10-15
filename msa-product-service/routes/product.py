from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session


from schema.product import ProductBase, Product
from service.database import get_db
from service.product import register

router = APIRouter()

@router.post('/product', response_model=Product)
async def new_product(product: ProductBase, db: Session=Depends(get_db)):
    print(product)

    return register(db, product)