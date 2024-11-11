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
from datetime import datetime

def Cleardata():
    with app.app_context():  # Make sure we are within the app context
        print("Clearing data...")
        Movie.query.delete()
        User.query.delete()
        Club.query.delete()
        Post.query.delete()
        Rating.query.delete()
        Comment.query.delete()
        Follow.query.delete()
        UserClub.query.delete()
        db.session.commit()

with app.app_context():  # Ensure the whole seeding process is wrapped in app context
    # If necessary, you can clear the data first:
    Cleardata()

    print("Seeding Clubs...")
    Clubs = [
        Club(name="Club1", description="This is club1", members_num="1", created_at=datetime.now(), updated_at=datetime.now()),
        Club(name="Club2", description="This is club2", members_num="3", created_at=datetime.now(), updated_at=datetime.now()),
        Club(name="Club3", description="This is club3", members_num="4", created_at=datetime.now(), updated_at=datetime.now()),
        Club(name="Club4", description="This is club4", members_num="2", created_at=datetime.now(), updated_at=datetime.now()),
    ]
    db.session.add_all(Clubs)
    db.session.commit()

    print("Seeding Comment...")
    Comments = [
        Comment(user_id=1, post_id=4, created_at=datetime.now(), content="music"),
        Comment(user_id=4, post_id=2, created_at=datetime.now(), content="its the best movie ever"),
        Comment(user_id=2, post_id=3, created_at=datetime.now(), content="good movie"),
        Comment(user_id=3, post_id=1, created_at=datetime.now(), content="I loved it"),
    ]
    db.session.add_all(Comments)
    db.session.commit()

    print("Seeding Followers...")
    Followers = [
        Follow(follower_id=2, followed_id=3, created_at=datetime.now()),
        Follow(follower_id=1, followed_id=3, created_at=datetime.now()),
        Follow(follower_id=4, followed_id=3, created_at=datetime.now()),
        Follow(follower_id=3, followed_id=3, created_at=datetime.now()),
    ]
    db.session.add_all(Followers)
    db.session.commit()

    print("Seeding Movies...")
    Movies = [
        Movie(title="Inception", genre="action", description="People fighting for power", release_year=2023, poster_url=1),
        Movie(title="Moana", genre="animation", description="Moana saves her kingdom", release_year=2011, poster_url=3),
        Movie(title="Underground", genre="drama", description="Fighting for the love of his life", release_year=2010, poster_url=4),
        Movie(title="Divergent", genre="Action", description="Two worlds collide", release_year=2000, poster_url=2),
    ]
    db.session.add_all(Movies)
    db.session.commit()

    print("Seeding Posts...")
    Posts = [
        Post(user_id=2, created_at=datetime.now(), content="music", movie_id=2, club_id=1, updated_at=datetime.now()),
        Post(user_id=1, created_at=datetime.now(), content="music", movie_id=1, club_id=2, updated_at=datetime.now()),
        Post(user_id=4, created_at=datetime.now(), content="music", movie_id=4, club_id=3, updated_at=datetime.now()),
        Post(user_id=3, created_at=datetime.now(), content="music", movie_id=3, club_id=4, updated_at=datetime.now()),
    ]
    db.session.add_all(Posts)
    db.session.commit()

    print("Seeding Rating...")
    Ratings = [
        Rating(user_id=2, movie_id=3, score=20, review=5, created_at=datetime.now()),
        Rating(user_id=1, movie_id=2, score=20, review=5, created_at=datetime.now()),
        Rating(user_id=3, movie_id=4, score=20, review=5, created_at=datetime.now()),
        Rating(user_id=4, movie_id=1, score=20, review=5, created_at=datetime.now()),
    ]
    db.session.add_all(Ratings)
    db.session.commit()

    print("Seeding Users...")
    Users = [
        User(username="John", email="john@gmail.com", _password_hash="pass144", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
        User(username="Amos", email="amos@gmail.com", _password_hash="amos544", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
        User(username="Joan", email="joan@gmail.com", _password_hash="joan345", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
        User(username="Beatrice", email="beatrice@gmail.com", _password_hash="Rabbit", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
    ]
    db.session.add_all(Users)
    db.session.commit()

    print("Seeding UserClubs...")
    UserClubs = [
        UserClub(user_id=1, club_id=2, joined_at=datetime.now()),
        UserClub(user_id=2, club_id=3, joined_at=datetime.now()),
        UserClub(user_id=4, club_id=4, joined_at=datetime.now()),
        UserClub(user_id=3, club_id=1, joined_at=datetime.now()),
    ]
    db.session.add_all(UserClubs)
    db.session.commit()

    print("Seeding Completed!")
       
        