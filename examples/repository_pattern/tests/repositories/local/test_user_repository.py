import pytest

from src.domains.user import UserCreate, UserUpdate
from src.repositories.local.user_repository import get_local_user_repository


@pytest.fixture
def user_repository():
    return get_local_user_repository()


def test_list_users_empty(user_repository):
    """
    Given a user repository,
    When listing users,
    Then it should return an empty list initially.
    """

    # WHEN
    users = user_repository.list()

    # THEN
    assert users == [], "User list should be empty initially"


def test_list_users_with_data(user_repository):
    """
    Given a user repository with existing users,
    When listing users,
    Then it should return the list of users.
    """

    # GIVEN
    user_create = UserCreate(
        first_name="_test_first_name",
        last_name="_test_last_name",
        username="_test_username",
        email="_test_email",
    )
    user_repository.create(entity=user_create)

    # WHEN
    users = user_repository.list()

    # THEN
    assert len(users) == 1, "User list should contain one user"
    assert users[0].first_name == user_create.first_name
    assert users[0].last_name == user_create.last_name

def test_get_user(user_repository):
    """
    Given a user repository and an existing user,
    When retrieving the user by ID,
    Then it should return the correct user.
    """

    # GIVEN
    user_create = UserCreate(
        first_name="_test_first_name",
        last_name="_test_last_name",
        username="_test_username",
        email="_test_email",
    )
    created_user = user_repository.create(entity=user_create)

    # WHEN
    user = user_repository.get(created_user.id)

    # THEN
    assert user is not None, "User should be found"
    assert user.id == created_user.id, "User ID should match"

def test_get_user_not_found(user_repository):
    """
    Given a user repository,
    When trying to retrieve a user by a non-existent ID,
    Then it should return None.
    """

    # WHEN
    user = user_repository.get(999)  # Assuming 999 does not exist

    # THEN
    assert user is None, "User should not be found"

def test_delete_user(user_repository):
    """
    Given a user repository and an existing user,
    When deleting the user by ID,
    Then the user should be removed from the repository.
    """

    # GIVEN
    user_create = UserCreate(
        first_name="_test_first_name",
        last_name="_test_last_name",
        username="_test_username",
        email="_test_email",
    )
    created_user = user_repository.create(entity=user_create)

    # WHEN
    deleted = user_repository.delete(created_user.id)

    # THEN
    assert deleted is True, "User should be deleted successfully"
    assert user_repository.get(created_user.id) is None, "User should not be found after deletion"

def test_delete_user_not_found(user_repository):
    """
    Given a user repository,
    When trying to delete a user by a non-existent ID,
    Then it should return False.
    """

    # WHEN
    deleted = user_repository.delete(999)  # Assuming 999 does not exist

    # THEN
    assert deleted is False, "User should not be found for deletion"

def test_create_new_user(user_repository):
    """
    Given a user repository and a user creation request,
    When creating a new user,
    Then the user should be created successfully with the provided details.
    """

    # GIVEN
    user_create = UserCreate(
        first_name="_test_first_name",
        last_name="_test_last_name",
        username="_test_username",
        email="_test_email",
    )

    # WHEN
    user = user_repository.create(
        entity=user_create
    )

    # THEN
    assert user.id is not None, "User ID should be generated"
    assert user.first_name == user_create.first_name
    assert user.last_name == user_create.last_name
    assert user.username == user_create.username
    assert user.email == user_create.email

def test_update_user_with_existing_user(user_repository):
    """
    Given a user repository and an existing user,
    When updating the user's details,
    Then the user should be updated successfully.
    """

    # GIVEN
    user_create = UserCreate(
        first_name="_test_first_name",
        last_name="_test_last_name",
        username="_test_username",
        email="_test_email",
    )
    created_user = user_repository.create(entity=user_create)

    # WHEN
    updated_user = user_repository.update(
        id=created_user.id,
        data=UserUpdate(
            first_name="_updated_first_name",
            last_name="_updated_last_name",
            username="_updated_username",
            email="_updated_email",
        ),
    )

    # THEN
    assert updated_user is not None, "User should be updated successfully"
    assert updated_user.first_name == "_updated_first_name"
    assert updated_user.last_name == "_updated_last_name"
    assert updated_user.username == "_updated_username"
    assert updated_user.email == "_updated_email"

def test_update_user_not_found(user_repository):
    """
    Given a user repository,
    When trying to update a user by a non-existent ID,
    Then it should return None.
    """

    # WHEN
    updated_user = user_repository.update(
        id=999,  # Assuming 999 does not exist
        data=UserUpdate(
            first_name="_updated_first_name",
            last_name="_updated_last_name",
            username="_updated_username",
            email="_updated_email",
        ),
    )

    # THEN
    assert updated_user is None, "User should not be found for update"

def test_patch_user(user_repository):
    """
    Given a user repository and an existing user,
    When partially updating the user's details,
    Then the user should be updated successfully with the provided details.
    """

    # GIVEN
    user_create = UserCreate(
        first_name="_test_first_name",
        last_name="_test_last_name",
        username="_test_username",
        email="_test_email",
    )
    created_user = user_repository.create(entity=user_create)

    # WHEN
    patched_user = user_repository.patch(
        id=created_user.id,
        data=UserUpdate(
            first_name="_patched_first_name",
            last_name=None,  # No change
            username="_patched_username",
            email=None,  # No change
        ),
    )

    # THEN
    assert patched_user is not None, "User should be patched successfully"
    assert patched_user.first_name == "_patched_first_name"
    assert patched_user.last_name == "_test_last_name"  # Unchanged
    assert patched_user.username == "_patched_username"
    assert patched_user.email == "_test_email"  # Unchanged

def test_patch_user_not_found(user_repository):
    """
    Given a user repository,
    When trying to patch a user by a non-existent ID,
    Then it should return None.
    """

    # WHEN
    patched_user = user_repository.patch(
        id=999,  # Assuming 999 does not exist
        data=UserUpdate(
            first_name="_patched_first_name",
            last_name="_patched_last_name",
            username="_patched_username",
            email="_patched_email",
        ),
    )

    # THEN
    assert patched_user is None, "User should not be found for patch"
