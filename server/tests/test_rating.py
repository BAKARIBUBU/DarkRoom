import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_rating_structure():
    """Test the structure of the rating.py file to ensure the Rating model is correctly defined."""
    from models.rating import Rating
    from models.db import db
    from sqlalchemy_serializer import SerializerMixin
    from sqlalchemy.sql import func

    assert hasattr(Rating, '__tablename__'), "The Rating model should have a __tablename__ attribute."
    assert Rating.__tablename__ == 'ratings', "The Rating model __tablename__ should be 'ratings'."

    # Check serialize rules
    assert hasattr(Rating, 'serialize_rules'), "The Rating model should have a serialize_rules attribute."
    assert Rating.serialize_rules == ('-user', '-movie', '-movie', '-user',), "The Rating model serialize_rules should be ('-user', '-movie', '-movie', '-user',)."

    # Check columns
    assert hasattr(Rating, 'id'), "The Rating model should have an id column."
    assert hasattr(Rating, 'user_id'), "The Rating model should have a user_id column."
    assert hasattr(Rating, 'movie_id'), "The Rating model should have a movie_id column."
    assert hasattr(Rating, 'score'), "The Rating model should have a score column."
    assert hasattr(Rating, 'review'), "The Rating model should have a review column."
    assert hasattr(Rating, 'created_at'), "The Rating model should have a created_at column."

    # Check relationships
    assert hasattr(Rating, 'user'), "The Rating model should have a user."