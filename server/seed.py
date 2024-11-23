from faker import Faker
from random import choice
from models import db, User, Movie, Club, Post, Comment, Follow
from werkzeug.security import generate_password_hash
from app import app
from datetime import datetime

fake = Faker()

def Cleardata():
    with app.app_context():  # Make sure we are within the app context
        print("Clearing data...")
        # Delete the dependent data first to avoid foreign key issues
        Comment.query.delete()
        Post.query.delete()
        Follow.query.delete()
        Movie.query.delete()
        Club.query.delete()
        User.query.delete()  # Now safe to delete users
        db.session.commit()

def seed_data():
    with app.app_context():
        # Clear the database
        Cleardata()
        
        print("Seeding data...")

        # Seed Users
        users = []
        for _ in range(5):
            password = "default_password"
            user = User(
                username=fake.name(),
                email=fake.email(),
                _password_hash=generate_password_hash(password)
            )
            db.session.add(user)
            users.append(user)
        
        db.session.commit()  # Commit users to ensure they are in the database

        # Seed Movies
        movies = []
        for _ in range(10):
            user = choice(users)  # Assign a random user as the creator
            movie = Movie(
                title=fake.catch_phrase(),
                genre=fake.word(),
                description=fake.text(max_nb_chars=200),
                release_year=fake.year(),
                poster_url=fake.image_url(),
                user_id=user.id  # Use a valid user_id
            )
            db.session.add(movie)
            movies.append(movie)

        db.session.commit()

        # Seed Clubs
        clubs = []
        for _ in range(3):
            club = Club(
                name=fake.company(),
                description=fake.text(max_nb_chars=150)
            )
            db.session.add(club)
            clubs.append(club)
        
        db.session.commit()

        # Seed Posts
        posts = []
        for _ in range(5):
            user = choice(users)
            club = choice(clubs)
            post = Post(
                content=fake.text(max_nb_chars=250),
                user_id=user.id,
                club_id=club.id,
                updated_at=datetime.utcnow()
            )
            db.session.add(post)
            posts.append(post)
        
        db.session.commit()

        # Seed Comments
        for _ in range(15):
            user = choice(users)
            post = choice(posts)
            comment = Comment(
                content=fake.sentence(),
                user_id=user.id,
                post_id=post.id
            )
            db.session.add(comment)
        
        db.session.commit()

        print("Seeding completed successfully.")

if __name__ == "__main__":
    seed_data()

# from faker import Faker
# from random import choice
# from models import db, User, Movie, Club, Post, Comment,Follow
# from werkzeug.security import generate_password_hash
# from app import app
# from models.club import Club
# from models.db import db
# from datetime import datetime

# fake = Faker()
# def Cleardata():
#     with app.app_context():  # Make sure we are within the app context
#         print("Clearing data...")
#         Movie.query.delete()
#         User.query.delete()
#         Club.query.delete()
#         Post.query.delete()
#         # Rating.query.delete()
#         Comment.query.delete()
#         Follow.query.delete()
#         # UserClub.query.delete()
#         db.session.commit()
# def seed_data():
#     with app.app_context():    
#         # Clear the database
#         Cleardata()
#         print("Clearing data...")
#         db.drop_all()
#         db.create_all()

#         print("Seeding data...")

#         # Seed Users
#         users = []
#         for _ in range(5):
#             password = "default_password"
#             user = User(
#                 username=fake.name(),
#                 email=fake.email(),
#                 _password_hash=generate_password_hash(password)
#             )
#             db.session.add(user)
#             users.append(user)
        
#         db.session.commit()  # Commit users to ensure they are in the database

#         # Check if users exist before creating movies
#         if not users:
#             raise Exception("No users available to seed movies.")

#         # Seed Movies
#         movies = []
#         for _ in range(10):
#             user = choice(users)  # Assign a random user as the creator
#             movie = Movie(
#                 title=fake.catch_phrase(),
#                 genre=fake.word(),
#                 description=fake.text(max_nb_chars=200),
#                 release_year=fake.year(),
#                 poster_url=fake.image_url(),
#                 user_id=user.id  # Use a valid user_id
#             )
#             db.session.add(movie)
#             movies.append(movie)

#         db.session.commit()
#         # # seed follow
#         # print("Seeding follows...")
#         # for _ in range(10):  # Create 10 random follow relationships
#         #     follower = choice(users)
#         #     followed = choice(users)
            
#         #     # Ensure a user cannot follow themselves
#         #     if follower != followed:
#         #         follow = Follow(follower_id=follower.id, followed_id=followed.id)
#         #         db.session.add(follow)

#         # db.session.commit()

#         # Seed Clubs
#         clubs = []
#         for _ in range(3):
#             club = Club(
#                 name=fake.company(),
#                 description=fake.text(max_nb_chars=150)
#             )
#             db.session.add(club)
#             clubs.append(club)
        
#         db.session.commit()

#         # Seed Posts
#         posts = []
#         for _ in range(5):
#             user = choice(users)
#             club = choice(clubs)
#             post = Post(
#                 content=fake.text(max_nb_chars=250),
#                 user_id=user.id,
#                 club_id=club.id,
#                 updated_at=datetime.utcnow()
#             )
#             db.session.add(post)
#             posts.append(post)
        
#         db.session.commit()

#         # Seed Comments
#         for _ in range(15):
#             user = choice(users)
#             post = choice(posts)
#             comment = Comment(
#                 content=fake.sentence(),
#                 user_id=user.id,
#                 post_id=post.id
#             )
#             db.session.add(comment)
        
#         db.session.commit()

#         print("Seeding completed successfully.")

# if __name__ == "__main__":
#     seed_data()
