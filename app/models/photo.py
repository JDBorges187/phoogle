from .db import db

class Photo(db.Model):
  __tablename__ = 'photos'

  id = db.Column(db.Integer, primary_key = True)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  photo_url = db.Column(db.String(255), nullable = False)

  owner = db.relationship("User", back_populates="photos")

  def to_dict(self):
    return {
      "id": self.id,
      "ownerId": self.owner_id,
      "photoUrl": self.photo_url
    }
