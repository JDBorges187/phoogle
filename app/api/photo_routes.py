from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Photo

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/')
@login_required
def all_photos():
    photos = Photo.query.all()
    #!!!!! Need to authenticate user to the photos
    return {"photos": [photo.to_dict() for photo in photos]}