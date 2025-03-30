from sqlalchemy.orm import Session

from src.domains.user import User, UserCreate, UserUpdate
from src.repositories.postgresql.base_postgresql_repository import PostgreSQLRepository

from src.repositories.postgresql import models
from src.repositories.postgresql.session import get_db_session
from src.repositories.postgresql.models import User as UserTable

class PostgreSQLUserRepository(PostgreSQLRepository[UserTable, UserCreate, UserUpdate, User]):
    def __init__(self, session: Session):
        super().__init__(session, models.User)

    def create(self, entity: UserCreate) -> User:
        new_user = self.model_class(
            first_name=entity.first_name,
            last_name=entity.last_name,
            username=entity.username,
            email=entity.email
        )
        self.session.add(new_user)
        self.session.flush()
        self.session.refresh(new_user)
        return new_user.to_domain()

    def update(self, id: int, data: UserUpdate) -> User | None:
        user = self.session.query(self.model_class).get(id)
        if user:
            user.first_name = data.first_name
            user.last_name = data.last_name
            user.username = data.username
            user.email = data.email
            self.session.flush()
            self.session.refresh(user)
            return user.to_domain()
        return None

    def patch(self, id: int, data: UserUpdate) -> User | None:
        user = self.session.query(self.model_class).get(id)
        if user:
            if data.first_name is not None:
                user.first_name = data.first_name
            if data.last_name is not None:
                user.last_name = data.last_name
            if data.username is not None:
                user.username = data.username
            if data.email is not None:
                user.email = data.email
            self.session.flush()
            self.session.refresh(user)
            return user.to_domain()
        return None


def get_postgresql_user_repository() -> PostgreSQLUserRepository:
    return PostgreSQLUserRepository(session=get_db_session())
