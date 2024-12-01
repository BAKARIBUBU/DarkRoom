from models.db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

class Testimonials(db.Model,SerializerMixin):
    __tablename__ = "testimonials"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True,nullable = False)
    testimonial = db.Column(db.Text,nullable = False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)