from flask import Flask, request, jsonify
from flask_restful import Api, Resource
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm.exc import NoResultFound
from models import db,Club,Comment,Follow,Movie,Post,Rating,User,UserClub
from flask_jwt_extended import JWTManager,jwt_required, create_access_token, get_jwt_identity
import os
from sqlalchemy.orm import joinedload
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

from flask_cors import CORS
from flask_migrate import Migrate
app = Flask(__name__)
api = Api(app)

# allowed_origins = [
#     "http://localhost:5173",
# ]
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# CORS(app, resources={r"/*": {"origins": allowed_origins}})
# CORS(app, origins="http://localhost:5173") 
# CORS(app)


# #app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://darkroomdatabase_user:KxMwejXXBjMiztxk7JLASeWmXyeg77KS@dpg-cslikbbv2p9s7386jhcg-a.oregon-postgres.render.com/darkroomdatabase'  # Example URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///darkroom.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7) 
# app.config['JWT_SECRET_KEY'] = 'EdwinSharonBakariBarkleyFavoured'

migrate = Migrate(app, db)
db.init_app(app)

jwt = JWTManager(app)



# bcrypt = Bcrypt(app)


# Define a basic route

@app.route('/')
def home():
    return "Hello, Render! Your Flask app is running. welcome back"

class UsersResource(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify({'message': 'Users fetched successfully', 'status': 200, 'data': users})

    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully', 'status': 201, 'data': new_user.to_dict()})

api.add_resource(UsersResource, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user is None:
            return jsonify({'message': 'User not found', 'status': 404})

        return jsonify({'message': 'User fetched successfully', 'status': 200, 'data': user.to_dict()})

    def patch(self, id):
        record = User.query.filter_by(id=id).first()

        if record is None:
           return jsonify({'message': 'User not found', 'status': 404})

        data = request.get_json()

        # If the request includes a new profile image URL, update the profile_picture field
        if 'profile_picture' in data:
            record.profile_picture = data['profile_picture']

        # Update other user fields based on the incoming data
        for attr, value in data.items():
            if attr != 'profile_picture':  # Skip profile_picture as it's already handled
                setattr(record, attr, value)

        db.session.add(record)
        db.session.commit()

        return jsonify({'message': 'User updated successfully', 'status': 200, 'data': record.to_dict()})

    def delete(self, id):
        record = User.query.filter_by(id=id).first()

        if record is None:
            return jsonify({'message': 'User not found', 'status': 404})

        db.session.delete(record)
        db.session.commit()
        return jsonify({'message': 'User successfully deleted', 'status': 200})

# Register the resource with the API
api.add_resource(UserByID, '/users/<int:id>')


#  SHARON WORK
# class UserByID(Resource):
#     def get(self, id):
#         user = User.query.filter_by(id=id).first()

#         if user is None:
#             return jsonify({'message': 'User not found', 'status': 404})

#         return jsonify({'message': 'User fetched successfully', 'status': 200, 'data': user.to_dict()})

#     def patch(self, id):
#         record = User.query.filter_by(id=id).first()

#         if record is None:
#            return jsonify({'message': 'User not found', 'status': 404})

#         data = request.get_json()

#     # Update the user fields based on the incoming data
#         for attr, value in data.items():
#           setattr(record, attr, value)

#         db.session.add(record)
#         db.session.commit()

#         return jsonify({'message': 'User updated successfully', 'status': 200, 'data': record.to_dict()})

#     def delete(self, id):
#         record = User.query.filter_by(id=id).first()

#         if record is None:
#             return jsonify({'message': 'User not found', 'status': 404})

#         db.session.delete(record)
#         db.session.commit()
#         return jsonify({'message': 'User successfully deleted', 'status': 200})

# api.add_resource(UserByID, '/users/<int:id>')

class UserRegistration(Resource):
    def post(self):
        data = request.get_json()

        if not data or 'username' not in data or 'email' not in data or 'password' not in data:
            return jsonify({'message': 'Missing required fields', 'status': 400})

        existing_user = User.query.filter_by(email=data['email']).first()

        if existing_user:
            return jsonify({'message': 'User with this email already exists', 'status': 400})

        new_user = User(username=data['username'], email=data['email'])
        new_user.password = data['password']
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id)

        return jsonify({
            'message': 'User registered successfully',
            'status': 201,
            'data': new_user.to_dict(),
            'access_token': access_token
        })

api.add_resource(UserRegistration, '/register')


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            # Generate the access token with user identity
            access_token = create_access_token(identity=user.id)

            # Include user details in the response, including profile_picture
            return jsonify({
                'message': 'Login successful',
                'status': 200,
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    'profile_picture': user.profile_picture  # Include profile picture
                }
            })

        return jsonify({'message': 'Invalid credentials', 'status': 401})

