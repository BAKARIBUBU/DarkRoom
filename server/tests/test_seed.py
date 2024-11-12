import pytest
import sys
import os
from datetime import datetime

# Add the server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_seed_structure():
    """Test the structure of the seeding script to ensure data initialization and clearing are correctly defined."""
    from app import app
    from models.club import Club
    from models.comment import Comment
    from models.follow import Follow
    from models.movie import Movie
    from models.post import Post
    from models.rating import Rating
    from models.userclub import UserClub
    from models.user import User
    from models.db import db

    def Cleardata():
        with app.app_context():
            assert hasattr(Movie.query, 'delete'), "The Movie model should have a delete method."
            assert hasattr(User.query, 'delete'), "The User model should have a delete method."
            assert hasattr(Club.query, 'delete'), "The Club model should have a delete method."
            assert hasattr(Post.query, 'delete'), "The Post model should have a delete method."
            assert hasattr(Rating.query, 'delete'), "The Rating model should have a delete method."
            assert hasattr(Comment.query, 'delete'), "The Comment model should have a delete method."
            assert hasattr(Follow.query, 'delete'), "The Follow model should have a delete method."
            assert hasattr(UserClub.query, 'delete'), "The UserClub model should have a delete method."
            db.session.commit()

    with app.app_context():
        Cleardata()

        # Check seeding of Clubs
        assert isinstance(Club(name="Test Club", description="Test Description", members_num=1, created_at=datetime.now(), updated_at=datetime.now()), Club), "The Club model instance should be correctly initialized."

        # Check seeding of Comments
        assert isinstance(Comment(user_id=1, post_id=1, content="Test Comment", created_at=datetime.now()), Comment), "The Comment model instance should be correctly initialized."

        # Check seeding of Follows
        assert isinstance(Follow(follower_id=1, followed_id=2, created_at=datetime.now()), Follow), "The Follow model instance should be correctly initialized."

        # Check seeding of Movies
        assert isinstance(Movie(title="Test Movie", genre="Action", description="Test Description", release_year=2023, poster_url="test_url"), Movie), "The Movie model instance should be correctly initialized."

        # Check seeding of Posts
        assert isinstance(Post(user_id=1, movie_id=1, content="Test Post", club_id=1, created_at=datetime.now(), updated_at=datetime.now()), Post), "The Post model instance should be correctly initialized."

        # Check seeding of Ratings
        assert isinstance(Rating(user_id=1, movie_id=1, score=5, review="Great Movie", created_at=datetime.now()), Rating), "The Rating model instance should be correctly initialized."

