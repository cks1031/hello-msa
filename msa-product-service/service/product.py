from sqlalchemy.orm import Session
from models.product import Product
from schema.product import ProductBase

# 상품등록 처리
def register(db:Session, product:ProductBase):
    product = Product(**product.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    print(product)

    return product

def productlist(db:Session):
    return db.query(Product.pno, Product.name, Product.price, Product.regdate)\
           .order_by(Product.pno.desc()).all()