api.add_resource(Login, '/login')

# BAKARI THE ENDPOINT BELOW DOES NOT INCLUDE PROFILE PICTURE
# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')

#         user = User.query.filter_by(email=email).first()

#         if user and user.check_password(password):
#             # Generate the access token with user identity
#             access_token = create_access_token(identity=user.id)

#             # Include user details in the response
#             return jsonify({
#                 'message': 'Login successful',
#                 'status': 200,
#                 'access_token': access_token,
#                 'user': {
#                     'id': user.id,
#                     'email': user.email,
#                     'username': user.username  # Include any other user info you'd like here
#                 }
#             })

#         return jsonify({'message': 'Invalid credentials', 'status': 401})

# api.add_resource(Login, '/login')


# SHARON WORK
# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')

#         user = User.query.filter_by(email=email).first()

#         if user and user.check_password(password):
#             access_token = create_access_token(identity=user.id)
#             return jsonify({
#                 'message': 'Login successful',
#                 'status': 200,
#                 'access_token': access_token
#             })

#         return jsonify({'message': 'Invalid credentials', 'status': 401})

# api.add_resource(Login, '/login')


class Logout(Resource):
    def post(self):
        return jsonify({'message': 'Logged out successfully', 'status': 200})

api.add_resource(Logout, '/logout')


class MovieResource(Resource):
    @jwt_required()
    def get(self):
        # Fetch movies for the authenticated user
        user_id = get_jwt_identity()
        movies = Movie.query.filter_by(user_id=user_id).all()
        return jsonify({
            'message': 'Movies fetched successfully',
            'status': 200,
            'data': [movie.to_dict() for movie in movies]
        })

    @jwt_required()
    def post(self):
        # Add a new movie for the authenticated user
        user_id = get_jwt_identity()
        data = request.get_json()

        try:
            new_movie = Movie(
                title=data['title'],
                genre=data['genre'],
                description=data['description'],
                release_year=data['release_year'],
                poster_url=data['poster_url'],
                user_id=user_id  # Associate the movie with the user
            )
            db.session.add(new_movie)
            db.session.commit()
            return jsonify({
                'message': 'Movie created successfully',
                'status': 201,
                'data': new_movie.to_dict()
            })
        except Exception as e:
            db.session.rollback()
            return jsonify({
                'message': 'An error occurred',
                'status': 400,
                'error': str(e)
            })

api.add_resource(MovieResource, '/movies')


class MovieByID(Resource):
    @jwt_required()
    def get(self, id):
        # Fetch a specific movie for the authenticated user
        user_id = get_jwt_identity()
        movie = Movie.query.filter_by(id=id, user_id=user_id).first()

        if movie is None:
            return jsonify({'message': 'Movie not found', 'status': 404})

        return jsonify({
            'message': 'Movie fetched successfully',
            'status': 200,
            'data': movie.to_dict()
        })

    @jwt_required()
    def patch(self, id):
        # Update a movie for the authenticated user
        user_id = get_jwt_identity()
        movie = Movie.query.filter_by(id=id, user_id=user_id).first()

        if movie is None:
            return jsonify({'message': 'Movie not found', 'status': 404})

        data = request.get_json()

        try:
            for key, value in data.items():
                if hasattr(movie, key):
                    setattr(movie, key, value)

            db.session.commit()
            return jsonify({
                'message': 'Movie updated successfully',
                'status': 200,
                'data': movie.to_dict()
            })
        except Exception as e:
            db.session.rollback()
            return jsonify({
                'message': 'An error occurred',
                'status': 400,
                'error': str(e)
            })

    @jwt_required()
    def delete(self, id):
        # Delete a movie for the authenticated user
        user_id = get_jwt_identity()
        movie = Movie.query.filter_by(id=id, user_id=user_id).first()

        if movie is None:
            return jsonify({'message': 'Movie not found', 'status': 404})

        try:
            db.session.delete(movie)
            db.session.commit()
            return jsonify({'message': 'Movie successfully deleted', 'status': 200})
        except Exception as e:
            db.session.rollback()
            return jsonify({
                'message': 'An error occurred',
                'status': 400,
                'error': str(e)
            })

api.add_resource(MovieByID, '/movies/<int:id>')


# SHARONS WORK
# class MovieResource(Resource):
#     def get(self):
#         movies = Movie.query.all()
#         return jsonify({'message': 'Movies fetched successfully', 'status': 200, 'data': [movie.to_dict() for movie in movies]})

