from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Any

T = TypeVar('T')


class BaseRepository(Generic[T], ABC):
    """
    Abstract base class for repository implementations.
    Provides a common interface for data access operations.
    """

    @abstractmethod
    def list(self) -> list[T]:
        """Retrieve all entities from the repository."""
        pass

    @abstractmethod
    def get(self, id: Any) -> T | None:
        """Retrieve an entity by its ID."""
        pass

    @abstractmethod
    def create(self, entity: T) -> T:
        """Create a new entity in the repository."""
        pass

    @abstractmethod
    def update(self, id: Any, data: T) -> T | None:
        """Update an existing entity."""
        pass

    @abstractmethod
    def patch(self, id: Any, data: T) -> T | None:
        """Patch an existing entity."""
        pass

    @abstractmethod
    def delete(self, id: Any) -> bool:
        """Delete an entity by its ID."""
        pass
