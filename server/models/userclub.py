from models.db import db 
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

class UserClub(db.Model,SerializerMixin):
    __tablename__ = 'club_users'

    serialize_rules = ('-user_id','-club','-user',)
    movie_club_id = db.Column(db.Integer, db.ForeignKey('movie_clubs.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    joined_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)

    club = db.relationship('Club', back_populates='users')
    user = db.relationship('User', back_populates='clubs')


