from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import User, Photo, db
from app.forms import PhotoForm

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


@photo_routes.route('/', methods=['POST'])
@login_required
def add_photos():
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        photo = Photo(
            owner_id=current_user.id,
            photo_url=form.data['photoUrl']
        )
        db.session.add(photo)
        db.session.commit()
        return {"photo": [photo.to_dict()]}
    return {'errors': ['Unauthorized']}, 401
