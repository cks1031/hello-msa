from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from schema.user import User, UserBase
from service.database import get_db

router = APIRouter()

@router.post('/user', response_model=User)
async def new_user(user: UserBase, db:Session=Depends(get_db)):
    print(user)

    return {'msg': 'ok'}
