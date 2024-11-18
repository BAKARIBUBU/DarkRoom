from faker import Faker
from random import choice
from models import db, User, Movie, Club, Post, Comment
from werkzeug.security import generate_password_hash
from app import app
from datetime import datetime

fake = Faker()
def Cleardata():
    with app.app_context():  # Make sure we are within the app context
        print("Clearing data...")
        Movie.query.delete()
        User.query.delete()
        Club.query.delete()
        Post.query.delete()
        # Rating.query.delete()
        Comment.query.delete()
        # Follow.query.delete()
        # UserClub.query.delete()
        db.session.commit()
def seed_data():
    with app.app_context():    
        # Clear the database
        Cleardata()
        print("Clearing data...")
        db.drop_all()
        db.create_all()

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

        # Check if users exist before creating movies
        if not users:
            raise Exception("No users available to seed movies.")

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
# from random import choice, randint
# from app import db,app  # Assuming your database instance is imported from app
# from models import Movie, User, Club, UserClub, Post, Comment  # Adjust imports based on your app's structure

# # Initialize Faker
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
#         # Follow.query.delete()
#         UserClub.query.delete()
#         db.session.commit()

# # Seed the database
# def seed_data():
#     with app.app_context():    
#         # Clear the database
#         Cleardata()
#         # db.drop_all()
#         # db.create_all()

#         # Seed Movies
#         # Seed Movies
#         movies = []
#         for _ in range(10):
#             user = choice(users)  # Assign a random user as the creator
#             movie = Movie(
#                 title=fake.catch_phrase(),
#                 poster_url=fake.image_url(),
#                 description=fake.text(max_nb_chars=200),
#                 user_id=user.id  # Ensure a valid user_id is provided
#             )
#             db.session.add(movie)
#             movies.append(movie)

#         # movies = []
#         # for _ in range(10):
#         #     movie = Movie(
#         #         title=fake.catch_phrase(),
#         #         poster_url=fake.image_url(),
#         #         description=fake.text(max_nb_chars=200)
#         #     )
#         #     db.session.add(movie)
#         #     movies.append(movie)

#         # Seed Users
#         users = []
#         for _ in range(10):
#             user = User(
#                 email=fake.email(),
#                 password=fake.password(),
#                 username=fake.user_name()
#             )
#             db.session.add(user)
#             users.append(user)

#         # Seed Clubs
#         clubs = []
#         for _ in range(5):
#             club = Club(
#                 name=fake.company(),
#                 description=fake.text(max_nb_chars=100)
#             )
#             db.session.add(club)
#             clubs.append(club)

#         # Seed UserClub relationships
#         user_clubs = []
#         for user in users:
#             for _ in range(randint(1, 3)):  # Each user joins 1-3 clubs
#                 club = choice(clubs)
#                 user_club = UserClub(user_id=user.id, club_id=club.id)
#                 db.session.add(user_club)
#                 user_clubs.append(user_club)

#         # Seed Posts
#         posts = []
#         for _ in range(20):
#             user = choice(users)
#             club = choice(clubs)
#             movie = choice(movies)
#             post = Post(
#                 content=fake.paragraph(),
#                 user_id=user.id,
#                 club_id=club.id,
#                 movie_id=movie.id
#             )
#             db.session.add(post)
#             posts.append(post)

#         # Seed Comments
#         for _ in range(50):  # Create 50 comments
#             user = choice(users)
#             post = choice(posts)
#             comment = Comment(
#                 content=fake.sentence(),
#                 user_id=user.id,
#                 post_id=post.id
#             )
#             db.session.add(comment)

#         # Commit changes
#         db.session.commit()

# # Run the seeder
# if __name__ == "__main__":
#     seed_data()
#     print("Database seeded successfully!")

# from app import app
# from models.club import Club
# from models.comment import Comment
# from models.follow import Follow
# from models.movie import Movie
# from models.post import Post
# from models.rating import Rating
# from models.userclub import UserClub
# from models.user import User
# from models.db import db
# from datetime import datetime

