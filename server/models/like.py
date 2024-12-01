from db.Model import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

class Like(db.Model,SerializerMixin):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content_type = db.Column(db.String(50), nullable=False)  # "post", "comment", etc.
    content_id = db.Column(db.Integer, nullable=False)  # ID of the post or comment
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='likes')