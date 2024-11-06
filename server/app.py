from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os

app = Flask(__name__)
api = Api(app)
CORS(app)

# Initialize SQLAlchemy
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Set the SQLAlchemy Database URI
# Replace with your actual PostgreSQL URI when ready
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://darkroomdatabase_user:KxMwejXXBjMiztxk7JLASeWmXyeg77KS@dpg-cslikbbv2p9s7386jhcg-a.oregon-postgres.render.com/darkroomdatabase'  # Example URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Define a basic route
@app.route('/')
def home():
    return "Hello, Render! Your Flask app is running."

# Run the app with the appropriate port
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))  # Use environment variable or default to 5555
    app.run(host="0.0.0.0", port=port, debug=True)
