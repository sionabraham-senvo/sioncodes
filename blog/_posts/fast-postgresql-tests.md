---
title: "Lightning Fast PyTests with PostgreSQL & SQLAlchemy"
excerpt: "Setting up your PostgreSQL database for fast tests can be a challenge. This guide will show you how to set 
up your database for lightning fast tests using pytest and testing.postgresql."
coverImage: "/assets/blog/fast-postgresql-tests/cover.png"
date: "2025-03-30T12:39:07.322Z"
author:
  name: Siôn Abraham
  picture: "/assets/blog/authors/sion.jpg"
ogImage:
  url: "/assets/blog/fast-postgresql-tests/cover.jpg"
tags: 
  - Python
  - SQLAlchemy
  - PostgreSQL
  - PyTest
---

> **Tip**
> 
> This article uses code excerpts from my Repository Pattern tutorial, available [here](https://github.com/sionabraham-senvo/sioncodes/tree/main/examples/repository_pattern) on GitHub.

##  Commitment is Thieving Time From You!

SQLAlchemy's session management can be a bit tricky to wrap your head around, and is very often the source of 
performance issues.

When you call `commit()`, SQLAlchemy flushes all pending changes to the database, meaning that it will execute 
all the SQL statements that have been queued up in the session, and write them to the storage device your database 
is using. So the answer is simple: use a faster storage device! 

Not quite, but close.

We normally want to `commit()` at the end of a transaction block, for example when we are exiting an endpoint, or when 
a script is finished. This means we bundle all the changes made in the session into a single transaction, 
so that any errors that occur during the transaction will cause the entire transaction to be rolled back. This keeps 
our database free from data corruption, by preventing only partial writes.

###  Flush Before Commit

When you call `flush()`, SQLAlchemy sends all pending changes to the memory of your database, but does not commit them.
This means that the changes are not yet written to the storage device, and can be rolled back if an error occurs.

We can very simply replace `commit()` with `flush()` in our code, as seen in the following example:

```python
from sqlalchemy.orm import Session

from src.domains.user import User, UserCreate, UserUpdate
from src.repositories.postgresql.base_postgresql_repository import PostgreSQLRepository

from src.repositories.postgresql import models
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
        self.session.flush() # ----> We change this to flush instead of commit!
        self.session.refresh(new_user)
        return new_user.to_domain()
```

We can then encapsulate the session in a context manager, which will let us automatically close the session when we are
done with it:

```python

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
```

The power of this pattern comes via keyword `yield`, which allows us to pass the generated session to the caller. 
Once the caller is done with what it needs to do, it will return to the context manager, which will then handle the 
session depending on the outcome of the code that was executed.

What is an interesting side effect of this process of trying to increase the performance of our tests, is that we are 
also increasing the performance of our application! By moving the `commit()` to the end of the transaction, our 
routes gain a small performance boost.

Our tests really do all the speaking for our application!

##  How You Run Your Database Matters

The most common way, at least how I have seen over my career, is to run your database in a Docker container. This is 
great for running a local development instance, but not so great for testing for a number of reasons:

- **External Dependency**: You must remember to start the container before running your tests. This adds overhead and 
  complexity to your test setup.
- **Network Latency**: Running your database in a container adds network latency to your tests. Though this might be 
  negligible for a few tests, it can add up quickly when you have a large test suite.
- **Resource Contention**: If you are running your tests in a CI/CD pipeline, you may be sharing resources with other 
  jobs. This can lead to resource contention and slow down your tests.

###  In Memory Databases

The answer lies in the use of disposable in-memory database! This means that the database is 
created in RAM and is destroyed when the tests are finished. This has a number of advantages:
- **Speed**: RAM is significantly faster than even the fastest SSDs, let alone HDDs.
- **Reduced Complexity**: You don't have to worry about starting and stopping a container, or managing network 
  connections.
- **Isolation**: Removing data from the database is significantly faster, as you don't have to wait for 
  transactions or locks.

```python
import pytest
import testing.postgresql
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.repositories.postgresql.models import Base

@pytest.fixture(scope="session")
def postgresql_session():
    with testing.postgresql.Postgresql() as postgresql:
        engine = create_engine(postgresql.url())
        Base.metadata.create_all(engine)
        yield sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session(postgresql_session):
        with postgresql_session() as session:
            yield session
            session.rollback()
```

Here we can see in `postgresql_session` we are creating a new PostgreSQL instance, and creating the database tables. 
This is scoped to the session, meaning that it will be created once per test session. This reduces the overhead of 
setting up and tearing down the database for each test.

In `db_session`, we are creating a new session for each test, and rolling back any changes made to the database no 
matter the outcome of the test. This means that we can run our tests in isolation, and not worry about any side effects
from other tests. This is scoped to the function, meaning that it will be created once per test function.

##  Results

```shell
============================= test session starts ==============================
collecting ... collected 11 items

test_user_repository.py::test_list_users_empty 
test_user_repository.py::test_list_users_with_data 
test_user_repository.py::test_get_user 
test_user_repository.py::test_get_user_not_found 
test_user_repository.py::test_delete_user 
test_user_repository.py::test_delete_user_not_found 
test_user_repository.py::test_create_new_user 
test_user_repository.py::test_update_user 
test_user_repository.py::test_update_user_not_found 
test_user_repository.py::test_patch_user 
test_user_repository.py::test_patch_user_not_found 

======================= 11 passed, 0 warnings in 1.30s =========================
```

vs

```shell
============================= test session starts ==============================
collecting ... collected 11 items

test_user_repository.py::test_list_users_empty 
test_user_repository.py::test_list_users_with_data 
test_user_repository.py::test_get_user 
test_user_repository.py::test_get_user_not_found 
test_user_repository.py::test_delete_user 
test_user_repository.py::test_delete_user_not_found 
test_user_repository.py::test_create_new_user 
test_user_repository.py::test_update_user 
test_user_repository.py::test_update_user_not_found 
test_user_repository.py::test_patch_user 
test_user_repository.py::test_patch_user_not_found 

======================= 11 passed, 0 warnings in 8.45s =========================
```

##  Conclusion

Speeding up database integration tests, despite being a common problem have relatively simple solutions. By using 
flushes over commits, and using an in-memory database, we can significantly reduce the time it takes to run our 
tests and enhance the robustness of our application.

Thank you so much for reading! 

I wish you a day full of focus and productivity!

~ Siôn Abraham