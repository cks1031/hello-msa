from pydantic import BaseModel

class ProductBase(BaseModel):
    name : str
    desc : str
    price : int
    maker : str
    regdate : str

class Product(ProductBase):
    pno: int

    class Config:
        from_attributes=True

class ProductList(BaseModel):
    pno: int
    name: str
    price: int
    regdate: str

    class Config:
        from_attributes=True