#     def post(self):
#         data = request.get_json()
#         new_movie = Movie(
#             title=data['title'],
#             genre=data['genre'],
#             description=data['description'],
#             release_year=data['release_year'],
#             poster_url=data['poster_url']
#         )
#         db.session.add(new_movie)
#         db.session.commit()
#         return jsonify({'message': 'Movie created successfully', 'status': 201, 'data': new_movie.to_dict()})

# api.add_resource(MovieResource, '/movies')

# class MovieByID(Resource):
#     def get(self, id):
#         movie = Movie.query.filter_by(id=id).first()

#         if movie is None:
#             return jsonify({'message': 'Movie not found', 'status': 404})

#         return jsonify({'message': 'Movie fetched successfully', 'status': 200, 'data': movie.to_dict()})

#     def patch(self, id):
#         movie = Movie.query.filter_by(id=id).first()

#         if movie is None:
#             return jsonify({'message': 'Movie not found', 'status': 404})

#         data = request.get_json()

#         for key, value in data.items():
#             if hasattr(movie, key):
#                 setattr(movie, key, value)

#         db.session.commit()

#         return jsonify({'message': 'Movie updated successfully', 'status': 200, 'data': movie.to_dict()})

#     def delete(self, id):
#         movie = Movie.query.filter_by(id=id).first()

#         if movie is None:
#             return jsonify({'message': 'Movie not found', 'status': 404})

#         db.session.delete(movie)
#         db.session.commit()

#         return jsonify({'message': 'Movie successfully deleted', 'status': 200})

# api.add_resource(MovieByID, '/movies/<int:id>')



class ClubResource(Resource):
    def get(self):
        clubs = Club.query.all()
        return jsonify({'message': 'Clubs fetched successfully', 'status': 200, 'data': [club.to_dict() for club in clubs]})

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()

        if not data.get('name'):
            return jsonify({'message': 'Club name is required', 'status': 400})


        new_club = Club(
              name=data['name'],
              description=data.get('description', ''),
              members_num=data.get('members_num', 0),
              profile_image=data.get('profile_image', 'https://www.shutterstock.com/image-vector/silhouette-heads-faces-profile-multiethnic-600nw-2161769995.jpg')  # Use user-provided image or default
    )

        # new_club.club_users.append(user_id)
        #     # Find the user by user_id
        # user = User.query.get(user_id)
        # if not user:
        #     return jsonify({'message': 'User not found', 'status': 404})

        user_club = UserClub(user_id=user_id, club=new_club)
        db.session.add(user_club)

        db.session.add(new_club)
        db.session.commit()

        return jsonify({'message': 'Club created successfully', 'status': 201, 'data': new_club.to_dict()})

api.add_resource(ClubResource, '/clubs')

class ClubByID(Resource):
    def get(self, id):
        try:
            club = Club.query.filter_by(id=id).one()
            return jsonify({'message': 'Club fetched successfully', 'status': 200, 'data': club.to_dict()})
        except NoResultFound:
            return jsonify({'message': 'Club not found', 'status': 404})

    @jwt_required()
    def patch(self, id):
        user_id = get_jwt_identity()

        club = Club.query.filter_by(id=id).first()

        if club is None:
            return jsonify({'message': 'Club not found', 'status': 404})

        if user_id not in [user_club.user_id for user_club in club.club_users]:
            return jsonify({'message': 'Unauthorized to edit this club', 'status': 403})

        data = request.get_json()

        for attr, value in data.items():
            setattr(club, attr, value)

        db.session.commit()

        return jsonify({'message': 'Club updated successfully', 'status': 200, 'data': club.to_dict()})

    @jwt_required()
    def delete(self, id):
        user_id = get_jwt_identity()

        club = Club.query.filter_by(id=id).first()

        if club is None:
            return jsonify({'message': 'Club not found', 'status': 404})

        if user_id not in [user_club.user_id for user_club in club.club_users]:
            return jsonify({'message': 'Unauthorized to delete this club', 'status': 403})

        db.session.delete(club)
        db.session.commit()

        return jsonify({'message': 'Club successfully deleted', 'status': 200})

api.add_resource(ClubByID, '/clubs/<int:id>')

