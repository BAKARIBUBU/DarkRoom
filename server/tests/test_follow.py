import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_follow_structure():
    """Test the structure of the follow.py file to ensure the Follow model is correctly defined."""
    from models.follow import Follow
    from models.db import db
    from sqlalchemy_serializer import SerializerMixin
    from sqlalchemy.sql import func

    assert hasattr(Follow, '__tablename__'), "The Follow model should have a __tablename__ attribute."
    assert Follow.__tablename__ == 'follows', "The Follow model __tablename__ should be 'follows'."

    # Check serialize rules
    assert hasattr(Follow, 'serialize_rules'), "The Follow model should have a serialize_rules attribute."
    assert Follow.serialize_rules == ('-follower_id', '-followed_id',), "The Follow model serialize_rules should be ('-follower_id', '-followed_id',)."

    # Check columns
    assert hasattr(Follow, 'id'), "The Follow model should have an id column."
    assert hasattr(Follow, 'follower_id'), "The Follow model should have a follower_id column."
    assert hasattr(Follow, 'followed_id'), "The Follow model should have a followed_id column."
    assert hasattr(Follow, 'created_at'), "The Follow model should have a created_at column."

    # Check relationships
    assert hasattr(Follow, 'follower'), "The Follow model should have a follower relationship."
    assert hasattr(Follow, 'followed'), "The Follow model should have a followed relationship."