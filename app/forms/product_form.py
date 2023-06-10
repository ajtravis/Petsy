from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, URL
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from app.models import Product

class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("name is required")])
    price = DecimalField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired("description is required"), Length(min=0, max=255, message="description must be less than 255 characters")])
    # image = StringField('image url', validators=[DataRequired("an image url is required"), URL(require_tld=True, message="invalid image url")])
    image = FileField('image', validators=[FileRequired("please upload an image"), FileAllowed(list(ALLOWED_EXTENSIONS), "Images Only!")])
