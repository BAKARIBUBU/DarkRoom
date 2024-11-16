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
        Club(name="Heroes", description="FanBase club for heroes", members_num="1", created_at=datetime.now(), updated_at=datetime.now()),
        Club(name="Romance", description="Romance lovers", members_num="3", created_at=datetime.now(), updated_at=datetime.now()),
        Club(name="Drama", description="Club for people suspense seekers", members_num="4", created_at=datetime.now(), updated_at=datetime.now()),
        Club(name="Kids", description="Club for the kids", members_num="2", created_at=datetime.now(), updated_at=datetime.now()),
    ]
    db.session.add_all(Clubs)
    db.session.commit()

    print("Seeding Comment...")
    Comments = [
        Comment(user_id=1, post_id=4, created_at=datetime.now(), content="Superman is my fav"),
        Comment(user_id=4, post_id=2, created_at=datetime.now(), content="I like Ben 10"),
        Comment(user_id=2, post_id=3, created_at=datetime.now(), content="I like the movie love tacticts"),
        Comment(user_id=3, post_id=1, created_at=datetime.now(), content="Is Queens Gambit a drama show?"),
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
        # Movie(title="Batman vs Superman", genre="Action", description="Two heroes who have dominated the industry finally face off stay tuned and find out the reason and who will win in this action.", release_year=2023, poster_url="https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg")
        # ,    
            Movie(
            title="Batman vs Superman",
            genre="Action",
            description="Two heroes who have dominated the industry finally face off. Stay tuned and find out the reason and who will win in this action.",
            release_year=2023,
            poster_url="https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        )
        ,
        Movie(title="Queens Gambit", genre="Drama", description="A woman so in her game that she is not ready for any man to bring her down. Watch as she dominates the chess game and shows the power of women.", release_year=2011, poster_url="https://m.media-amazon.com/images/M/MV5BMmRlNjQxNWQtMjk1OS00N2QxLTk0YWQtMzRhYjY5YTFhNjMxXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg"),
        Movie(title="Ben 10", genre="kids", description="A 10 year old boy finds a watch called the omnitrix which he can transform to different aliens will he use it to save the world or destroy it.", release_year=2010, poster_url="https://occ-0-8407-1722.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR6vn8BtaC8r6FhDOfMCliOri5vm4p5bCnxzV61blyd_QJP0qr8VdYGGyoFxkLfwDc1nDVqf4ilKrmD1XquOAlXD29EyAM4UbC4i.jpg"),
        Movie(title="Love Tactics", genre="Romance", description="When two people who have been in the romance game too long they basically become pros, Not naive to silly tactics they face off against each other to see who will have the upper hand.", release_year=2000, poster_url="https://occ-0-8407-116.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABa35MbGCz3lUSTpuznsS4edbPgpTRK1P2jWrsa22oNv3xHiM_TyinMpuTe10BD-9nyyhr8MgzvCwOEkfPjgZfY9_K23tOGre-JgdlqBjHaeLfD-7OTJS_5sb8io24yOIU5B0tg.jpg")
        ,
    ]
    db.session.add_all(Movies)
    db.session.commit()
    movies = Movie.query.all()
    print("\nDisplaying Movie Poster URLs:")
    for movie in movies:
        print(f"Title: {movie.title} - Poster URL: {movie.poster_url}")

    print("Seeding Posts...")
    Posts = [
        Post(user_id=2, created_at=datetime.now(), content="Action", movie_id=1, club_id=1, updated_at=datetime.now()),
        Post(user_id=1, created_at=datetime.now(), content="Drama", movie_id=2, club_id=2, updated_at=datetime.now()),
        Post(user_id=4, created_at=datetime.now(), content="Kids", movie_id=3, club_id=3, updated_at=datetime.now()),
        Post(user_id=3, created_at=datetime.now(), content="Romance", movie_id=4, club_id=4, updated_at=datetime.now()),
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
       
        