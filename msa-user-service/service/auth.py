# JWT 로그인 처리
from sqlalchemy import and_
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