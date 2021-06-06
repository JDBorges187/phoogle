from .db import db


class AlbumPhoto(db.Model):
    __tablename__ = 'albumphotos'
    
    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"))
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"))
