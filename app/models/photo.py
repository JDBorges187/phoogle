import datetime
from .db import db
from .album_photo import album_photos

class Photo(db.Model):
  __tablename__ = 'photos'

  id = db.Column(db.Integer, primary_key = True)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  photo_url = db.Column(db.String(255), nullable = False)
  date_created = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

  owner = db.relationship("User", back_populates="photos")
  albums = db.relationship("Album", secondary=album_photos)

  def to_dict(self):
    return {
      "id": self.id,
      "ownerId": self.owner_id,
      "photoUrl": self.photo_url
    }
