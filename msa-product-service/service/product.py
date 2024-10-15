from sqlalchemy.orm import Session
from models.product import Product
from schema.product import ProductBase

def register(db:Session, product:ProductBase):
    product = Product(**product.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    print(product)

    return product