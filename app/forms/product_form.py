from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    price = DecimalField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    image = StringField('image url', validators=[DataRequired()])
