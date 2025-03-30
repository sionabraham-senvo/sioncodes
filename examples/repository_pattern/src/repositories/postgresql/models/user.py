from src.repositories.postgresql.models.base import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped
from src.domains import user as domain


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = Column(Integer, primary_key=True, index=True)
    first_name: Mapped[str] = Column(String, index=True)
    last_name: Mapped[str] = Column(String, index=True)
    username: Mapped[str] = Column(String, unique=True, index=True)
    email: Mapped[str] = Column(String, unique=True, index=True)

    def to_domain(self) -> domain.User:
        return domain.User(
            id=self.id,
            first_name=self.first_name,
            last_name=self.last_name,
            username=self.username,
            email=self.email
        )