class PostResource(Resource):
    def get(self):
        # posts = Post.query.all()
        # return jsonify({'message': 'Posts fetched successfully', 'status': 200, 'data': [post.to_dict() for post in posts]})
        posts = Post.query.options(joinedload(Post.movie), joinedload(Post.club), joinedload(Post.user)).all()
        
        return jsonify({
            'message': 'Posts fetched successfully',
            'status': 200,
            'data': [post.to_dict() for post in posts]
        })

    # POST: Create a new post
    @jwt_required()  # Ensure the user is logged in
    def post(self):
        data = request.get_json()

        # Ensure required fields are provided
        if not data or 'content' not in data or 'club_id' not in data or 'movie_title' not in data or 'movie_poster_url' not in data:
            return jsonify({'message': 'Missing required fields', 'status': 400})

        user_id = get_jwt_identity()  # Get the user ID from the JWT token
        content = data['content']
        club_id = data['club_id']
        movie_title = data['movie_title']
        movie_poster_url = data['movie_poster_url']

        try:
            new_post = Post.create_post_with_movie(user_id=user_id, club_id=club_id, content=content, movie_title=movie_title, movie_poster_url=movie_poster_url)
        except Exception as e:
            return jsonify({'message': f'Error creating post: {str(e)}', 'status': 500})

        return jsonify({'message': 'Post created successfully', 'status': 201, 'data': new_post.to_dict()})

api.add_resource(PostResource, '/posts')
@classmethod
def create_post_with_movie(cls, user_id, club_id, content, movie_title, movie_poster_url):
    # Find or create the movie
    movie = Movie.query.filter_by(title=movie_title, poster_url=movie_poster_url).first()
    if not movie:
        movie = Movie(title=movie_title, poster_url=movie_poster_url, user_id=user_id)
        db.session.add(movie)
        db.session.commit()

    # Create the post
    new_post = cls(
        user_id=user_id,
        club_id=club_id,
        content=content,
        movie_id=movie.id,
        updated_at=func.now()
    )
    db.session.add(new_post)
    db.session.commit()

    return new_post

