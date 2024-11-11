from models.db import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

class Follow(db.Model,SerializerMixin):
    __tablename__ = 'follows'

    serialize_rules=('-follower_id','-followed_id',)
    
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='following')
    followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followers')