# def Cleardata():
#     with app.app_context():  # Make sure we are within the app context
#         print("Clearing data...")
#         Movie.query.delete()
#         User.query.delete()
#         Club.query.delete()
#         Post.query.delete()
#         Rating.query.delete()
#         Comment.query.delete()
#         Follow.query.delete()
#         UserClub.query.delete()
#         db.session.commit()


# with app.app_context():  # Ensure the whole seeding process is wrapped in app context
#     # If necessary, you can clear the data first:
#     Cleardata()

#     print("Seeding Clubs...")
#     Clubs = [
#         Club(name="The Godfather Marathon", description="Join us for a deep dive into the epic saga of the Corleone family.", profile_image="data:image/jpeg;base64,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", members_num=20, created_at=datetime.now(), updated_at=datetime.now()),
#         Club(name="Sci-Fi Movie Night", description="Explore the best of science fiction with fellow enthusiasts.", profile_image="data:image/jpeg;base64,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", members_num=25, created_at=datetime.now(), updated_at=datetime.now()),
#         Club(name="Animated Films Spotlight", description="A discussion on the impact of animated films on the industry.", profile_image="data:image/jpeg;base64,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", members_num=15, created_at=datetime.now(), updated_at=datetime.now())
#         # Club(name="Heroes", description="FanBase club for heroes", members_num="1", created_at=datetime.now(), updated_at=datetime.now()),
#         # Club(name="Romance", description="Romance lovers", members_num="3", created_at=datetime.now(), updated_at=datetime.now()),
#         # Club(name="Drama", description="Club for people suspense seekers", members_num="4", created_at=datetime.now(), updated_at=datetime.now()),
#         # Club(name="Kids", description="Club for the kids", members_num="2", created_at=datetime.now(), updated_at=datetime.now()),
#     ]
#     db.session.add_all(Clubs)
#     db.session.commit()

#     print("Seeding Comment...")
#     Comments = [
#         Comment(user_id=1, post_id=4, created_at=datetime.now(), content="Superman is my fav"),
#         Comment(user_id=4, post_id=2, created_at=datetime.now(), content="I like Ben 10"),
#         Comment(user_id=2, post_id=3, created_at=datetime.now(), content="I like the movie love tacticts"),
#         Comment(user_id=3, post_id=1, created_at=datetime.now(), content="Is Queens Gambit a drama show?"),
#     ]
#     db.session.add_all(Comments)
#     db.session.commit()

    # print("Seeding Followers...")
    # Followers = [
    #     Follow(follower_id=2, followed_id=3, created_at=datetime.now()),
    #     Follow(follower_id=1, followed_id=3, created_at=datetime.now()),
    #     Follow(follower_id=4, followed_id=3, created_at=datetime.now()),
    #     Follow(follower_id=3, followed_id=3, created_at=datetime.now()),
    # ]
    # db.session.add_all(Followers)
    # db.session.commit()

#     print("Seeding Movies...")
#     Movies = [
#         # Movie(title="Batman vs Superman", genre="Action", description="Two heroes who have dominated the industry finally face off stay tuned and find out the reason and who will win in this action.", release_year=2023, poster_url="https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg")
#         # ,    
#             Movie(
#             title="Batman vs Superman",
#             genre="Action",
#             description="Two heroes who have dominated the industry finally face off. Stay tuned and find out the reason and who will win in this action.",
#             release_year=2023,
#             poster_url="https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
#             user_id=user_id 
#         )
# ,
#         Movie(title="Queens Gambit", genre="Drama", description="A woman so in her game that she is not ready for any man to bring her down. Watch as she dominates the chess game and shows the power of women.", release_year=2011, poster_url="https://m.media-amazon.com/images/M/MV5BMmRlNjQxNWQtMjk1OS00N2QxLTk0YWQtMzRhYjY5YTFhNjMxXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",user_id=user_id ),
#         Movie(title="Ben 10", genre="kids", description="A 10 year old boy finds a watch called the omnitrix which he can transform to different aliens will he use it to save the world or destroy it.", release_year=2010, poster_url="https://occ-0-8407-1722.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR6vn8BtaC8r6FhDOfMCliOri5vm4p5bCnxzV61blyd_QJP0qr8VdYGGyoFxkLfwDc1nDVqf4ilKrmD1XquOAlXD29EyAM4UbC4i.jpg",user_id=user_id ),
#         Movie(title="Love Tactics", genre="Romance", description="When two people who have been in the romance game too long they basically become pros, Not naive to silly tactics they face off against each other to see who will have the upper hand.", release_year=2000, poster_url="https://occ-0-8407-116.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABa35MbGCz3lUSTpuznsS4edbPgpTRK1P2jWrsa22oNv3xHiM_TyinMpuTe10BD-9nyyhr8MgzvCwOEkfPjgZfY9_K23tOGre-JgdlqBjHaeLfD-7OTJS_5sb8io24yOIU5B0tg.jpg",user_id=user_id )
#         ,
#     ]
#     db.session.add_all(Movies)
#     db.session.commit()
#     movies = Movie.query.all()
#     print("\nDisplaying Movie Poster URLs:")
#     for movie in movies:
#         print(f"Title: {movie.title} - Poster URL: {movie.poster_url}")

