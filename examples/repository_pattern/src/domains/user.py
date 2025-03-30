from dataclasses import dataclass

@dataclass
class UserCreate:

    first_name: str
    last_name: str
    username: str
    email: str


@dataclass
class UserUpdate:

    first_name: str | None = None
    last_name: str | None = None
    username: str | None = None
    email: str | None = None


@dataclass
class User:

    id: int
    first_name: str
    last_name: str
    username: str
    email: str
