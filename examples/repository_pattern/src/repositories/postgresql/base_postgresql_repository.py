from typing import Generic, TypeVar, Any, Type
from sqlalchemy.orm import Session
from sqlalchemy.future import select

from src.repositories.base_repository import BaseRepository

T = TypeVar('T')  # DB Object type (SQLAlchemy model)
C = TypeVar('C')  # Create data type
U = TypeVar('U')  # Update data type
F = TypeVar('F')  # Full data type


class PostgreSQLRepository(Generic[T, C, U, F], BaseRepository[T]):
    """
    Base class for all PostgreSQL repositories using SQLAlchemy.
    Implements common functionality of the BaseRepository interface.
    """

    def __init__(self, session: Session, model_class: Type[T]):
        self.session = session
        self.model_class = model_class

    def list(self) -> list[F]:
        """Retrieve all entities from the repository."""
        query = select(self.model_class)
        return [
            result.to_domain()
            for result in self.session.execute(query).scalars()
        ]

    def get(self, id: Any) -> F | None:
        """Retrieve an entity by its ID."""
        result = self.session.get(self.model_class, id)
        if not result:
            return None
        return result.to_domain()

    def delete(self, id: Any) -> bool:
        """Delete an entity by its ID."""
        result = self.session.get(self.model_class, id)
        if result:
            self.session.delete(result)
            self.session.flush()
            return True
        return False

    # Abstract methods that subclasses must implement
    def create(self, entity: C) -> F:
        """Create a new entity in the repository."""
        raise NotImplementedError("Subclasses must implement create method")

    def update(self, id: Any, data: U) -> F | None:
        """Update an existing entity."""
        raise NotImplementedError("Subclasses must implement update method")

    def patch(self, id: Any, data: U) -> F | None:
        """Patch an existing entity."""
        raise NotImplementedError("Subclasses must implement patch method")
