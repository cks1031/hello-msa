import sqlalchemy
from models.user import Base
from sqlalchemy.orm import sessionmaker

db_url = 'sqlite:///user.db'

engine = sqlalchemy.create_engine(db_url, echo=True)
SessionLocal = sessionmaker(autocommit=False,autoflush=False, bind=engine)

def create_tales():
    Base.metadata.create_all(bind=engine)

def get_db():
    with SessionLocal() as db:
        yield db