class PostByID(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()

        if post is None:
            return jsonify({'message': 'Post not found', 'status': 404})

        return jsonify({'message': 'Post fetched successfully', 'status': 200, 'data': post.to_dict()})

    # PATCH: Update an existing post by its ID
    @jwt_required()  # Ensure the user is logged in
    def patch(self, id):
        post = Post.query.filter_by(id=id).first()

        if post is None:
            return jsonify({'message': 'Post not found', 'status': 404})

        user_id = get_jwt_identity()

        if post.user_id != user_id:
            return jsonify({'message': 'Unauthorized to update this post', 'status': 403})

        data = request.get_json()

        for key, value in data.items():
            setattr(post, key, value)

        db.session.commit()

        return jsonify({'message': 'Post updated successfully', 'status': 200, 'data': post.to_dict()})

    # DELETE: Delete a post by its ID
    @jwt_required()  # Ensure the user is logged in
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()

        if post is None:
            return jsonify({'message': 'Post not found', 'status': 404})

        user_id = get_jwt_identity()

        if post.user_id != user_id:
            return jsonify({'message': 'Unauthorized to delete this post', 'status': 403})

        db.session.delete(post)
        db.session.commit()

        return jsonify({'message': 'Post successfully deleted', 'status': 200})

api.add_resource(PostByID, '/posts/<int:id>')

class RatingResource(Resource):
    def get(self):
        movie_id = request.args.get('movie_id')
        if movie_id:
            ratings = Rating.query.filter_by(movie_id=movie_id).all()
        else:
            ratings = Rating.query.all()

        return jsonify({'message': 'Ratings fetched successfully', 'status': 200, 'data': [rating.to_dict() for rating in ratings]})

    @jwt_required()  # Ensure the user is logged in
    def post(self):
        data = request.get_json()

        if not data or 'movie_id' not in data or 'score' not in data or 'review' not in data:
            return jsonify({'message': 'Missing required fields', 'status': 400})

        user_id = get_jwt_identity()  # Get the user ID from the JWT token
        movie_id = data['movie_id']
        score = data['score']
        review = data['review']

        movie = Movie.query.filter_by(id=movie_id).first()
        if not movie:
            return jsonify({'message': 'Movie not found', 'status': 404})

        existing_rating = Rating.query.filter_by(user_id=user_id, movie_id=movie_id).first()
        if existing_rating:
            return jsonify({'message': 'User has already rated this movie', 'status': 400})

        new_rating = Rating(user_id=user_id, movie_id=movie_id, score=score, review=review)
        db.session.add(new_rating)
        db.session.commit()

        return jsonify({'message': 'Rating created successfully', 'status': 201, 'data': new_rating.to_dict()})

api.add_resource(RatingResource, '/ratings')

class RatingByID(Resource):
    def get(self, id):
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return jsonify({'message': 'Rating not found', 'status': 404})

        return jsonify({'message': 'Rating fetched successfully', 'status': 200, 'data': rating.to_dict()})

    @jwt_required()  # Ensure the user is logged in
    def patch(self, id):
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return jsonify({'message': 'Rating not found', 'status': 404})

        user_id = get_jwt_identity()

        if rating.user_id != user_id:
            return jsonify({'message': 'Unauthorized to update this rating', 'status': 403})

        data = request.get_json()

        for key, value in data.items():
            setattr(rating, key, value)

        db.session.commit()

        return jsonify({'message': 'Rating updated successfully', 'status': 200, 'data': rating.to_dict()})

    @jwt_required()  # Ensure the user is logged in
    def delete(self, id):
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return jsonify({'message': 'Rating not found', 'status': 404})

        user_id = get_jwt_identity()

        if rating.user_id != user_id:
            return jsonify({'message': 'Unauthorized to delete this rating', 'status': 403})

        db.session.delete(rating)
        db.session.commit()

        return jsonify({'message': 'Rating successfully deleted', 'status': 200})

api.add_resource(RatingByID, '/ratings/<int:id>')

class CommentResource(Resource):
    def get(self, post_id):
        comments = Comment.query.filter_by(post_id=post_id).all()
        return jsonify({
        'message': 'Comments fetched successfully',
        'status': 200,
        'data': [
            {**comment.to_dict(), 'user_name': comment.user.username} for comment in comments
        ]
    })
        # return jsonify({'message': 'Comments fetched successfully', 'status': 200, 'data': [comment.to_dict() for comment in comments]})

    @jwt_required()  # Ensure the user is logged in
    def post(self, post_id):
        data = request.get_json()

        if not data or 'content' not in data:
            return jsonify({'message': 'Missing required fields', 'status': 400})

        user_id = get_jwt_identity()

        new_comment = Comment(post_id=post_id, user_id=user_id, content=data['content'])

        db.session.add(new_comment)
        db.session.commit()

        return jsonify({'message': 'Comment created successfully', 'status': 201, 'data': new_comment.to_dict()})

api.add_resource(CommentResource, '/comments/<int:post_id>')

class CommentByID(Resource):
    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()

        if not comment:
            return jsonify({'message': 'Comment not found', 'status': 404})

        return jsonify({'message': 'Comment fetched successfully', 'status': 200, 'data': comment.to_dict()})

    @jwt_required()  # Ensure the user is logged in
    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()

        if not comment:
            return jsonify({'message': 'Comment not found', 'status': 404})

        user_id = get_jwt_identity()

        if comment.user_id != user_id:
            return jsonify({'message': 'Unauthorized to update this comment', 'status': 403})

        data = request.get_json()

        for key, value in data.items():
            setattr(comment, key, value)

        db.session.commit()

        return jsonify({'message': 'Comment updated successfully', 'status': 200, 'data': comment.to_dict()})

    @jwt_required()  # Ensure the user is logged in
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()

        if not comment:
            return jsonify({'message': 'Comment not found', 'status': 404})

        user_id = get_jwt_identity()

        if comment.user_id != user_id:
            return jsonify({'message': 'Unauthorized to delete this comment', 'status': 403})

        db.session.delete(comment)
        db.session.commit()

        return jsonify({'message': 'Comment successfully deleted', 'status': 200})

api.add_resource(CommentByID, '/comments/<int:id>')   

class FollowResource(Resource):
    @jwt_required()  # Ensure the user is logged in to follow/unfollow
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()

        if 'followed_id' not in data:
            return jsonify({'message': 'Followed user ID is required', 'status': 400})

        followed_id = data['followed_id']

        if user_id == followed_id:
            return jsonify({'message': 'You cannot follow yourself', 'status': 400})

        existing_follow = Follow.query.filter_by(follower_id=user_id, followed_id=followed_id).first()
        if existing_follow:
            return jsonify({'message': 'You are already following this user', 'status': 400})

        new_follow = Follow(follower_id=user_id, followed_id=followed_id)
        db.session.add(new_follow)
        db.session.commit()

        return jsonify({'message': 'User followed successfully', 'status': 201})

    @jwt_required()  # Ensure the user is logged in to unfollow
    def delete(self):
        user_id = get_jwt_identity()
        data = request.get_json()

        if 'followed_id' not in data:
            return jsonify({'message': 'Followed user ID is required', 'status': 400})

        followed_id = data['followed_id']

        follow_record = Follow.query.filter_by(follower_id=user_id, followed_id=followed_id).first()
        if not follow_record:
            return jsonify({'message': 'You are not following this user', 'status': 404})

        db.session.delete(follow_record)
        db.session.commit()

        return jsonify({'message': 'Unfollowed successfully', 'status': 200})

api.add_resource(FollowResource, '/follow')

# User's Followers
class UserFollowers(Resource):
    @jwt_required()  # Ensure the user is logged in
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'User not found', 'status': 404})

        followers = Follow.query.filter_by(followed_id=id).all()
        follower_ids = [follow.follower_id for follow in followers]

        followers_details = [User.query.get(follower_id).to_dict() for follower_id in follower_ids]

        return jsonify({'message': 'Followers fetched successfully', 'status': 200, 'data': followers_details})

