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
        from_attribute=True