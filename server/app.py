from flask import Flask, request, jsonify,make_response,session
from flask_restful import Api, Resource, reqparse
# from flask_sqlalchemy import SQLAlchemy
 # Import db directly
# from flask_bcrypt import Bcrypt
from models import db,Club,Comment,Follow,Movie,Post,Rating,User,UserClub
from flask_jwt_extended import JWTManager,jwt_required, create_access_token, get_jwt_identity
import os
from flask_cors import CORS
from flask_migrate import Migrate
app = Flask(__name__)
api = Api(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://darkroomdatabase_user:KxMwejXXBjMiztxk7JLASeWmXyeg77KS@dpg-cslikbbv2p9s7386jhcg-a.oregon-postgres.render.com/darkroomdatabase'  # Example URI
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
        users = [user.to_dict(rules=('-posts','-comments','-ratings','-clubs',)) for user in User.query.all()]
        return make_response(jsonify(users), 200)

    def post(self):
        data = request.get_json()
        new_user = User(name=data['name'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user.to_dict()), 201)

api.add_resource(UsersResource, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user is None:
            return make_response({"error": "User not found"}, 404)

        response_dict = user.to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response
    

    def patch(self, id):
        record = User.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])
        db.session.add(record)
        db.session.commit()
        return make_response(record.to_dict(), 200)

    def delete(self, id):
        record = User.query.filter_by(id=id).first()
        db.session.delete(record)
        db.session.commit()
        return make_response({"message": "record successfully deleted"}, 200)

api.add_resource(UserByID, '/users/<int:id>')

class UserRegistration(Resource):
    def post(self):
        # Get the data from the request
        data = request.get_json()

        # Validate that required fields are in the request
        if not data or 'name' not in data or 'email' not in data or 'password' not in data:
            return jsonify({'message': 'Missing required fields'}), 400

        # Check if the user already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'message': 'User with this email already exists'}), 400

        # Create a new user and hash the password
        new_user = User(name=data['name'], email=data['email'])
        new_user.password = data['password']  # Assuming the password setter hashes the password
        db.session.add(new_user)
        db.session.commit()

        # Generate JWT token for the new user
        access_token = create_access_token(identity=new_user.id)

        # Return user data along with JWT token
        return jsonify({
            'message': 'User registered successfully',
            'user': new_user.to_dict(),  # Assuming you have a `to_dict` method on User
            'access_token': access_token  # Return the token
        }), 201

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
            return jsonify({
                'access_token': access_token,
                'message': 'Login successful'
            }), 200
        else:
            return {'message': 'Invalid credentials'}, 401
        
api.add_resource(Login, '/login')

class Logout(Resource):
    def post(self):
        # Log the user out by simply returning a message, client-side is responsible for removing the token
        return jsonify(message="Logged out successfully"), 200

api.add_resource(Logout, '/logout')
# class UserRegistration(Resource):
#     def post(self):
#         data = request.get_json()
#         if not data or 'name' not in data or 'email' not in data or 'password' not in data:
#             return make_response({'message': 'Missing required fields'}, 400)

#         existing_user = User.query.filter_by(email=data['email']).first()
#         if existing_user:
#             return make_response({'message': 'User already exists'}, 400)

#         new_user = User(name=data['name'], email=data['email'])
#         new_user.password = data['password']  # Use the setter to hash the password
#         db.session.add(new_user)
#         db.session.commit()

#         return make_response(jsonify(new_user.to_dict()), 201)

# api.add_resource(UserRegistration, '/register')
   
# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')

#         user = User.query.filter_by(email=email).first()

#         if user and user.check_password(password):
#             session['user_id'] = user.id
#             return {'name': user.name, 'id': user.id}, 200
#         return {'message': 'Invalid email or password'}, 401

# api.add_resource(Login, '/login')

# class Logout(Resource):
#     def delete(self):
#         session.pop('user_id', None)
#         return {}, 200

# api.add_resource(Logout, '/logout')


# class UserProfile(Resource):
    
#     # GET method to view user profile
#     def get(self):
#         # Check if user_id exists in session
#         user_id = session.get('user_id')
        
#         # if not user_id:
#         #     return {'message': 'You need to log in first'}, 401  # Unauthorized
        
#         # Get the user object from the database using the user_id stored in session
#         user = User.query.get(user_id)
        
#         if user:
#             # Return the user profile details
#             return jsonify({
#                 'name': user.name,
#                 'email': user.email,
#                 'profile_picture': user.profile_picture
#             })
#         else:
#             return {'message': 'User not found'}, 404  # Not Found

#     # PATCH method to update user profile
#     def patch(self):
#         # Check if user_id exists in session
#         user_id = session.get('user_id')
        
#         # if not user_id:
#         #     return {'message': 'You need to log in first'}, 401  # Unauthorized
        
#         # Get the user object from the database using the user_id stored in session
#         user = User.query.get(user_id)
        
#         if user:
#             data = request.get_json()  # Get the data sent in the request body
            
#             # Update fields if provided in the request
#             if 'name' in data:
#                 user.name = data['name']
#             if 'profile_picture' in data:
#                 user.profile_picture = data['profile_picture']
#             if 'email' in data:
#                 user.email = data['email']
            
#             # Commit changes to the database
#             db.session.commit()

#             return jsonify(user.to_dict())  # Return updated user data
#         else:
#             return {'message': 'User not found'}, 404  # Not Found
        
# api.add_resource(UserProfile, '/profile')

# class CheckSession(Resource):
#     def get(self):
#         user_id = session.get('user_id')
#         if user_id:
#             user = User.query.get(user_id)
#             return {'name': user.name, 'id': user.id, 'email': user.email}, 200
#         return {}, 401

# api.add_resource(CheckSession, '/check_session')



# Run the app with the appropriate port
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))  # Use environment variable or default to 5555
    app.run(host="0.0.0.0", port=port, debug=True)
