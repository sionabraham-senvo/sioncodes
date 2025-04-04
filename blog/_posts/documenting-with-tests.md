---
title: "Documenting Your Application's Business Logic via Tests"
excerpt: "Documentation. The word strikes a sense of melancholy in everyone. This post explores how tests can make this process
less painful and more effective."
coverImage: "/assets/blog/documenting-with-tests/cover_small.png"
date: "2025-04-04T11:45:02.677Z"
author:
  name: Siôn Abraham
  picture: "/assets/blog/authors/sion_small.jpg"
ogImage:
  url: "/assets/blog/documenting-with-tests/cover_big.png"
tags: 
  - Python
  - PyTest
---

Before I start, I have to say how incredibly difficult it is not to clickbait the titles of these posts:

* This one trick will make your engineering lead **love** you!
* They thought it was impossible, but this one **simple** trick made documentation a thing of the past!
* Become the VIP of your team with this **one** simple documentation trick!

I digress...

## Documentation, the headache..

It doesn't really matter which stage you are at in your career:

Corporate manager tells junior: "_That must be documented in Confluence, else it doesn't meet the DoD"_
Junior tells the senior: _"How does this big chunk of code you wrote 4 years ago in a crunch time work?"_
Senior tells themselves: _"Working code over comprehensive documentation"_.

Documenting your code as an activity is a boring time sink.

Now I can't help you with yak shaving Confluence to make middle management happy, but there will come a point where 
even you yourself will be scratching your head at the intended purpose of a service, endpoint, or adapter that you 
wrote a while ago.

To be able to quickly understand the business logic of a legacy codebase, or even better yet, quickly onboarding a 
new team member is a skill that is in high demand.

This is where tests come in.

## What else are tests other than documentation?

Tests are a form of documentation: a living, breathing representation of your app. They are the one true way to 
describe how your code is supposed to work, and often how it should not work. They instruct you on how the business 
logic of your code operates, and how it interacts with other parts of application.

Therefore, we should take care to present them in a way that is both easy to read, and to understand.

### Structure your tests like your code

The first thing we can do to help ourselves is to structure our tests in a way that is similar to the code we are 
developing:

```text
.
└── my_project/
    ├── src/
    │   ├── adapters/
    │   │   └── user_repository.py
    │   ├── applications/
    │   │   └── main_api/
    │   │       └── routers/
    │   │           └── users.py
    │   └── services/
    │       └── user_service.py
    └── tests/
        ├── adapters/
        │   └── test_user_repository.py
        ├── applications/
        │   └── main_api/
        │       └── routers/
        │           └── test_users.py
        ├── services/
        │   └── test_user_service.py
        └── conftest.py
```

It doesn't matter where we are in our codebase, we are now able to find exactly the description for the function, 
service, or application we are looking for.

### Descriptive test names

Next, we are going to take a look at some tests and give them names that assert the functionality of the underlying 
code. We want each test to tell us what to expect once the code has been run, for a given usecase.

In the case below we are updating a user:

```python
def test_put_user(user_repository):
    created_user = user_repository.create(
        entity=UserCreate(
            first_name="_test_first_name",
            last_name="_test_last_name",
            username="_test_username",
            email="_test_email",
        )
    )
    updated_user = user_repository.update(
        id=created_user.id,
        data=UserUpdate(
            first_name="_updated_first_name",
            last_name="_updated_last_name",
            username="_updated_username",
            email="_updated_email",
        ),
    )
    assert updated_user is not None
    assert updated_user.first_name == "_updated_first_name"
    assert updated_user.last_name == "_updated_last_name"
    assert updated_user.username == "_updated_username"
    assert updated_user.email == "_updated_email"

def test_put_user_fail(user_repository):
    ...

def test_post_user_picture(user_repository):
    ...
```

seems like a pretty standard set of tests, right? 

_But_ what if we were to change the name of the test to be more descriptive?

