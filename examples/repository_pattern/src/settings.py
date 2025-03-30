import os
from dataclasses import dataclass


@dataclass
class Settings:
    repository_type: str = os.getenv("REPOSITORY_TYPE", "local")
    db_url: str = os.getenv("DB_URL", "postgresql://postgres:postgres@localhost:5432/postgres")

def get_settings() -> Settings:
    return Settings()
