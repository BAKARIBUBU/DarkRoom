import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_comment_structure():
    """Test the structure of the comment.py file to ensure the Comment model is correctly defined."""
    from models.comment import Comment
    from models.db import db
    from sqlalchemy_serializer import SerializerMixin
    from sqlalchemy.sql import func

    assert hasattr(Comment, '__tablename__'), "The Comment model should have a __tablename__ attribute."
    assert Comment.__tablename__ == 'comments', "The Comment model __tablename__ should be 'comments'."

    # Check serialize rules
    assert hasattr(Comment, 'serialize_rules'), "The Comment model should have a serialize_rules attribute."
    assert Comment.serialize_rules == ('-post', '-user', '-post', '-user',), "The Comment model serialize_rules should be ('-post', '-user', '-post', '-user',)."

    # Check columns
    assert hasattr(Comment, 'id'), "The Comment model should have an id column."
    assert hasattr(Comment, 'post_id'), "The Comment model should have a post_id column."
    assert hasattr(Comment, 'user_id'), "The Comment model should have a user_id column."
    assert hasattr(Comment, 'content'), "The Comment model should have a content column."
    assert hasattr(Comment, 'created_at'), "The Comment model should have a created_at column."

    # Check relationships
    assert hasattr(Comment, 'post'), "The Comment model should have a post relationship."
    assert hasattr(Comment, 'user'), "The Comment model should have a user relationship."