#     print("Seeding Posts...")
#     Posts = [
#         Post(user_id=2, created_at=datetime.now(), content="Action", movie_id=1, club_id=1, updated_at=datetime.now()),
#         Post(user_id=1, created_at=datetime.now(), content="Drama", movie_id=2, club_id=2, updated_at=datetime.now()),
#         Post(user_id=4, created_at=datetime.now(), content="Kids", movie_id=3, club_id=3, updated_at=datetime.now()),
#         Post(user_id=3, created_at=datetime.now(), content="Romance", movie_id=4, club_id=4, updated_at=datetime.now()),
#     ]
#     db.session.add_all(Posts)
#     db.session.commit()

    # print("Seeding Rating...")
    # Ratings = [
    #     Rating(user_id=2, movie_id=3, score=20, review=5, created_at=datetime.now()),
    #     Rating(user_id=1, movie_id=2, score=20, review=5, created_at=datetime.now()),
    #     Rating(user_id=3, movie_id=4, score=20, review=5, created_at=datetime.now()),
    #     Rating(user_id=4, movie_id=1, score=20, review=5, created_at=datetime.now()),
    # ]
    # db.session.add_all(Ratings)
    # db.session.commit()

    # print("Seeding Users...")
    # Users = [
    #     User(username="John", email="john@gmail.com", _password_hash="pass144", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
    #     User(username="Amos", email="amos@gmail.com", _password_hash="amos544", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
    #     User(username="Joan", email="joan@gmail.com", _password_hash="joan345", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
    #     User(username="Beatrice", email="beatrice@gmail.com", _password_hash="Rabbit", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
    # ]
    # db.session.add_all(Users)
    # db.session.commit()

    # print("Seeding UserClubs...")
    # UserClubs = [
    #     UserClub(user_id=1, club_id=2, joined_at=datetime.now()),
    #     UserClub(user_id=2, club_id=3, joined_at=datetime.now()),
    #     UserClub(user_id=4, club_id=4, joined_at=datetime.now()),
    #     UserClub(user_id=3, club_id=1, joined_at=datetime.now()),
    # ]
    # db.session.add_all(UserClubs)
    # db.session.commit()

    # print("Seeding Completed!")



# from app import app
# from models.club import Club
# from models.comment import Comment
# from models.follow import Follow
# from models.movie import Movie
# from models.post import Post
# from models.rating import Rating
# from models.userclub import UserClub
# from models.user import User
# from models.db import db
# from datetime import datetime

# def Cleardata():
#     with app.app_context():  # Make sure we are within the app context
#         print("Clearing data...")
#         Movie.query.delete()
#         User.query.delete()
#         Club.query.delete()
#         Post.query.delete()
#         Rating.query.delete()
#         Comment.query.delete()
#         Follow.query.delete()
#         UserClub.query.delete()
#         db.session.commit()

# with app.app_context():  # Ensure the whole seeding process is wrapped in app context
#     # If necessary, you can clear the data first:
#     Cleardata()

