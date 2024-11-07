# 회원 가입 처리
from sqlalchemy.orm import Session
from models.user import User
from schema.user import UserBase
from service.auth import hashed_password


# 회원가입 처리
# 기본 회원정보 + 번호, 가입일
def register(db:Session, user: UserBase):
    # 비밀번호 암호화
    hashed_passwd = hashed_password(user.passwd)

    user = User(**user.model_dump())
    user.passwd = hashed_passwd # 기본 비밀번호 교체
    db.add(user)
    db.commit()
    db.refresh(user)
    print(user)

    return user

# 회원 목록 조회
def userlist(db:Session):
    return db.query(User.mno, User.userid, User.name, User.regdate).all()

def userone(db:Session, mno: int):
    return db.query(User).filter(User.mno == mno).first()

def userdelete(db:Session, mno: int):

    user =  db.query(User).filter(User.mno == mno).first()

    if user:
        db.delete(user)
        db.commit()
    else:
        return None

    return 1