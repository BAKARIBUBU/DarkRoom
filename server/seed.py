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

if __name__ == '__main__':
    with app.app_context():
        # print("Clearing db...")
        # db.session.query(Appearance).delete()
        # db.session.query(Episode).delete()
        # db.session.query(Guest).delete()
        
        print("seeding Clubs...")
        Clubs = [
            Club(name="Club1", description="This is club1",members_num="1",created_at=datetime.now(),updated_at=datetime.now()),
            Club(name="Club2", description="This is club2",members_num="1",created_at=datetime.now(),updated_at=datetime.now()),
            Club(name="Club3", description="This is club3",members_num="1",created_at=datetime.now(),updated_at=datetime.now()),
            Club(name="Club4", description="This is club4",members_num="1",created_at=datetime.now(),updated_at=datetime.now()),
        ]
        db.session.add_all(Clubs)
        db.session.commit()#saving the changes to the database
        
        print("seeding Comment...")
        Comments = [
            Comment(user_id=1,post_id=1,created_at=datetime.now(),content="music"),
            Comment(user_id=1,post_id=1,created_at=datetime.now(),content="music"),
            Comment(user_id=1,post_id=1,created_at=datetime.now(),content="music"),
            Comment(user_id=1,post_id=1,created_at=datetime.now(),content="music"),
        ]
        db.session.add_all(Comments)
        db.session.commit()#saving the changes to the database
         
        print("seeding Followers...")
        Followers = [
            Follow(follower_id=2,followed_id=3,created_at=datetime.now()),
            Follow(follower_id=2,followed_id=3,created_at=datetime.now()),
            Follow(follower_id=2,followed_id=3,created_at=datetime.now()),
            Follow(follower_id=2,followed_id=3,created_at=datetime.now()),
            ]
        db.session.add_all(Followers)
        db.session.commit()#saving the changes to the database
        
        print("seeding movies...")
        Movies = [
            Movie(title="Movie1",genre="romance",description="This is movie1",release_year=2023,poster_url=2),
            Movie(title="Movie1",genre="romance",description="This is movie1",release_year=2023,poster_url=2),
            Movie(title="Movie1",genre="romance",description="This is movie1",release_year=2023,poster_url=2),
            Movie(title="Movie1",genre="romance",description="This is movie1",release_year=2023,poster_url=2),
            ]
        db.session.add_all(Movies)
        db.session.commit()#saving the changes to the database
        
        print("seeding posts...")
        Posts = [
            Post(user_id=1,created_at=datetime.now(),content="music",movie_id=2,club_id=2,updated_at=datetime.now()), 
            Post(user_id=1,created_at=datetime.now(),content="music",movie_id=2,club_id=2,updated_at=datetime.now()),
            Post(user_id=1,created_at=datetime.now(),content="music",movie_id=2,club_id=2,updated_at=datetime.now()),
            Post(user_id=1,created_at=datetime.now(),content="music",movie_id=2,club_id=2,updated_at=datetime.now()),
            ]
        db.session.add_all(Posts)
        db.session.commit()
        
        
        print("seeding rating...")
        Ratings = [
            Rating(user_id=1,movie_id=2,score=20,review=5,created_at=datetime.now()),
            Rating(user_id=1,movie_id=2,score=20,review=5,created_at=datetime.now()),
            Rating(user_id=1,movie_id=2,score=20,review=5,created_at=datetime.now()),
            Rating(user_id=1,movie_id=2,score=20,review=5,created_at=datetime.now()),
            ]
        db.session.add_all(Ratings)
        db.session.commit()
        
        print("users...")
        Users = [
            User(username="user1",email="user1@gmail.com",_password_hash="password1",time_created=datetime.now(),profile_picture="dog",time_updated=datetime.now()),
            User(username="user1",email="user1@gmail.com",_password_hash="password1",time_created=datetime.now(),profile_picture="dog",time_updated=datetime.now()),
            User(username="user1",email="user1@gmail.com",_password_hash="password1",time_created=datetime.now(),profile_picture="dog",time_updated=datetime.now()),
            User(username="user1",email="user1@gmail.com",_password_hash="password1",time_created=datetime.now(),profile_picture="dog",time_updated=datetime.now()),
        ]
        db.session.add_all(Users)
        db.session.commit()
        
        print("seeding userclubs...")
        UserClubs = [
            UserClub(user_id=1,club_id=2,joined_at=datetime.now()),
            UserClub(user_id=1,club_id=2,joined_at=datetime.now()),
            UserClub(user_id=1,club_id=2,joined_at=datetime.now()),
            UserClub(user_id=1,club_id=2,joined_at=datetime.now()),
            ]
        db.session.add_all(UserClubs)
        db.session.commit()
        
        print("seedings ends!")
        
        
        