#     print("Seeding Clubs...")
#     Clubs = [
#         Club(name="Club1", description="This is club1", members_num="1", created_at=datetime.now(), updated_at=datetime.now()),
#         Club(name="Club2", description="This is club2", members_num="3", created_at=datetime.now(), updated_at=datetime.now()),
#         Club(name="Club3", description="This is club3", members_num="4", created_at=datetime.now(), updated_at=datetime.now()),
#         Club(name="Club4", description="This is club4", members_num="2", created_at=datetime.now(), updated_at=datetime.now()),
#     ]
#     db.session.add_all(Clubs)
#     db.session.commit()

#     print("Seeding Comment...")
#     Comments = [
#         Comment(user_id=1, post_id=4, created_at=datetime.now(), content="music"),
#         Comment(user_id=4, post_id=2, created_at=datetime.now(), content="its the best movie ever"),
#         Comment(user_id=2, post_id=3, created_at=datetime.now(), content="good movie"),
#         Comment(user_id=3, post_id=1, created_at=datetime.now(), content="I loved it"),
#     ]
#     db.session.add_all(Comments)
#     db.session.commit()

#     print("Seeding Followers...")
#     Followers = [
#         Follow(follower_id=2, followed_id=3, created_at=datetime.now()),
#         Follow(follower_id=1, followed_id=3, created_at=datetime.now()),
#         Follow(follower_id=4, followed_id=3, created_at=datetime.now()),
#         Follow(follower_id=3, followed_id=3, created_at=datetime.now()),
#     ]
#     db.session.add_all(Followers)
#     db.session.commit()

#     print("Seeding Movies...")
#     Movies = [
#         Movie(title="Inception", genre="action", description="People fighting for power", release_year=2023, poster_url=1),
#         Movie(title="Moana", genre="animation", description="Moana saves her kingdom", release_year=2011, poster_url=3),
#         Movie(title="Underground", genre="drama", description="Fighting for the love of his life", release_year=2010, poster_url=4),
#         Movie(title="Divergent", genre="Action", description="Two worlds collide", release_year=2000, poster_url=2),
#     ]
#     db.session.add_all(Movies)
#     db.session.commit()

#     print("Seeding Posts...")
#     Posts = [
#         Post(user_id=2, created_at=datetime.now(), content="music", movie_id=2, club_id=1, updated_at=datetime.now()),
#         Post(user_id=1, created_at=datetime.now(), content="music", movie_id=1, club_id=2, updated_at=datetime.now()),
#         Post(user_id=4, created_at=datetime.now(), content="music", movie_id=4, club_id=3, updated_at=datetime.now()),
#         Post(user_id=3, created_at=datetime.now(), content="music", movie_id=3, club_id=4, updated_at=datetime.now()),
#     ]
#     db.session.add_all(Posts)
#     db.session.commit()

#     print("Seeding Rating...")
#     Ratings = [
#         Rating(user_id=2, movie_id=3, score=20, review=5, created_at=datetime.now()),
#         Rating(user_id=1, movie_id=2, score=20, review=5, created_at=datetime.now()),
#         Rating(user_id=3, movie_id=4, score=20, review=5, created_at=datetime.now()),
#         Rating(user_id=4, movie_id=1, score=20, review=5, created_at=datetime.now()),
#     ]
#     db.session.add_all(Ratings)
#     db.session.commit()

#     print("Seeding Users...")
#     Users = [
#         User(username="John", email="john@gmail.com", _password_hash="pass144", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
#         User(username="Amos", email="amos@gmail.com", _password_hash="amos544", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
#         User(username="Joan", email="joan@gmail.com", _password_hash="joan345", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
#         User(username="Beatrice", email="beatrice@gmail.com", _password_hash="Rabbit", time_created=datetime.now(), profile_picture="dog", time_updated=datetime.now()),
#     ]
#     db.session.add_all(Users)
#     db.session.commit()

#     print("Seeding UserClubs...")
#     UserClubs = [
#         UserClub(user_id=1, club_id=2, joined_at=datetime.now()),
#         UserClub(user_id=2, club_id=3, joined_at=datetime.now()),
#         UserClub(user_id=4, club_id=4, joined_at=datetime.now()),
#         UserClub(user_id=3, club_id=1, joined_at=datetime.now()),
#     ]
#     db.session.add_all(UserClubs)
#     db.session.commit()

#     print("Seeding Completed!")

