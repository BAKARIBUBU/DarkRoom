from models.db import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

class Rating(db.Model,SerializerMixin):
    __tablename__ = 'ratings'
    
    serialize_rules= ('-user_id','-movie_id','-movie','-user',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String,nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    

    user = db.relationship('User', back_populates='ratings')
    movie = db.relationship('Movie', back_populates='ratings')