api.add_resource(UserFollowers, '/users/<int:id>/followers')

# User's Following
class UserFollowing(Resource):
    @jwt_required()  # Ensure the user is logged in
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'User not found', 'status': 404})

        followings = Follow.query.filter_by(follower_id=id).all()
        followed_ids = [follow.followed_id for follow in followings]

        followed_details = [User.query.get(followed_id).to_dict() for followed_id in followed_ids]

        return jsonify({'message': 'Followings fetched successfully', 'status': 200, 'data': followed_details})

api.add_resource(UserFollowing, '/users/<int:id>/following')

# Add and Remove User from Club (with authentication)
class AddUserToClub(Resource):
    @jwt_required()  # Ensure the user is logged in
    def post(self):
        data = request.get_json()

        user_id = data.get('user_id')
        club_id = data.get('club_id')

        if not user_id or not club_id:
            return jsonify({'message': 'user_id and club_id are required', 'status': 400})

        current_user_id = get_jwt_identity()

        if current_user_id != user_id:
            return jsonify({'message': 'You can only add yourself to a club', 'status': 403})

        user = User.query.get(user_id)
        club = Club.query.get(club_id)

        if not user:
            return jsonify({'message': 'User not found', 'status': 404})
        if not club:
            return jsonify({'message': 'Club not found', 'status': 404})

        existing_user_club = UserClub.query.filter_by(user_id=user_id, club_id=club_id).first()
        if existing_user_club:
            return jsonify({'message': 'User is already in this club', 'status': 400})

        user_club = UserClub(user_id=user_id, club_id=club_id)
        db.session.add(user_club)
        db.session.commit()

        return jsonify({'message': 'User added to club successfully', 'status': 201})

api.add_resource(AddUserToClub, '/clubs/add_user')

# Remove User from Club
class RemoveUserFromClub(Resource):
    @jwt_required()  # Ensure the user is logged in
    def delete(self, user_id, club_id):
        current_user_id = get_jwt_identity()

        if current_user_id != user_id:
            return jsonify({'message': 'You can only remove yourself from a club', 'status': 403})

        user_club = UserClub.query.filter_by(user_id=user_id, club_id=club_id).first()

        if not user_club:
            return jsonify({'message': 'User is not in this club', 'status': 404})

        db.session.delete(user_club)
        db.session.commit()

        return jsonify({'message': 'User removed from club successfully', 'status': 200})

api.add_resource(RemoveUserFromClub, '/clubs/remove_user/<int:user_id>/<int:club_id>')

# List Clubs for a User
class ClubsForUser(Resource):
    def get(self, user_id):
        clubs = Club.query.join(UserClub).filter(UserClub.user_id == user_id).all()

        if not clubs:
            return jsonify({'message': 'User is not a member of any club', 'status': 404})

        return jsonify({'message': 'Clubs fetched successfully', 'status': 200, 'data': [club.to_dict() for club in clubs]})

api.add_resource(ClubsForUser, '/users/<int:user_id>/clubs')

# List Users in a Club
class UsersInClub(Resource):
    def get(self, club_id):
        users = User.query.join(UserClub).filter(UserClub.club_id == club_id).all()

        if not users:
            return jsonify({'message': 'No users in this club', 'status': 404})

        return jsonify({'message': 'Users in club fetched successfully', 'status': 200, 'data': [user.to_dict() for user in users]})

api.add_resource(UsersInClub, '/clubs/<int:club_id>/users')



# BAKARI _______________________________________________________BEGINING____________________________________________________________________

# Clubs Resource: List all clubs and create a new club
class ClubsResourceBakari(Resource):
    def get(self):
        clubs = Club.query.all()
        return jsonify({'message': 'Clubs fetched successfully', 'status': 200, 'data': [club.to_dict() for club in clubs]})

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()

        if not data.get('name'):
            return jsonify({'message': 'Club name is required', 'status': 400})

        new_club = Club(
            name=data['name'],
            description=data.get('description', ''),
            members_num=data.get('members_num', 0),
            profile_image=data.get('profile_image', 'https://www.shutterstock.com/image-vector/silhouette-heads-faces-profile-multiethnic-600nw-2161769995.jpg')
        )

        user_club = UserClub(user_id=user_id, club=new_club)
        db.session.add(user_club)
        db.session.add(new_club)
        db.session.commit()

        return jsonify({'message': 'Club created successfully', 'status': 201, 'data': new_club.to_dict()})

