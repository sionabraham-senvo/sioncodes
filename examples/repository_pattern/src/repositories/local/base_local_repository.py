from typing import Generic, TypeVar, Any

from src.repositories.base_repository import BaseRepository

T = TypeVar('T')  # Entity type
C = TypeVar('C')  # Create data type
U = TypeVar('U')  # Update data type


class LocalRepository(Generic[T, C, U], BaseRepository[T]):
    """
    Base class for all local in-memory repositories.
    Implements common functionality of the BaseRepository interface.
    """

    def __init__(self):
        self._entities: list[T] = []
        self._next_id = 1

    def list(self) -> list[T]:
        """Retrieve all entities from the repository."""
        return self._entities

    def get(self, id: Any) -> T | None:
        """Retrieve an entity by its ID."""
        for entity in self._entities:
            if entity.id == id:
                return entity
        return None

    def delete(self, id: Any) -> bool:
        """Delete an entity by its ID."""
        entity = self.get(id)
        if entity:
            self._entities.remove(entity)
            return True
        return False

    def _get_next_id(self) -> int:
        """Get the next available ID and increment the counter."""
        current_id = self._next_id
        self._next_id += 1
        return current_id

    # Abstract methods that subclasses must implement
    def create(self, entity: C) -> T:
        """Create a new entity in the repository."""
        raise NotImplementedError("Subclasses must implement create method")

    def update(self, id: Any, data: U) -> T | None:
        """Update an existing entity."""
        raise NotImplementedError("Subclasses must implement update method")

    def patch(self, id: Any, data: U) -> T | None:
        """Patch an existing entity."""
        raise NotImplementedError("Subclasses must implement patch method")
