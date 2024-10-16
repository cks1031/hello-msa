from typing import Optional

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session

from schema.user import User, UserBase, UserList
from service.database import get_db
from service.user import register, userlist, userone

router = APIRouter()

@router.post('/user', response_model=User)
async def new_user(user: UserBase, db:Session=Depends(get_db)):
    print(user)

    return register(db, user)

@router.get('/users', response_model=list[UserList])
async def list_users(db:Session=Depends(get_db)):
    users = userlist(db)

    # 테이블 조회한 결과 객체를
    # UserList 형식의 배열로 재생성
    # return [UserList.from_orm(u) for u in users]
    return [UserList.model_validate(u) for u in users]

@router.get('/user/{mno}', response_model=Optional[User])
async def user_one(mno: int, db:Session=Depends(get_db)):
    user = userone(db, mno)

    # 회원이 조회되지 않을 경우 응답코드 404를 프론트엔드로 전달
    if user is None:
        raise HTTPException(404, 'Member not found!!')

    return User.model_validate(user)
