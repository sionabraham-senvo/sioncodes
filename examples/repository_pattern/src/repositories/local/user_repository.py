from src.domains.user import User, UserCreate, UserUpdate
from src.repositories.local.base_local_repository import LocalRepository


class LocalUserRepository(LocalRepository[User, UserCreate, UserUpdate]):
    def create(self, entity: UserCreate) -> User:
        new_user = User(
            id=self._get_next_id(),
            first_name=entity.first_name,
            last_name=entity.last_name,
            username=entity.username,
            email=entity.email
        )
        self._entities.append(new_user)
        return new_user

    def update(self, id: int, data: UserUpdate) -> User | None:
        user = self.get(id)
        if user:
            user.first_name = data.first_name
            user.last_name = data.last_name
            user.username = data.username
            user.email = data.email
            return user
        return None

    def patch(self, id: int, data: UserUpdate) -> User | None:
        user = self.get(id)
        if user:
            if data.first_name is not None:
                user.first_name = data.first_name
            if data.last_name is not None:
                user.last_name = data.last_name
            if data.username is not None:
                user.username = data.username
            if data.email is not None:
                user.email = data.email
            return user
        return None

def get_local_user_repository() -> LocalUserRepository:
    return LocalUserRepository()
