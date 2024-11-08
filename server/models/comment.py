from models.db import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

class Comment(db.Model,SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = ('-post_id','-user_id','-post','-user',)
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    

    post = db.relationship('Post', back_populates='comments')
    user = db.relationship('User', back_populates='comments')