api.add_resource(ClubsResourceBakari, '/clubs')


# Single Club Resource: Fetch, update, and delete a specific club
class SingleClubResourceBakari(Resource):
    def get(self, club_id):
        try:
            club = Club.query.filter_by(id=club_id).one()
            return jsonify({'message': 'Club fetched successfully', 'status': 200, 'data': club.to_dict()})
        except NoResultFound:
            return jsonify({'message': 'Club not found', 'status': 404})

    @jwt_required()
    def patch(self, club_id):
        user_id = get_jwt_identity()
        club = Club.query.filter_by(id=club_id).first()

        if club is None:
            return jsonify({'message': 'Club not found', 'status': 404})

        if user_id not in [user_club.user_id for user_club in club.club_users]:
            return jsonify({'message': 'Unauthorized to edit this club', 'status': 403})

        data = request.get_json()
        for attr, value in data.items():
            setattr(club, attr, value)

        db.session.commit()
        return jsonify({'message': 'Club updated successfully', 'status': 200, 'data': club.to_dict()})

    @jwt_required()
    def delete(self, club_id):
        user_id = get_jwt_identity()
        club = Club.query.filter_by(id=club_id).first()

        if club is None:
            return jsonify({'message': 'Club not found', 'status': 404})

        if user_id not in [user_club.user_id for user_club in club.club_users]:
            return jsonify({'message': 'Unauthorized to delete this club', 'status': 403})

        db.session.delete(club)
        db.session.commit()
        return jsonify({'message': 'Club successfully deleted', 'status': 200})

api.add_resource(SingleClubResourceBakari, '/clubs/<int:club_id>')

