from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from src.settings import get_settings


def fetch_db_sessionmaker() -> sessionmaker:
    engine = create_engine(
        get_settings().db_url,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
    )
    return sessionmaker(bind=engine)


def get_db_session() -> Session:
    sessionmaker = fetch_db_sessionmaker()
    session = sessionmaker()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()
