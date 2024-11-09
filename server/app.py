from flask import Flask, request, jsonify,make_response
from flask_restful import Api, Resource, reqparse
# from flask_sqlalchemy import SQLAlchemy
from models.club import Club
from models.comment import Comment
from models.follow import Follow
from models.movie import Movie
from models.post import Post
from models.rating import Rating
from models.userclub import UserClub
from models.user import User
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy.orm.exc import NoResultFound
from models.db import db  # Import db directly
# from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager,jwt_required, create_access_token, get_jwt_identity
import os
import ipdb

app = Flask(__name__)
api = Api(app)
CORS(app)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://darkroomdatabase_user:KxMwejXXBjMiztxk7JLASeWmXyeg77KS@dpg-cslikbbv2p9s7386jhcg-a.oregon-postgres.render.com/darkroomdatabase'  # Example URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///darkroom.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

migrate = Migrate(app, db)
db.init_app(app)

jwt = JWTManager(app)

# bcrypt = Bcrypt(app)

# Define a basic route
# @app.route('/')
# def home():
#     return "Hello, Render! Your Flask app is running."

class UsersResource(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify(users), 200 
        # return make_response(jsonify(users), 200)

    def post(self):
        data = request.get_json()
        new_user = User(name=data['name'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
        # return make_response(jsonify(new_user.to_dict()), 201)

api.add_resource(UsersResource, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user is None:
            return jsonify({"error": "User not found"}), 404
            # return make_response(jsonify({"error": "User not found"}), 404)

        response_dict = user.to_dict()

        return jsonify(response_dict), 200
    
    def patch(self, id):
        record = User.query.filter_by(id=id).first()

        if record is None:
           return jsonify({"error": "User not found"}), 404

    # Get the data from the request body
        data = request.get_json()  # Use get_json() for JSON body

    # Update the user fields based on the incoming data
        for attr, value in data.items():
          setattr(record, attr, value)

    # Commit the changes to the database
        db.session.add(record)
        db.session.commit()

    # Return the updated user record
        return jsonify(record.to_dict()), 200 
    

    def delete(self, id):

        record = User.query.filter_by(id=id).first()
        db.session.delete(record)
        db.session.commit()
        return {"message": "record successfully deleted",'status': 200}

        # return make_response({"message": "record successfully deleted"}, 200)

api.add_resource(UserByID, '/users/<int:id>')

class UserRegistration(Resource):

    def post(self):
        # Get the data from the request
        data = request.get_json()

        # Validate that required fields are in the request
        if not data or 'username' not in data or 'email' not in data or 'password' not in data:
            return {'message': 'Missing required fields','status': 400}
        
        # ipdb.set_trace()

        # Check if the user already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        # print(data)
        if existing_user:
            return {'message': 'User with this email already exists', 'status': 400}
        # Create a new user and hash the password
        new_user = User(username=data['username'], email=data['email'])
        new_user.password = data['password']  # Assuming the password setter hashes the password
        db.session.add(new_user)
        db.session.commit()

        # Generate JWT token for the new user
        access_token = create_access_token(identity=new_user.id)

        # Return user data along with JWT token
        return {
            'message': 'User registered successfully',
            'user': new_user.to_dict(),  # Assuming you have a `to_dict` method on User
            'access_token': access_token,  # Return the token
        'status':201}

api.add_resource(UserRegistration, '/register')

class Login(Resource):

    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        # Check if the user exists and if the password is correct (you should hash passwords in a real app)
        if user and user.check_password(password):  # Assuming `check_password` method is defined on the User model
            # Create an access token (JWT)
            access_token = create_access_token(identity=user.id)  # The identity is the user_id
            return{
                'access_token': access_token,
                'message': 'Login successful'
            }, 200
        else:
            return {'message': 'Invalid credentials','status': 401}
        
api.add_resource(Login, '/login')

class Logout(Resource):
    def post(self):
        # Log the user out by simply returning a message, client-side is responsible for removing the token
        return {'message': 'Logged out successfully' , 'status' : 200}

api.add_resource(Logout, '/logout')

class MovieResource(Resource):
    def get(self):
        movies = Movie.query.all()
        # return make_response(jsonify([movie.to_dict() for movie in movies]), 200)
        return jsonify([movie.to_dict() for movie in movies]), 200 

    def post(self):
        data = request.get_json()
        new_movie = Movie(title= data['title'], genre=data['genre'], description=data['description'], release_year=data['release_year'], poster_url=data['poster_url'])
        db.session.add(new_movie)
        db.session.commit()
        return jsonify(new_movie.to_dict()), 201
        # return make_response(jsonify(new_movie.to_dict()), 201)

api.add_resource(MovieResource, '/movies')

class MovieByID(Resource):
    def get(self, id):
        movie = Movie.query.filter_by(id=id).first()

        if movie is None:
            return jsonify({"error": "Movie not found"}), 404

        return jsonify(movie.to_dict()), 200

        # response_dict = Movie.query.filter_by(id=id).first().to_dict()
        # return make_response(response_dict, 200)

    def patch(self, id):

        movie = Movie.query.filter_by(id=id).first()

        if movie is None:
            return jsonify({"error": "Movie not found"}), 404

        # Get the data from the request
        data = request.get_json()

        # Update only the fields provided in the request body
        for key, value in data.items():
            if hasattr(movie, key):
                setattr(movie, key, value)

        # Commit the changes to the database
        db.session.commit()

        # Return the updated movie record
        return jsonify(movie.to_dict()), 200

    def delete(self, id):
        record = Movie.query.filter_by(id=id).first()
        db.session.delete(record)
        db.session.commit()
        return jsonify({"message": "Order successfully deleted"}), 200

api.add_resource(MovieByID, '/movies/<int:id>')

class ClubResource(Resource):
    # GET: View all clubs
    def get(self):
        clubs = Club.query.all()
        return jsonify([club.to_dict() for club in clubs]), 200

    # POST: Create a new club
    @jwt_required()  # Ensure the user is logged in
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()  # Get the ID of the current authenticated user

        # Validate the data
        if not data.get('name'):
            return jsonify({"error": "Club name is required"}), 400
            # return make_response(jsonify({"error": "Club name is required"}), 400)
        
        # Create a new club instance
        new_club = Club(
            name=data['name'],
            description=data.get('description', ''),
            members_num=data.get('members_num', 0)
        )

        # Optionally, associate the club with the user (creator)
        # Add the user to the club's member list
        new_club.users.append(user_id)  # Assuming the 'users' relationship is set up correctly

        db.session.add(new_club)
        db.session.commit()

        return jsonify(new_club.to_dict()), 201


        # return make_response(jsonify(new_club.to_dict()), 201)

api.add_resource(ClubResource, '/clubs')
    
class ClubByID(Resource):
    # GET: View a club by its ID
    def get(self, id):
        try:
            club = Club.query.filter_by(id=id).one()
            return jsonify(club.to_dict()), 200
        except NoResultFound:
            return jsonify({"error": "Club not found"}), 404
        
    # PATCH: Update a club by its ID
    @jwt_required()
    def patch(self, id):
        # Get the current user ID from JWT
        user_id = get_jwt_identity()

        # Find the club by ID
        club = Club.query.filter_by(id=id).first()

        # If the club is not found, return an error
        if club is None:
            return jsonify({"error": "Club not found"}), 404

        # Check if the current user is part of the club (you can check if the user is the creator, or any other logic you want)
        if user_id not in [user.id for user in club.users]:
            return jsonify({"error": "Unauthorized to edit this club"}), 403

        # Loop through the attributes that are passed in the request body (like request.form)
        data = request.get_json()  # Use request.get_json() for JSON payload

        # Update the fields of the club based on the data in the request
        for attr, value in data.items():
            setattr(club, attr, value)

        # Commit the changes to the database
        db.session.commit()

        # Return the updated club data
        return jsonify(club.to_dict()), 200

    # DELETE: Delete a club by its ID
    @jwt_required()
    def delete(self, id):

        user_id = get_jwt_identity()  # Get the current user ID

        club = Club.query.filter_by(id=id).first()

        if club is None:
            return jsonify({"error": "Club not found"}), 404

        # Ensure the user is the creator of the club before deleting it
        if user_id not in [user.id for user in club.users]:
            return jsonify({"error": "Unauthorized to delete this club"}), 403

        db.session.delete(club)
        db.session.commit()

        return jsonify({"message": "Club successfully deleted"}), 200

api.add_resource(ClubByID, '/clubs/<int:id>')

class PostResource(Resource):
    def get(self):
        posts = Post.query.all()
        return jsonify([ post.to_dict() for post in posts]), 200
    
    # POST: Create a new post
    @jwt_required()  # Ensure the user is logged in
    def post(self):
        data = request.get_json()

        # Ensure required fields are provided
        if not data or 'content' not in data or 'club_id' not in data or 'movie_title' not in data or 'movie_poster_url' not in data:
            return jsonify({'message': 'Missing required fields', 'status': 400})

        # Get the user ID from the JWT token
        user_id = get_jwt_identity()

        # Get the data from the request
        content = data['content']
        club_id = data['club_id']
        movie_title = data['movie_title']
        movie_poster_url = data['movie_poster_url']

        # Use the model method to create a post with a movie
        try:
            new_post = Post.create_post_with_movie(user_id=user_id, club_id=club_id, content=content, movie_title=movie_title, movie_poster_url=movie_poster_url)
        except Exception as e:
            return jsonify({'message': f'Error creating post: {str(e)}', 'status': 500})

        return jsonify(new_post.to_dict()), 201  # Return the new post's data

api.add_resource(PostResource, '/posts')

class PostByID(Resource):

    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        
        if post is None:
            return jsonify({"error": "Post not found"}), 404
        
        return jsonify(post.to_dict()), 200
   
    # PATCH: Update an existing post by its ID
    @jwt_required()  # Ensure the user is logged in
    def patch(self, id):
        # Fetch the post by ID
        post = Post.query.filter_by(id=id).first()

        if post is None:
            return jsonify({"error": "Post not found"}), 404

        # Ensure that the user updating the post is the one who created it (if needed)
        # Here, assuming the user ID is stored in the `user_id` field
        user_id = get_jwt_identity()

        if post.user_id != user_id:
            return jsonify({"error": "Unauthorized to update this post"}), 403

        # Get the data from the request
        data = request.get_json()

        # Update the post fields with the data provided
        for key, value in data.items():
            setattr(post, key, value)

        # Commit changes to the database
        db.session.commit()

        # Return the updated post
        return jsonify(post.to_dict()), 200

    # DELETE: Delete a post by its ID
    @jwt_required()  # Ensure the user is logged in
    def delete(self, id):
        # Fetch the post by ID
        post = Post.query.filter_by(id=id).first()

        if post is None:
            return jsonify({"error": "Post not found"}), 404

        # Ensure that the user deleting the post is the one who created it (if needed)
        # Here, assuming the user ID is stored in the `user_id` field
        user_id = get_jwt_identity()

        if post.user_id != user_id:
            return jsonify({"error": "Unauthorized to delete this post"}), 403

        # Delete the post from the database
        db.session.delete(post)
        db.session.commit()

        return jsonify({"message": "Post successfully deleted"}), 200
    
api.add_resource(PostByID, '/posts/<int:id>')

class RatingResource(Resource):

    # GET: View all ratings or ratings by movie_id
    def get(self):
        movie_id = request.args.get('movie_id')  # Optional query parameter to filter by movie_id
        
        if movie_id:
            ratings = Rating.query.filter_by(movie_id=movie_id).all()
        else:
            ratings = Rating.query.all()

        return jsonify([rating.to_dict() for rating in ratings]), 200

    # POST: Create a new rating
    @jwt_required()  # Ensure the user is logged in
    def post(self):
        data = request.get_json()

        # Ensure required fields are provided
        if not data or 'movie_id' not in data or 'score' not in data or 'review' not in data:
            return jsonify({'message': 'Missing required fields', 'status': 400})

        user_id = get_jwt_identity()  # Get the user ID from the JWT token
        movie_id = data['movie_id']
        score = data['score']
        review = data['review']

        # Ensure the movie exists
        movie = Movie.query.filter_by(id=movie_id).first()
        if not movie:
            return jsonify({'message': 'Movie not found', 'status': 404})

        # Ensure the user hasn't already rated the movie
        existing_rating = Rating.query.filter_by(user_id=user_id, movie_id=movie_id).first()
        if existing_rating:
            return jsonify({'message': 'User has already rated this movie', 'status': 400})

        # Create the new rating
        new_rating = Rating(user_id=user_id, movie_id=movie_id, score=score, review=review)
        db.session.add(new_rating)
        db.session.commit()

        return jsonify(new_rating.to_dict()), 201  # Return the new rating's data
    
api.add_resource(RatingResource, '/ratings') 

class RatingByID(Resource):

    # GET: View a specific rating by its ID
    def get(self, id):
        rating = Rating.query.filter_by(id=id).first()
        
        if not rating:
            return jsonify({'message': 'Rating not found', 'status': 404})
        
        return jsonify(rating.to_dict()), 200

    # PATCH: Update an existing rating by its ID
    @jwt_required()  # Ensure the user is logged in
    def patch(self, id):
        # Fetch the rating by ID
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return jsonify({'message': 'Rating not found', 'status': 404})

        # Ensure that the user updating the rating is the one who created it
        user_id = get_jwt_identity()

        if rating.user_id != user_id:
            return jsonify({'message': 'Unauthorized to update this rating', 'status': 403})

        # Get the data from the request
        data = request.get_json()

        # Update the rating fields with the data provided
        for key, value in data.items():
            setattr(rating, key, value)

        # Commit changes to the database
        db.session.commit()

        return jsonify(rating.to_dict()), 200

    # DELETE: Delete a rating by its ID
    @jwt_required()  # Ensure the user is logged in
    def delete(self, id):
        # Fetch the rating by ID
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return jsonify({'message': 'Rating not found', 'status': 404})

        # Ensure that the user deleting the rating is the one who created it
        user_id = get_jwt_identity()

        if rating.user_id != user_id:
            return jsonify({'message': 'Unauthorized to delete this rating', 'status': 403})

        # Delete the rating from the database
        db.session.delete(rating)
        db.session.commit()

        return jsonify({'message': 'Rating successfully deleted'}), 200
api.add_resource(RatingByID, '/ratings/<int:id>')

class CommentResource(Resource):
    # GET: View all comments for a specific post
    def get(self, post_id):
        comments = Comment.query.filter_by(post_id=post_id).all()
        return jsonify([comment.to_dict() for comment in comments]), 200

    # POST: Create a new comment
    @jwt_required()  # Ensure the user is logged in
    def post(self, post_id):
        data = request.get_json()

        # Ensure required fields are provided
        if not data or 'content' not in data:
            return jsonify({'message': 'Missing required fields', 'status': 400})

        # Get the user ID from the JWT token
        user_id = get_jwt_identity()

        # Create a new comment
        new_comment = Comment(post_id=post_id, user_id=user_id, content=data['content'])

        # Add the new comment to the session and commit it to the database
        db.session.add(new_comment)
        db.session.commit()

        return jsonify(new_comment.to_dict()), 201  # Return the new comment's data

# Add resource for /comments/{post_id}
api.add_resource(CommentResource, '/comments/<int:post_id>')

class CommentByID(Resource):
    # GET: View a specific comment by its ID
    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        
        if not comment:
            return jsonify({'message': 'Comment not found', 'status': 404})
        
        return jsonify(comment.to_dict()), 200

    # PATCH: Update an existing comment by its ID
    @jwt_required()  # Ensure the user is logged in
    def patch(self, id):
        # Fetch the comment by ID
        comment = Comment.query.filter_by(id=id).first()

        if not comment:
            return jsonify({'message': 'Comment not found', 'status': 404})

        # Ensure that the user updating the comment is the one who created it
        user_id = get_jwt_identity()

        if comment.user_id != user_id:
            return jsonify({'message': 'Unauthorized to update this comment', 'status': 403})

        # Get the data from the request
        data = request.get_json()

        # Update the comment fields with the data provided
        for key, value in data.items():
            setattr(comment, key, value)

        # Commit changes to the database
        db.session.commit()

        return jsonify(comment.to_dict()), 200

    # DELETE: Delete a comment by its ID
    @jwt_required()  # Ensure the user is logged in
    def delete(self, id):
        # Fetch the comment by ID
        comment = Comment.query.filter_by(id=id).first()

        if not comment:
            return jsonify({'message': 'Comment not found', 'status': 404})

        # Ensure that the user deleting the comment is the one who created it
        user_id = get_jwt_identity()

        if comment.user_id != user_id:
            return jsonify({'message': 'Unauthorized to delete this comment', 'status': 403})

        # Delete the comment from the database
        db.session.delete(comment)
        db.session.commit()

        return jsonify({'message': 'Comment successfully deleted'}), 200

# Add resource for /comments/{id}
api.add_resource(CommentByID, '/comments/<int:id>')

class FollowResource(Resource):
    
    @jwt_required()  # Ensure the user is logged in to follow/unfollow
    def post(self):
        # Get the user ID from JWT identity
        user_id = get_jwt_identity()
        data = request.get_json()

        # Ensure 'followed_id' is provided in the request data
        if 'followed_id' not in data:
            return jsonify({'message': 'Followed user ID is required'}), 400
        
        followed_id = data['followed_id']
        
        # Check if the user is trying to follow themselves
        if user_id == followed_id:
            return jsonify({'message': 'You cannot follow yourself'}), 400
        
        # Check if the user is already following the other user
        existing_follow = Follow.query.filter_by(follower_id=user_id, followed_id=followed_id).first()
        if existing_follow:
            return jsonify({'message': 'You are already following this user'}), 400
        
        # Create a new follow relationship
        new_follow = Follow(follower_id=user_id, followed_id=followed_id)
        db.session.add(new_follow)
        db.session.commit()

        return jsonify({'message': 'User followed successfully'}), 201
    
    @jwt_required()  # Ensure the user is logged in to unfollow
    def delete(self):
        # Get the user ID from JWT identity
        user_id = get_jwt_identity()
        data = request.get_json()

        # Ensure 'followed_id' is provided in the request data
        if 'followed_id' not in data:
            return jsonify({'message': 'Followed user ID is required'}), 400
        
        followed_id = data['followed_id']
        
        # Find the existing follow relationship
        follow_record = Follow.query.filter_by(follower_id=user_id, followed_id=followed_id).first()
        if not follow_record:
            return jsonify({'message': 'You are not following this user'}), 404
        
        # Delete the follow relationship
        db.session.delete(follow_record)
        db.session.commit()

        return jsonify({'message': 'Unfollowed successfully'}), 200
    
api.add_resource(FollowResource, '/follow')

class UserFollowers(Resource):
    @jwt_required()  # Ensure the user is logged in
    def get(self, id):
        # Get the list of followers for a specific user
        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Get the followers for the user
        followers = Follow.query.filter_by(followed_id=id).all()
        follower_ids = [follow.follower_id for follow in followers]
        
        # Fetch user details for each follower
        followers_details = [User.query.get(follower_id).to_dict() for follower_id in follower_ids]
        
        return jsonify(followers_details), 200
    
api.add_resource(UserFollowers, '/users/<int:id>/followers')   


class UserFollowing(Resource):
    @jwt_required()  # Ensure the user is logged in
    def get(self, id):
        # Get the list of users a specific user is following
        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Get the users being followed by the user
        followings = Follow.query.filter_by(follower_id=id).all()
        followed_ids = [follow.followed_id for follow in followings]
        
        # Fetch user details for each followed user
        followed_details = [User.query.get(followed_id).to_dict() for followed_id in followed_ids]
        
        return jsonify(followed_details), 200
    
api.add_resource(UserFollowing, '/users/<int:id>/following')

# Add User to Club - requires authentication
class AddUserToClub(Resource):
    @jwt_required()  # Ensure the user is logged in
    def post(self):
        data = request.get_json()
        
        user_id = data.get('user_id')
        club_id = data.get('club_id')
        
        if not user_id or not club_id:
            return jsonify({"error": "user_id and club_id are required"}), 400
        
        # Get the ID of the current authenticated user
        current_user_id = get_jwt_identity()

        # Ensure the current user is the one adding users to the club
        if current_user_id != user_id:
            return jsonify({"error": "You can only add yourself to a club"}), 403
        
        # Check if user and club exist
        user = User.query.get(user_id)
        club = Club.query.get(club_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        if not club:
            return jsonify({"error": "Club not found"}), 404

        # Check if the user is already in the club
        existing_user_club = UserClub.query.filter_by(user_id=user_id, club_id=club_id).first()
        if existing_user_club:
            return jsonify({"message": "User is already in this club"}), 400
        
        # Add the user to the club
        user_club = UserClub(user_id=user_id, club_id=club_id)
        db.session.add(user_club)
        db.session.commit()

        return jsonify({"message": "User added to club successfully"}), 201
    
api.add_resource(AddUserToClub, '/clubs/add_user')

# Remove User from Club - requires authentication
class RemoveUserFromClub(Resource):
    @jwt_required()  # Ensure the user is logged in
    def delete(self, user_id, club_id):
        # Get the ID of the current authenticated user
        current_user_id = get_jwt_identity()

        # Ensure the current user is the one removing themselves from the club
        if current_user_id != user_id:
            return jsonify({"error": "You can only remove yourself from a club"}), 403
        
        # Find the user_club record to delete
        user_club = UserClub.query.filter_by(user_id=user_id, club_id=club_id).first()
        
        if not user_club:
            return jsonify({"error": "User is not in this club"}), 404
        
        db.session.delete(user_club)
        db.session.commit()
        
        return jsonify({"message": "User removed from club successfully"}), 200
    
api.add_resource(RemoveUserFromClub, '/clubs/remove_user/<int:user_id>/<int:club_id>')

# List Clubs for a User
class ClubsForUser(Resource):
    def get(self, user_id):
        clubs = Club.query.join(UserClub).filter(UserClub.user_id == user_id).all()
        
        if not clubs:
            return jsonify({"message": "User is not a member of any club"}), 404
        
        return jsonify([club.to_dict() for club in clubs]), 200
    
api.add_resource(ClubsForUser, '/users/<int:user_id>/clubs')

# List Users in a Club
class UsersInClub(Resource):
    def get(self, club_id):
        users = User.query.join(UserClub).filter(UserClub.club_id == club_id).all()
        
        if not users:
            return jsonify({"message": "No users in this club"}), 404
        
        return jsonify([user.to_dict() for user in users]), 200
    
api.add_resource(UsersInClub, '/clubs/<int:club_id>/users')


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))  # Use environment variable or default to 5555
    app.run(host="0.0.0.0", port=port, debug=True)