```python
def test_update_user_with_existing_user(user_repository):
    ...

def test_update_user_no_existing_user(user_repository):
    ...

def test_user_picture_is_uploaded_and_assigned_to_user(user_repository):
    ...
```

Much better! A small change but it makes the test much more readable.

Of course, the more complex the code, the more complex the test name will be. We must in these cases remember the 
Zen of Python:

_If the implementation is hard to explain, it's a bad idea._

_If the implementation is easy to explain, it may be a good idea._

If you find yourself writing a test that is hard to explain, then it is likely that the code you are testing is also 
too big, and it might be a great time for a minor refactor.

### Detailed use-case scenarios

We can take the concept of detailing a step further by introducing Behavior Driven Development (BDD) styled tests. 
Don't worry, this isn't the mind twister you might have had from Test Driven Development (TDD).

BDD is a way of writing tests that describe the behavior of the code in a more human-readable way, from the 
perspective of the user of that code. This makes it a tool that can be used to bridge the communication gaps between 
engineering, product, and business.

Rather than spend half an article explaining what BDD is, lets just take a look at an example of it in action:

```python
def test_update_user_with_existing_user(user_repository):
    # Given an existing user
    created_user = user_repository.create(
        entity=UserCreate(
            first_name="_test_first_name",
            last_name="_test_last_name",
            username="_test_username",
            email="_test_email",
        )
    )

    # When I update the user
    updated_user = user_repository.update(
        id=created_user.id,
        data=UserUpdate(
            first_name="_updated_first_name",
            last_name="_updated_last_name",
            username="_updated_username",
            email="_updated_email",
        ),
    )

    # Then the user should be updated
    assert updated_user is not None
    assert updated_user.first_name == "_updated_first_name"
    assert updated_user.last_name == "_updated_last_name"
    assert updated_user.username == "_updated_username"
    assert updated_user.email == "_updated_email"
```

With just 3 minimal sentences we have helped our future selves some pain. If we ever come back to this bit of 
code we can quickly understand where we need to change setup, execution, and assertion without spending ages trying 
to decipher the test from the setup.

The next step is what I'd call optional based on your style and preferences, but my style is to add a docstring to 
the test and add the `GIVEN`, `WHEN`, and `THEN` sections over the relevant code. I find it easier to skim read the 
test rather than having to read the whole thing.

```python
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
```

### Clustering test cases in classes

You might have seen `class TestSomeCode` and `def test_some_code` and wondered what the difference is. Classes 
simply allow us to cluster test cases together, and share setup and teardown code between them.

Now I dont always use it for the teardown and setup, but I do like to use it to group related test cases together. 

For example, you might have an api route `/v1/users` and you want to test the different endpoints for get, list, 
post etc.. Scrolling through multiple functions to find the cluster that is related to your specific endpoint can 
be a hassle, so we can do something like this:

```python
class TestUpdateUser:
    @pytest.fixture
    def user_repository(self, db_session):
        return PostgreSQLUserRepository(db_session)
    
    def test_update_user_with_existing_user(self, user_repository):
        ...
    
    def test_update_user_no_existing_user(self, user_repository):
        ...
    
    def test_user_picture_is_uploaded_and_assigned_to_user(self, user_repository):
        ...

class TestCreateUser:
    ...

class TestDeleteUser:
    ...
```

The `...` ellipses illustrate collapsed code as you'd have in an IDE, and you can see how useful it is to have only 
what you need to see when working!

## Conclusion

That's all that is to it! For a small investment of time now, you can save yourself and your team time in the future.
If not time then the cognitive load of having to remember how what you just wrote works.

What you can try doing once you've started this process, is to try and review your colleagues next PR or trunked 
feature starting with the tests, and then moving to the code. This really helped me become a better reviewer, and I 
found that I was able to spot issues in the code that I would have otherwise missed, as I knew what the expectations
were.


Thank you so much for reading! 

I wish you a day full of focus and productivity!

~ Siôn Abraham