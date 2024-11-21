import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_userclub_structure():
    """Test the structure of the userclub.py file to ensure the UserClub model is correctly defined."""
    from models.userclub import UserClub
    from models.db import db
    from sqlalchemy_serializer import SerializerMixin
    from sqlalchemy.sql import func

    assert hasattr(UserClub, '__tablename__'), "The UserClub model should have a __tablename__ attribute."
    assert UserClub.__tablename__ == 'club_users', "The UserClub model __tablename__ should be 'club_users'."

    # Check serialize rules
    assert hasattr(UserClub, 'serialize_rules'), "The UserClub model should have a serialize_rules attribute."
    assert UserClub.serialize_rules == ('-user_id', '-club', '-user',), "The UserClub model serialize_rules should be ('-user_id', '-club', '-user',)."

    # Check columns
    assert hasattr(UserClub, 'club_id'), "The UserClub model should have a club_id column."
    assert hasattr(UserClub, 'user_id'), "The UserClub model should have a user_id column."
    assert hasattr(UserClub, 'joined_at'), "The UserClub model should have a joined_at column."

    # Check relationships
    assert hasattr(UserClub, 'club'), "The UserClub model should have a club relationship."
    assert hasattr(UserClub, 'user'), "The UserClub model should have a user relationship."
