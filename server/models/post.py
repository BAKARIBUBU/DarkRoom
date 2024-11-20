from models.db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func
from models.movie import Movie


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'


    serialize_rules = ('-user_id', '-movie_id', '-club_id', 'movie.title', 'movie.poster_url')
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=True)
    content = db.Column(db.String)
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(),onupdate=func.now(), nullable=False)

    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    movie = db.relationship('Movie', back_populates='posts')
    club = db.relationship('Club', back_populates='posts')
    user = db.relationship('User', back_populates='posts')

    @classmethod
    def create_post_with_movie(cls, user_id, club_id, content, movie_title, movie_poster_url):
        movie = Movie.query.filter_by(title=movie_title, poster_url=movie_poster_url).first()
        
        
        if not movie:
            movie = Movie(title=movie_title, poster_url=movie_poster_url)
            db.session.add(movie)
            db.session.commit()

        
        new_post = cls(user_id=user_id, club_id=club_id, content=content, movie_id=movie.id,updated_at=func.now())
        db.session.add(new_post)
        db.session.commit()

        return new_post

    
    @property
    def movie_title(self):
        return self.movie.title if self.movie else None

    @property
    def movie_poster_url(self):
        return self.movie.poster_url if self.movie else None

