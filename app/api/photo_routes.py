from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import User, Photo, db
from app.forms import PhotoForm
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/')
@login_required  # tried w & w/o
def all_photos():
    if current_user.is_authenticated:
        # ud = current_user.to_dict()
        # user_id = current_user.id
        # Photo.query.filter(Photo.ownerId == user_id).all()
        photos = current_user.photos
        return {"photos": {photo.id: photo.to_dict() for photo in photos}}
    return {'errors': ['Unauthorized']}, 401


# @photo_routes.route('/', methods=['POST'])
# @login_required
# def add_photos():
#     form = PhotoForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit:
#         photo = Photo(
#             owner_id=current_user.id,
#             photo_url=form.data['photoUrl']
#         )
#         db.session.add(photo)
#         db.session.commit()
#         return {"photo": [photo.to_dict()]}
#     return {'errors': ['Unauthorized']}, 401


@photo_routes.route('/', methods=['POST'])
@login_required
def upload_photo():
    if "photo" not in request.files:
        return {"errors": "image required"}, 400

    photo = request.files["photo"]

    if not allowed_file(photo.filename):
        return {"errors": "file type not permitted"}, 400
    
    photo.filename = get_unique_filename(photo.filename)

    upload = upload_file_to_s3(photo)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_photo = Photo(owner=current_user, photo_url=url)
    db.session.add(new_photo)
    db.session.commit()
    return {"photo": new_photo.to_dict()}


@photo_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_photo(id):
    if current_user.is_authenticated:
        photo=Photo.query.get(id)
        if current_user == photo.owner:
            db.session.delete(photo)
            db.session.commit()
            return photo.to_dict()
        return {'errors': 'You cannot delete tnis photo'}
    return {'errors': 'You must be logged in to delete photos'}
    