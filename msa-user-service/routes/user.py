from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    userid: str
    passwd: str
    name: str
    email: str

@router.post('/user')
async def new_user(user: User):
    print(user)
    return {'msg': 'ok'}
