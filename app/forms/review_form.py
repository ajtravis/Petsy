from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
