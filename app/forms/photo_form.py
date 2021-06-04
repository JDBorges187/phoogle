from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class PhotoForm(FlaskForm):
    ownerId = IntegerField('ownerId', validators=[DataRequired()])
    photoUrl = StringField('photoUrl', validators=[DataRequired()])
