# tests/test_app.py
import pytest
from app import app as flask_app  # Importing app directly since it's in the same directory

def test_app_creation():
    assert flask_app is not None

def test_routes():
    # List of expected routes
    expected_routes = [
        '/',
        '/users',
        '/users/<int:id>',
        '/register',
        '/login',
        '/logout',
        '/movies',
        '/movies/<int:id>',
        '/clubs',
        '/clubs/<int:id>',
        '/posts',
        '/posts/<int:id>',
        '/ratings',
        '/ratings/<int:id>',
        '/comments/<int:post_id>',
        '/comments/<int:id>',
        '/follow',
        '/users/<int:id>/followers',
        '/users/<int:id>/following',
        '/clubs/add_user',
        '/clubs/remove_user/<int:user_id>/<int:club_id>',
        '/users/<int:user_id>/clubs',
        '/clubs/<int:club_id>/users',
    ]

    registered_routes = [rule.rule for rule in flask_app.url_map.iter_rules()]

    for route in expected_routes:
        assert route in registered_routes, f"Expected route {route} not found in registered routes."