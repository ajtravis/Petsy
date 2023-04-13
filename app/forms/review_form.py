from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired("please write a review"), Length(min=1, max=255, message="length must be between 1 and 255 characters")])
    rating = IntegerField('rating', validators=[DataRequired()])
