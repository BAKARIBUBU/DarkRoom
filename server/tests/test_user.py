import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from models.user import User
from models.db import db


# Set up test database, e.g., SQLite in-memory for isolation
@pytest.fixture(scope='module')
def test_client():
    # Assuming `app` is your Flask instance from app.py
    from app import app
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()  # Set up test database
        yield app.test_client()  # Provide the test client
        db.drop_all()  # Tear down after tests

@pytest.fixture
def new_user():
    user = User(username="testuser", email="testuser@example.com")
    user.password = "securepassword"  # Uses the password setter to hash it
    return user

def test_user_creation(new_user):
    assert new_user.username == "testuser"
    assert new_user.email == "testuser@example.com"
    assert new_user._password_hash != "securepassword"  # Ensure password is hashed

def test_check_password(new_user):
    assert new_user.check_password("securepassword") is True
    assert new_user.check_password("wrongpassword") is False

def test_user_repr(new_user):
    assert repr(new_user) == "<User testuser, testuser@example.com>"

def test_relationships(test_client):
    # Assuming you add posts, comments, etc., to the user here to test relationships
    with test_client.application.app_context():
        user = User(username="testuser2", email="testuser2@example.com")
        user.password = "password"
        db.session.add(user)
        db.session.commit()

        assert user.posts == []
        assert user.comments == []
