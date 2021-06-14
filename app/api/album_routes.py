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
    if current_user.is_authenticated:
        new_album = Album(
            name=request.json['name'],
            owner=current_user
        )
        for photo_id in request.json['photos']:
            photo = Photo.query.get(photo_id)
            new_album.photos.append(photo)
        db.session.add(new_album)
        db.session.commit()
        return {'album': {new_album.id: new_album.to_dict()}}
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


@album_routes.route('/<id>/photos')
@login_required
def album_photos(id):
    album = Album.query.get(id)
    if album.owner == current_user:
        photos = album.photos
        return {"photos": {photo.id: photo.to_dict() for photo in photos}}
    return {'errors': ['Access Denied', 'Ask owner to share it with you']}, 403


@album_routes.route('/<id>', methods=['PATCH'])
@login_required
def update_album(id):
    errors = []
    album = Album.query.get(id)
    if (current_user.is_authenticated
            and album.owner == current_user):
        existing = [photo.id for photo in album.photos]
        if "name" in request.json:
            new_name = request.json['name']
            if new_name == '':
                errors.append('Album name cannot be blank')
            elif len(new_name) > 255:
                errors.append('Album name must be 255 characters or less')
            else:
                album.name = new_name
        if "addPhotos" in request.json:
            add_photos = request.json['addPhotos']
            net = list(set(add_photos) - set(existing))
            repeats = list(set(existing) - set(add_photos))
            # source https://stackoverflow.com/a/6486467
            for photo_id in repeats:
                errors.append(f"Photo {photo_id} already in this album")
            if len(net) == 0:
                errors.append('No photos added to album')
            for photo_id in net:
                photo = Photo.query.get(photo_id)
                if photo.owner == current_user:
                    album.photos.append(photo)
                else:
                    errors.append(f"Photo {photo_id} does not belong to you")
        if "removePhotos" in request.json:
            remove_photos = request.json['removePhotos']
            for photo_id in remove_photos:
                if photo_id in existing:
                    photo = Photo.query.get(photo_id)
                    album.photos.remove(photo)
                else:
                    errors.append(f"Photo {photo_id} not in album")
        db.session.add(album)
        db.session.commit()
        return {"album": {album.id: album.to_dict()},
                "errors": errors}
