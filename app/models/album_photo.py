from .db import db

album_photos =db.Table(
    "album_photos",
    db.Column("album_id", db.Integer,db.ForeignKey("albums.id"), primary_key=True ),
    db.Column("photo_id", db.Integer,db.ForeignKey("photos.id"), primary_key=True ),
    db.Column("created_at", db.DateTime, default=db.func.now())
)

# class AlbumPhoto(db.Model):
#     __tablename__ = 'albumphotos'
    
#     id = db.Column(db.Integer, primary_key=True)
#     album_id = db.Column(db.Integer, db.ForeignKey("albums.id"))
#     photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"))
