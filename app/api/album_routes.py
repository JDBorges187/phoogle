from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import User, Photo, db, Album



album_routes = Blueprint('albums', __name__)


@album_routes.route('/')
@login_required
def all_albums():
    if current_user.is_authenticated:
        # ud = current_user.to_dict()
        # user_id = current_user.id
        # Photo.query.filter(Photo.ownerId == user_id).all()
        albums = current_user.albums
        return {"albums": {album.id: album.to_dict() for album in albums}}
    return {'errors': ['Unauthorized']}, 401


@album_routes.route('/', methods=['POST'])
@login_required
def add_album():  # TODO Update for New Albums
    # form = PhotoForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit:
    #     photo = Photo(
    #         owner=current_user,
    #         photo_url=form.data['photoUrl']
    #     )
    # db.session.add(photo)
    # db.session.commit()
    # return {"photo": [photo.to_dict()]}
    return {'errors': ['Unauthorized']}, 401


@album_routes.route('/<id>', methods=['PATCH'])
@login_required
def update_album(id):
    album = Album.query.get(id)
    add_photos = request.json['addPhotos']
    existing = [photo.id for photo in album.photos]
    net = list(set(add_photos) - set(existing))
    # sourch https://stackoverflow.com/a/6486467
    photos = Photo.query.filter(
        Photo.id.in_(net)
    ).all()
    for photo in photos:
        album.photos.append(photo)
    db.session.add(album)
    db.session.commit()
    return {"album": {album.id: album.to_dict()}}
