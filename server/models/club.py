from models.db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

class Club(db.Model,SerializerMixin):
    __tablename__ = 'clubs'

    serialize_rules=('-posts','-club_users',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String)
    members_num = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now(),onupdate=func.now(), nullable=False)


    posts = db.relationship('Post', back_populates='club', cascade="all, delete-orphan")
    club_users= db.relationship('UserClub', back_populates = 'club',cascade='all, delete-orphan')

# from models.db import db
# from sqlalchemy_serializer import SerializerMixin
# from sqlalchemy.sql import func

# class Club(db.Model, SerializerMixin):
#     __tablename__ = 'clubs'

#     serialize_rules=('-posts', '-club_users',)

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, unique=True, nullable=False)
#     description = db.Column(db.String)
#     members_num = db.Column(db.Integer, default=0, nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
#     updated_at = db.Column(db.DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)

#     posts = db.relationship('Post', back_populates='club', cascade="all, delete-orphan")
#     club_users = db.relationship('UserClub', back_populates='club', cascade='all, delete-orphan')