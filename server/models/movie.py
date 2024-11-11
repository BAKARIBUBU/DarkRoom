from models.db import db 
from sqlalchemy_serializer import SerializerMixin

class Movie(db.Model,SerializerMixin):
    __tablename__ = 'movies'

    serialize_rules = ('-posts','-ratings',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String)
    description = db.Column(db.String)
    release_year = db.Column(db.Integer)
    poster_url = db.Column(db.String)
    # video_url = db.Column(db.String)

    posts = db.relationship('Post', back_populates='movie', cascade='all, delete-orphan')
    ratings = db.relationship('Rating', back_populates='movie', cascade='all, delete-orphan')