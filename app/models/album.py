import datetime
from .db import db


class Album(db.Model):
  __tablename__ = 'albums'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable = False)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  date_created = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
  shared = db.Column(db.Boolean, default=False, nullable = False)

  owner = db.relationship("User", back_populates="albums")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "ownerId": self.owner_id,
    }
