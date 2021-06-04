from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import User, Photo
from app.forms import PhotoForm

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/')
@login_required
def all_photos():
    if current_user.is_authenticated:
        ud = current_user.to_dict()
        user_id = ud['id']
        photos = Photo.query.filter(Photo.ownerId == user_id).all()
        return {"photos": [photo.to_dict() for photo in photos]}
    return {'errors': ['Unauthorized']}, 401

@photo_routes.route('/', methods=['POST'])
@login_required
def add_photos():
    form = PhotoForm()

    print(request.get_json())
    return {"message": "received"}