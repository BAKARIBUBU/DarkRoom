import pytest
import sys
import os

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_movie_structure():
    """Test the structure of the movie.py file to ensure the Movie model is correctly defined."""
    from models.movie import Movie
    from models.db import db
    from sqlalchemy_serializer import SerializerMixin

    assert hasattr(Movie, '__tablename__'), "The Movie model should have a __tablename__ attribute."
    assert Movie.__tablename__ == 'movies', "The Movie model __tablename__ should be 'movies'."

    # Check serialize rules
    assert hasattr(Movie, 'serialize_rules'), "The Movie model should have a serialize_rules attribute."
    assert Movie.serialize_rules == ('-posts', '-ratings',), "The Movie model serialize_rules should be ('-posts', '-ratings',)."

    # Check columns
    assert hasattr(Movie, 'id'), "The Movie model should have an id column."
    assert hasattr(Movie, 'title'), "The Movie model should have a title column."
    assert hasattr(Movie, 'genre'), "The Movie model should have a genre column."
    assert hasattr(Movie, 'description'), "The Movie model should have a description column."
    assert hasattr(Movie, 'release_year'), "The Movie model should have a release_year column."
    assert hasattr(Movie, 'poster_url'), "The Movie model should have a poster_url column."

    # Check relationships
    assert hasattr(Movie, 'posts'), "The Movie model should have a posts relationship."
    assert hasattr(Movie, 'ratings'), "The Movie model should have a ratings relationship."