class JoinClubResourceBakari(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        club_id = data.get('club_id')

        if not club_id:
            return jsonify({'message': 'club_id is required', 'status': 400})

        current_user_id = get_jwt_identity()

        user = User.query.get(current_user_id)
        club = Club.query.get(club_id)

        if not user:
            return jsonify({'message': 'User not found', 'status': 404})
        if not club:
            return jsonify({'message': 'Club not found', 'status': 404})

        existing_user_club = UserClub.query.filter_by(user_id=current_user_id, club_id=club_id).first()
        if existing_user_club:
            return jsonify({'message': 'User is already in this club', 'status': 400})

        user_club = UserClub(user_id=current_user_id, club_id=club_id)
        db.session.add(user_club)
         # Update the club's members count
        club = Club.query.get(club_id)
        club.members_num += 1  # Increment member count
        db.session.commit()

        return jsonify({'message': 'User added to club successfully', 'status': 201})

api.add_resource(JoinClubResourceBakari, '/clubs/join')


# Join Club Resource: Add a user to a club
# class JoinClubResourceBakari(Resource):
#     @jwt_required()
#     def post(self):
#         data = request.get_json()
#         user_id = data.get('user_id')
#         club_id = data.get('club_id')

#         if not user_id or not club_id:
#             return jsonify({'message': 'user_id and club_id are required', 'status': 400})

#         current_user_id = get_jwt_identity()
#         if current_user_id != user_id:
#             return jsonify({'message': 'You can only add yourself to a club', 'status': 403})

#         user = User.query.get(user_id)
#         club = Club.query.get(club_id)

#         if not user:
#             return jsonify({'message': 'User not found', 'status': 404})
#         if not club:
#             return jsonify({'message': 'Club not found', 'status': 404})

#         existing_user_club = UserClub.query.filter_by(user_id=user_id, club_id=club_id).first()
#         if existing_user_club:
#             return jsonify({'message': 'User is already in this club', 'status': 400})

#         user_club = UserClub(user_id=user_id, club_id=club_id)
#         db.session.add(user_club)
#         db.session.commit()

#         return jsonify({'message': 'User added to club successfully', 'status': 201})

# api.add_resource(JoinClubResourceBakari, '/clubs/join')



# Leave Club Resource: Remove a user from a club
class LeaveClubResourceBakari(Resource):
    @jwt_required()
    def delete(self, user_id, club_id):
        current_user_id = get_jwt_identity()
        if current_user_id != user_id:
            return jsonify({'message': 'You can only remove yourself from a club', 'status': 403})

        user_club = UserClub.query.filter_by(user_id=user_id, club_id=club_id).first()
        if not user_club:
            return jsonify({'message': 'User is not in this club', 'status': 404})

        db.session.delete(user_club)
         # Update the club's members count
        club = Club.query.get(club_id)
        club.members_num -= 1  # Decrement member count
        db.session.commit()
        return jsonify({'message': 'User removed from club successfully', 'status': 200})

api.add_resource(LeaveClubResourceBakari, '/clubs/leave/<int:user_id>/<int:club_id>')


# User Clubs Resource: List all clubs a user is a member of
class UserClubsResourceBakari(Resource):
    def get(self, user_id):
        clubs = Club.query.join(UserClub).filter(UserClub.user_id == user_id).all()

        if not clubs:
            return jsonify({'message': 'User is not a member of any club', 'status': 404})

        return jsonify({'message': 'Clubs fetched successfully', 'status': 200, 'data': [club.to_dict() for club in clubs]})

api.add_resource(UserClubsResourceBakari, '/users/<int:user_id>/clubs')


# Club Members Resource: List all users in a club
class ClubMembersResourceBakari(Resource):
    def get(self, club_id):
        users = User.query.join(UserClub).filter(UserClub.club_id == club_id).all()

        if not users:
            return jsonify({'message': 'No users in this club', 'status': 404})

        return jsonify({'message': 'Users in club fetched successfully', 'status': 200, 'data': [user.to_dict() for user in users]})

api.add_resource(ClubMembersResourceBakari, '/clubs/<int:club_id>/members')

# ______________________________________________________END___________________________________________________________________________________________-
# Favoured
class ClubProfileImageResource(Resource):
    @jwt_required()
    def put(self, club_id):
        # Ensure the user is authorized to update this club
        user_id = get_jwt_identity()
        club = Club.query.filter_by(id=club_id).first()

        if club is None:
            return jsonify({'message': 'Club not found', 'status': 404})

        # Check if the user is a member of the club
        if user_id not in [user_club.user_id for user_club in club.club_users]:
            return jsonify({'message': 'Unauthorized to edit this club', 'status': 403})

        # Get the profile image URL from the request body
        data = request.get_json()
        profile_image_url = data.get('profileImage')

        if not profile_image_url:
            return jsonify({'message': 'No profile image URL provided', 'status': 400})

        # Update the club's profile image
        club.profile_image = profile_image_url  # Assuming 'profile_image' is a column in your Club model

        # Commit the changes to the database
        db.session.commit()

        return jsonify({
            'message': 'Profile image updated successfully',
            'status': 200,
            'data': club.to_dict()
        })

api.add_resource(ClubProfileImageResource, '/clubs/<int:club_id>/updateProfileImage')


# Club Details Resource: Fetch details of a specific club (members, posts, creation date)
class ClubDetailResource(Resource):
    @jwt_required()
    def get(self, club_id):
        # Fetch the club by ID
        club = Club.query.get_or_404(club_id)

        # Get members and posts related to the club
        members = [user_club.user_id for user_club in club.club_users]  # List of user IDs who joined the club
        posts = [post.to_dict() for post in club.posts]

        # Return club details along with the members and posts
        return jsonify({
            'message': 'Club details fetched successfully',
            'status': 200,
            'data': {
                'club': club.to_dict(),
                'members': members,
                'posts': posts,
                'members_count': club.members_num  # Include the members count
            }
        })
api.add_resource(ClubDetailResource, '/clubs/<int:club_id>/details')  # Fetch club details

class DeleteClubResource(Resource):
    @jwt_required()
    def delete(self):
        # Get the user identity from the JWT token
        user_id = get_jwt_identity()
        club_id = request.args.get('club_id')  # The club_id to delete will be passed as a query parameter

        # Fetch the club from the database
        club = Club.query.filter_by(id=club_id).first()

        if not club:
            return jsonify({'message': 'Club not found', 'status': 404})

        # Ensure the user is the creator of the club
        user_club = UserClub.query.filter_by(user_id=user_id, club_id=club_id).first()

        if not user_club:
            return jsonify({'message': 'You do not have permission to delete this club', 'status': 403})

        # Delete the club from the UserClub relationship (the many-to-many table)
        db.session.delete(user_club)
        
        # Delete the club itself
        db.session.delete(club)
        db.session.commit()

        return jsonify({'message': 'Club deleted successfully', 'status': 200})

# Adding the new resource to the API
api.add_resource(DeleteClubResource, '/clubs/delete')


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))  # Use environment variable or default to 5555
    app.run(host="0.0.0.0", port=port, debug=True)
