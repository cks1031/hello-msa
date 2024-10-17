# JWT 로그인 처리
import bcrypt
from sqlalchemy.orm import Session
from models.user import User
from schema.user import UserLogin, Token


def userlogin(login:UserLogin, db:Session):
    loginuser = db.query(User)\
        .filter(User.userid == login.userid,
                User.passwd == login.passwd).first()
    print(loginuser)

    if loginuser is None:
        token = None
    else:
        # token = "{'access_token':'hello, world', 'token_type':'bearer'}"
        token = Token(access_token='hello', token_type="Bearer")

    return token

# 비밀번호 암호화
# bcrypt : 비밀번호 단방향 암호화에 자주 사용하는 패키지
# 암호화 방법 : 사용자의 비밀번호 + bcryptd 고유한 솔트

def hashed_password(passwd):
    SALT = bcrypt.gensalt() # 솔트 생성
    hashed_passwd = bcrypt.hashpw(passwd.encode('utf-8'), SALT)
    print(hashed_passwd)

    return hashed_passwd