# 회원 가입 처리
from sqlalchemy.orm import Session
from models.user import User
from schema.user import UserBase

# 회원가입 처리
# 기본 회원정보 + 번호, 가입일
def register(db:Session, user: UserBase):
    user = User(**user.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    print(user)

    return user

# 회원 목록 조회
def userlist(db:Session):
    return db.query(User.mno, User.userid, User.name, User.regdate).all()