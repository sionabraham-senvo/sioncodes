---
title: "Documenting Your Codes Business Logic via Tests"
excerpt: "Documentation. The word strikes a sense of melancholy in everyone. This post explores how tests can make this process
less painful and more effective."
coverImage: "/assets/blog/documenting-with-tests/cover_small.png"
date: "2025-03-31T06:45:02.677Z"
author:
  name: Siôn Abraham
  picture: "/assets/blog/authors/sion_small.jpg"
ogImage:
  url: "/assets/blog/documenting-with-tests/cover_big.png"
tags: 
  - Python
  - PyTest
---

> **Tip**
> 
> This article uses code excerpts from my Repository Pattern tutorial, available [here](https://github.com/sionabraham-senvo/sioncodes/tree/main/examples/repository_pattern) on GitHub.

Before I start, I have to say how incredibly difficult it is not to clickbait the titles of these posts:

* This one trick will make your engineering lead **love** you!
* They thought it was impossible, but this one **simple** trick made documentation a thing of the past!
* Become the VIP of your team with this **one** simple documentation trick!

I digress...

## Documentation, the headache..

It doesn't really matter at which stage you are at in your career:

Corporate manager tells junior: "_That must be documented in Confluence, else it doesn't meet the DoD"_
Junior tells the senior: _"How did this big ugly chunk of code you wrote 4 years ago in a crunch time?"_
Senior tells themselves: _"Working code over comprehensive documentation"_.

Documenting your code as an activity is a boring time sink.

Now I can't help you with yak shaving Confluence, but there will come a point where even you yourself will be 
scratching your  head at the intended purpose of a service, endpoint, or adapter you wrote a while ago.

## Documenting in tests?! I need a paracetamol.

When I started my career, many companies were only just starting their transition to what we would now think of as a 
modern tech stack. PHP and Java were the kings of the world, and hardly anyone had heard of Docker. I do somewhat 
hold it as a badge of honor to have worked on physical servers!

I digress again! I bring this up, because there is still a lot of legacy code out there, and there are significantly 
more teams looking for people to maintain it, than there are greenfield projects.

Now you could take this in negativity, but to be able to quickly understand the business logic of a legacy codebase, 
or even better yet, quickly onboarding a new team member, is a skill that is in high demand.

This is where tests come in.

## What else are tests other than documentation?

Tests are a form of documentation: a living, breathing representation of your app. They are the one true way to 
describe how your code is supposed to work, and often how it should not work. They instruct you on how the business 
logic of your code operates, and how it interacts with other parts of application.

### Descriptive Test Names

The first thing we are going to do is take a look at some tests, and give them names that assert the functionality 
of the underlying code. We want it to tell us what to expect once the code has been run.

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

seems pretty standard, right? But what if we were to change the name of the test to be more descriptive?

```python
def test_update_user_with_existing_user(user_repository):
    ...

def test_update_user_no_existing_user(user_repository):
    ...

def test_user_picture_is_uploaded_and_assigned_to_user(user_repository):
    ...
```

Much better! A small change, but it makes the test much more readable.

Of course, the more complex the code, the more complex the test name will be. We must in these cases remember the 
Zen of Python:

_If the implementation is hard to explain, it's a bad idea._

_If the implementation is easy to explain, it may be a good idea._

If you find yourself writing a test that is hard to explain, then it is likely that the code you are testing is also 
too big, and might be a great time for a minor refactor.

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

## Conclusion

And that's all that is too it! For a small investment of time now, you can save you and your team time in the future.
If not time, then the cognitive load of having to remember how what you just wrote works.

What you can try doing once you've started this process, is to try and review your colleagues next PR starting with 
the tests, and then moving to the code. This really helped me become a better reviewer, and I found that I was able to
spot issues in the code that I would have otherwise missed, as I knew what the expectations were.


Thank you so much for reading! 

I wish you a day full of focus and productivity!

~ Siôn Abraham