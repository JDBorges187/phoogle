import datetime
from .db import db
from .album_photo import album_photos


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    date_created = db.Column(
        db.DateTime, server_default=db.func.now(), nullable=False)
    shared = db.Column(db.Boolean, default=False, nullable=False)

    owner = db.relationship("User", back_populates="albums")
    photos = db.relationship("Photo",
                             secondary=album_photos)

    @property
    def last_photo(self):
        return self.photos[-1]
    # photos = db.relationship("Photo",
    #                          secondary="AlbumPhoto",
    #                          primaryjoin="albums.id == albumphotos.album_id",
    #                          secondaryjoin="albumphotos.photo_id == photos.id",
    #                          viewonly=True
    #                          )
    # album_photos = db.relationship("AlbumPhoto")

    # @property
    # def photos(self):
    #     return [album_photo.photo for album_photo in self.album_photos]

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ownerId": self.owner_id,
            "coverPhoto": self.last_photo.to_dict()
        }
