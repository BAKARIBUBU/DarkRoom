# import pytest
# import sys
# import os

# # Add the server directory to the system path
# sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# def test_club_structure():
#     """Test the structure of the club.py file to ensure the Club model is correctly defined."""
#     from models.club import Club
#     from models.db import db
#     from sqlalchemy_serializer import SerializerMixin
#     from sqlalchemy.sql import func

#     assert hasattr(Club, '__tablename__'), "The Club model should have a __tablename__ attribute."
#     assert Club.__tablename__ == 'clubs', "The Club model __tablename__ should be 'clubs'."

#     # Check serialize rules
#     assert hasattr(Club, 'serialize_rules'), "The Club model should have a serialize_rules attribute."
#     assert Club.serialize_rules == ('-posts', '-club_users',), "The Club model serialize_rules should be ('-posts', '-club_users',)."

#     # Check columns
#     assert hasattr(Club, 'id'), "The Club model should have an id column."
#     assert hasattr(Club, 'name'), "The Club model should have a name column."
#     assert hasattr(Club, 'description'), "The Club model should have a description column."
#     assert hasattr(Club, 'members_num'), "The Club model should have a members_num column."
#     assert hasattr(Club, 'created_at'), "The Club model should have a created_at column."
#     assert hasattr(Club, 'updated_at'), "The Club model should have an updated_at column."

#     # Check relationships
#     assert hasattr(Club, 'posts'), "The Club model should have a posts relationship."
#     assert hasattr(Club, 'club_users'), "The Club model should have a club_users relationship."


import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_club_structure():
    """Test the structure of the club.py file to ensure the Club model is correctly defined."""
    from models.club import Club
    from models.db import db
    from sqlalchemy_serializer import SerializerMixin
    from sqlalchemy.sql import func

    assert hasattr(Club, '__tablename__'), "The Club model should have a __tablename__ attribute."
    assert Club.__tablename__ == 'clubs', "The Club model __tablename__ should be 'clubs'."

    # Check serialize rules
    assert hasattr(Club, 'serialize_rules'), "The Club model should have a serialize_rules attribute."
    assert Club.serialize_rules == ('-posts', '-club_users',), "The Club model serialize_rules should be ('-posts', '-club_users',)."

    # Check columns
    assert hasattr(Club, 'id'), "The Club model should have an id column."
    assert hasattr(Club, 'name'), "The Club model should have a name column."
    assert hasattr(Club, 'description'), "The Club model should have a description column."
    assert hasattr(Club, 'members_num'), "The Club model should have a members_num column."
    assert hasattr(Club, 'created_at'), "The Club model should have a created_at column."
    assert hasattr(Club, 'updated_at'), "The Club model should have an updated_at column."

    # Check relationships
    assert hasattr(Club, 'posts'), "The Club model should have a posts relationship."
    assert hasattr(Club, 'club_users'), "The Club model should have a club_users relationship."
