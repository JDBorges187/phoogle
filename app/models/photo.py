from .db import db

class Photo(db.Model):
  __tablename__ = 'photos'

  id = db.Column(db.Integer, primary_key = True)
  ownerId = db.Column(db.Integer, db.ForeignKey("users.id"))
  photo_url = db.Column(db.String(255), nullable = False)
  