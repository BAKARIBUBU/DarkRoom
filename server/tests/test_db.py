import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_db_structure():
    """Test the structure of the db.py file to ensure the SQLAlchemy instance is initialized correctly."""
    from models.db import db
    from flask_sqlalchemy import SQLAlchemy

    assert isinstance(db, SQLAlchemy), "The db object should be an instance of SQLAlchemy."

