import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_post_structure():
    """Test the structure of the post.py file to ensure the Post model is correctly defined."""
    from models.post import Post
    from models.db import db
    from sqlalchemy_serializer import SerializerMixin
    from sqlalchemy.sql import func

    assert hasattr(Post, '__tablename__'), "The Post model should have a __tablename__ attribute."
    assert Post.__tablename__ == 'posts', "The Post model __tablename__ should be 'posts'."

    # Check serialize rules
    assert hasattr(Post, 'serialize_rules'), "The Post model should have a serialize_rules attribute."
    expected_serialize_rules = ('-user_id', '-movie_id', '-club_id', '-comments', '-movie', '-club_id', '-comments', '-movies')
    assert Post.serialize_rules == expected_serialize_rules, f"The Post model serialize_rules should be {expected_serialize_rules}."

    # Check columns
    assert hasattr(Post, 'id'), "The Post model should have an id column."
    assert hasattr(Post, 'user_id'), "The Post model should have a user_id column."
    assert hasattr(Post, 'movie_id'), "The Post model should have a movie_id column."
    assert hasattr(Post, 'content'), "The Post model should have a content column."
    assert hasattr(Post, 'club_id'), "The Post model should have a club_id column."
    assert hasattr(Post, 'created_at'), "The Post model should have a created_at column."
    assert hasattr(Post, 'updated_at'), "The Post model should have an updated_at column."

    # Check relationships
    assert hasattr(Post, 'comments'), "The Post model should have a comments relationship."
    assert hasattr(Post, 'movie'), "The Post model should have a movie relationship."
    assert hasattr(Post, 'club'), "The Post model should have a club relationship."
    assert hasattr(Post, 'user'), "The Post model should have a user relationship."

    # Check class methods
    assert hasattr(Post, 'create_post_with_movie'), "The Post model should have a create_post_with_movie class method."

    # Check accessor properties
    assert hasattr(Post, 'movie_title'), "The Post model should have a movie_title property."
    assert hasattr(Post, 'movie_poster_url'), "The Post model should have a movie_poster_url property."

