from faker import Faker
from random import choice
from models import db, User, Movie, Club, Post, Comment
from werkzeug.security import generate_password_hash
from app import app
from models.club import Club
from models.db import db
from datetime import datetime
from models.userclub import UserClub

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

    print("Seeding Movies...")
    Movies = [
        # Movie(title="Batman vs Superman", genre="Action", description="Two heroes who have dominated the industry finally face off stay tuned and find out the reason and who will win in this action.", release_year=2023, poster_url="https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg")
        # ,    
            Movie(
            title="Batman vs Superman",
            genre="Action",
            description="Two heroes who have dominated the industry finally face off. Stay tuned and find out the reason and who will win in this action.",
            release_year=2023,
            poster_url="https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            user_id=1
        )
,
        Movie(title="Queens Gambit", genre="Drama", description="A woman so in her game that she is not ready for any man to bring her down. Watch as she dominates the chess game and shows the power of women.", release_year=2011, poster_url="https://m.media-amazon.com/images/M/MV5BMmRlNjQxNWQtMjk1OS00N2QxLTk0YWQtMzRhYjY5YTFhNjMxXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",user_id=2 ),
        Movie(title="Ben 10", genre="kids", description="A 10 year old boy finds a watch called the omnitrix which he can transform to different aliens will he use it to save the world or destroy it.", release_year=2010, poster_url="https://occ-0-8407-1722.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR6vn8BtaC8r6FhDOfMCliOri5vm4p5bCnxzV61blyd_QJP0qr8VdYGGyoFxkLfwDc1nDVqf4ilKrmD1XquOAlXD29EyAM4UbC4i.jpg",user_id=3 ),
        Movie(title="Love Tactics", genre="Romance", description="When two people who have been in the romance game too long they basically become pros, Not naive to silly tactics they face off against each other to see who will have the upper hand.", release_year=2000, poster_url="https://occ-0-8407-116.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABa35MbGCz3lUSTpuznsS4edbPgpTRK1P2jWrsa22oNv3xHiM_TyinMpuTe10BD-9nyyhr8MgzvCwOEkfPjgZfY9_K23tOGre-JgdlqBjHaeLfD-7OTJS_5sb8io24yOIU5B0tg.jpg",user_id=4)
        ,
    ]
    db.session.add_all(Movies)
    db.session.commit()
    movies = Movie.query.all()
    print("\nDisplaying Movie Poster URLs:")
    for movie in movies:
        print(f"Title: {movie.title} - Poster URL: {movie.poster_url}")

#     print("Seeding Posts...")
#     Posts = [
#         Post(user_id=2, created_at=datetime.now(), content="Action", movie_id=1, club_id=1, updated_at=datetime.now()),
#         Post(user_id=1, created_at=datetime.now(), content="Drama", movie_id=2, club_id=2, updated_at=datetime.now()),
#         Post(user_id=4, created_at=datetime.now(), content="Kids", movie_id=3, club_id=3, updated_at=datetime.now()),
#         Post(user_id=3, created_at=datetime.now(), content="Romance", movie_id=4, club_id=4, updated_at=datetime.now()),
#     ]
#     db.session.add_all(Posts)
#     db.session.commit()
    print("Seeding Posts...")
    Posts = [
        Post(user_id=2, created_at=datetime.now(), content="Action", movie_id=1, club_id=1, updated_at=datetime.now()),
        Post(user_id=1, created_at=datetime.now(), content="Drama", movie_id=2, club_id=2, updated_at=datetime.now()),
        Post(user_id=4, created_at=datetime.now(), content="Kids", movie_id=3, club_id=3, updated_at=datetime.now()),
        Post(user_id=3, created_at=datetime.now(), content="Romance", movie_id=4, club_id=4, updated_at=datetime.now()),
    ]
    db.session.add_all(Posts)
    db.session.commit()

    # print("Seeding Rating...")
    # Ratings = [
    #     Rating(user_id=2, movie_id=3, score=7, review=5, created_at=datetime.now()),
    #     Rating(user_id=1, movie_id=2, score=8, review=5, created_at=datetime.now()),
    #     Rating(user_id=3, movie_id=4, score=5, review=5, created_at=datetime.now()),
    #     Rating(user_id=4, movie_id=1, score=4, review=5, created_at=datetime.now()),
    # ]
    # db.session.add_all(Ratings)
    # db.session.commit()

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
    UserClub(user_id=1, club_id=2, joined_at=datetime.now()),  # Explicitly defining user_id
    UserClub(user_id=2, club_id=3, joined_at=datetime.now()),  # Explicitly defining user_id
    UserClub(user_id=4, club_id=4, joined_at=datetime.now()),  # Explicitly defining user_id
    UserClub(user_id=3, club_id=1, joined_at=datetime.now())   # Explicitly defining user_id
]
    db.session.add_all(UserClubs)
    db.session.commit()


print("Seeding Completed!")