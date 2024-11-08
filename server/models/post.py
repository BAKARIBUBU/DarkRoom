from models.db import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

class Post(db.Model,SerializerMixin):
    __tablename__ = 'posts'

    serialize_rules=('-user_id','-movie_id','-club_id','-comments','-movie',)
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=True)
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    movie = db.relationship('Movie', back_populates='posts')