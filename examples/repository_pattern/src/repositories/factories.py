from src.repositories.base_repository import BaseRepository
from src.repositories.local.user_repository import get_local_user_repository
from src.repositories.postgresql.user_repository import get_postgresql_user_repository
from src.settings import get_settings


def get_user_repository() -> BaseRepository:
    settings = get_settings()
    match settings.repository_type:
        case "postgresql":
            return get_postgresql_user_repository()
        case "local":
            return get_local_user_repository()
        case _:
            raise ValueError(f"Unknown repository type: {settings.repository_type}")
