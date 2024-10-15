from pydantic import BaseModel

class UserBase(BaseModel):
    userid: str
    passwd: str
    name: str
    email: str

class User(UserBase):
    mno: int
    regdate: str

    # ORM  맵핑을 위한 설정
    # 데이터베이스 테이블 각 행 <-> pydantic
    class Config:
        from_attribute=True