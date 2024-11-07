from models.db import db 
from sqlalchemy.sql import func
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class User(db.Model,SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = ('-_password_hash','-posts','-comments','ratings','clubs',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    ratings = db.relationship('Rating', back_populates='user', cascade='all, delete-orphan')
    clubs = db.relationship('Club', secondary='club_users', back_populates='users')

    @hybrid_property
    def password(self):
        return self._password_hash

    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    
    def __repr__(self):
      return f"<User {self.username}, {self.email}>"

    