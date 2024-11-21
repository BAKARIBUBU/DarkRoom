from models.db import db
from sqlalchemy_serializer import SerializerMixin

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    serialize_rules = ('-posts', '-ratings', '-user')  

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String)
    description = db.Column(db.String)
    release_year = db.Column(db.Integer)
    poster_url = db.Column(db.String)

    # Foreign key to associate with a user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    # Relationships
    user = db.relationship('User', back_populates='movies')
    posts = db.relationship('Post', back_populates='movie', cascade='all, delete-orphan')
    ratings = db.relationship('Rating', back_populates='movie', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Movie {self.title}, Genre: {self.genre}, User ID: {self.user_id}>"